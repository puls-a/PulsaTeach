/* eslint-disable no-unused-vars */
export function registerAccountsRoutes(app, context) {
  const {
    learningTracks,
    buildGlossaryIndex,
    normalizePublishedCourse,
    validateCourseForPublication,
    appendWorkflowLog,
    authorizeCourseTransition,
    createCourseVersion,
    diffCourseVersions,
    restoreCourseVersion,
    productRoadmap,
    sendWelcomeEmail,
    transactionalEmailEnabled,
    sensitiveRateLimit,
    deleteSupabaseRecord,
    getSupabaseStatus,
    supabaseAdmin,
    supabaseEnabled,
    requireSupabaseStorage,
    accountDeletionSchema,
    attemptSchema,
    avatarUploadSchema,
    certificateRevokeSchema,
    courseCreateSchema,
    courseRollbackSchema,
    courseUpdateSchema,
    enrollmentSchema,
    eventSchema,
    lessonDraftSchema,
    lessonDraftUpdateSchema,
    progressMigrationSchema,
    progressSchema,
    quizSessionSchema,
    reviewSchema,
    roleUpdateSchema,
    submissionSchema,
    userSettingsSchema,
    validateBody,
    progressFile,
    submissionsFile,
    attemptsFile,
    enrollmentsFile,
    draftsFile,
    usersFile,
    coursesFile,
    courseVersionsFile,
    issuedCertificatesFile,
    learningEventsFile,
    quizSessionsFile,
    projectLessonIds,
    certificates,
    readProgressStore,
    writeProgressStore,
    readJsonStore,
    writeJsonStore,
    withStoreMutation,
    authorizeUserParam,
    authorizePayloadUser,
    requireAuthenticatedWrite,
    requireAuthenticatedRequest,
    requireRole,
    sendApiError,
    hasRole,
    isObject,
    normalizeLocalizedText,
    createDefaultUser,
    getCatalogStats,
    privacyMetric,
    privacyValue,
    analyticsUserKey,
    summarizeTrack,
    getLessonsForTracks,
    buildCertificatesForUser,
    mergeProgress,
    slugify,
    uniqueSlug,
    parseImageDataUrl,
    buildProfileSummary,
    buildStudyPlan,
    publishDueScheduledCourses,
    deleteLocalAccountData,
    shouldTrySupabase,
    markSupabaseUnavailable,
    rolesFromUser,
    randomUUID,
    createHash
  } = context;

  app.get("/api/path/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const progressStore = await readProgressStore();
    const attempts = await readJsonStore(attemptsFile, []);
    const progress = progressStore[userId] || {};
    const userAttempts = attempts.filter((item) => item.userId === userId);
    response.json(buildStudyPlan(progress, userAttempts));
  });

  app.get("/api/profile/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const progressStore = await readProgressStore();
    const submissions = await readJsonStore(submissionsFile, []);
    const attempts = await readJsonStore(attemptsFile, []);
    const issuedCertificates = await readJsonStore(issuedCertificatesFile, []);
    const users = await readJsonStore(usersFile, {});
    const progress = progressStore[userId] || null;
    const userSubmissions = submissions.filter((item) => item.userId === userId);
    const userAttempts = attempts.filter((item) => item.userId === userId);
    const user = users[userId] || createDefaultUser(userId);

    response.json({
      userId,
      displayName: user.displayName,
      user,
      progress,
      submissions: userSubmissions,
      attempts: userAttempts.slice(0, 20),
      certificates: buildCertificatesForUser(userId, progress, userSubmissions, issuedCertificates).certificates,
      summary: buildProfileSummary(progress, userSubmissions, userAttempts)
    });
  });

  app.get("/api/users/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const users = await readJsonStore(usersFile, {});
    response.json(users[userId] || createDefaultUser(userId));
  });

  app.put("/api/users/:userId", requireAuthenticatedRequest, validateBody(userSettingsSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const payload = request.body;
    if (!isObject(payload)) {
      response.status(400).json({ error: "User payload must be an object." });
      return;
    }
    const users = await readJsonStore(usersFile, {});
    const current = users[userId] || createDefaultUser(userId);
    const completedOnboardingNow = !current.onboardingCompleted && Boolean(payload.onboardingCompleted);
    const next = {
      ...current,
      displayName: String(payload.displayName || current.displayName).slice(0, 80),
      goal: String(payload.goal || current.goal || "frontend-foundations").slice(0, 80),
      weeklyMinutes: Number.isFinite(Number(payload.weeklyMinutes)) ? Number(payload.weeklyMinutes) : current.weeklyMinutes,
      locale: String(payload.locale || current.locale || "en").slice(0, 8),
      bio: String(payload.bio ?? current.bio ?? "").slice(0, 500),
      avatarUrl: String(payload.avatarUrl ?? current.avatarUrl ?? "").slice(0, 500),
      onboardingCompleted: payload.onboardingCompleted === undefined ? Boolean(current.onboardingCompleted) : Boolean(payload.onboardingCompleted),
      roles: current.roles || [],
      updatedAt: new Date().toISOString()
    };
    users[userId] = next;
    await writeJsonStore(usersFile, users);
    if (completedOnboardingNow && request.authUser?.email) {
      sendWelcomeEmail({
        email: request.authUser.email,
        displayName: next.displayName,
        locale: next.locale
      }).catch((error) => console.warn(JSON.stringify({
        level: "warn",
        message: "Welcome email failed",
        requestId: request.requestId,
        error: error.message
      })));
    }
    response.json(users[userId]);
  });

  app.post("/api/account/avatar", sensitiveRateLimit(20), requireAuthenticatedRequest, validateBody(avatarUploadSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    if (!supabaseAdmin || !request.authUser?.id) {
      response.status(503).json({ error: "Avatar storage unavailable.", requestId: request.requestId });
      return;
    }
    const parsed = parseImageDataUrl(request.body?.dataUrl);
    if (!parsed) {
      response.status(400).json({ error: "Avatar must be a JPEG, PNG, or WebP data URL under 1 MB.", requestId: request.requestId });
      return;
    }
    const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[parsed.mime];
    const objectPath = `${request.authUser.id}/avatar-${Date.now()}.${extension}`;
    const { error: uploadError } = await supabaseAdmin.storage.from("avatars").upload(objectPath, parsed.buffer, {
      contentType: parsed.mime,
      upsert: true,
      cacheControl: "3600"
    });
    if (uploadError) throw uploadError;
    const { data } = supabaseAdmin.storage.from("avatars").getPublicUrl(objectPath);
    const users = await readJsonStore(usersFile, {});
    const userId = request.authUserId;
    users[userId] = {
      ...(users[userId] || createDefaultUser(userId)),
      avatarUrl: data.publicUrl,
      updatedAt: new Date().toISOString()
    };
    await writeJsonStore(usersFile, users);
    response.status(201).json({ avatarUrl: data.publicUrl });
  });

  app.get("/api/account/export", requireAuthenticatedRequest, async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const userId = request.authUserId;
    const [progress, submissions, attempts, users, issuedCertificates, learningEvents, quizSessions] = await Promise.all([
      readProgressStore(),
      readJsonStore(submissionsFile, []),
      readJsonStore(attemptsFile, []),
      readJsonStore(usersFile, {}),
      readJsonStore(issuedCertificatesFile, []),
      readJsonStore(learningEventsFile, []),
      readJsonStore(quizSessionsFile, [])
    ]);
    response.json({
      exportedAt: new Date().toISOString(),
      account: {
        userId,
        email: request.authUser?.email,
        profile: users[userId] || createDefaultUser(userId)
      },
      progress: progress[userId] || null,
      submissions: submissions.filter((item) => item.userId === userId),
      attempts: attempts.filter((item) => item.userId === userId),
      certificates: issuedCertificates.filter((item) => item.userId === userId),
      learningEvents: learningEvents.filter((item) => item.userId === userId),
      quizSessions: quizSessions.filter((item) => item.userId === userId)
    });
  });

  app.delete("/api/account", sensitiveRateLimit(10), requireAuthenticatedRequest, validateBody(accountDeletionSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    if (String(request.body?.confirmation || "") !== "DELETE") {
      response.status(400).json({ error: "Type DELETE to confirm account deletion.", requestId: request.requestId });
      return;
    }
    const userId = request.authUserId;
    if (supabaseAdmin && request.authUser?.id) {
      const deletes = [
        supabaseAdmin.from("learning_events").delete().eq("user_id", userId),
        supabaseAdmin.from("issued_certificates").delete().eq("user_id", userId),
        supabaseAdmin.from("submissions").delete().eq("user_id", userId),
        supabaseAdmin.from("attempts").delete().eq("user_id", userId),
        supabaseAdmin.from("quiz_sessions").delete().eq("user_id", userId),
        supabaseAdmin.from("progress").delete().eq("user_id", userId),
        supabaseAdmin.from("profiles").delete().eq("local_user_id", userId)
      ];
      const results = await Promise.all(deletes);
      const failed = results.find((result) => result.error);
      if (failed?.error) throw failed.error;
      const { data: avatarFiles } = await supabaseAdmin.storage.from("avatars").list(request.authUser.id);
      if (avatarFiles?.length) {
        await supabaseAdmin.storage.from("avatars").remove(avatarFiles.map((file) => `${request.authUser.id}/${file.name}`));
      }
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(request.authUser.id);
      if (authError) throw authError;
    } else {
      await deleteLocalAccountData(userId);
    }
    response.json({ deleted: true });
  });
}
