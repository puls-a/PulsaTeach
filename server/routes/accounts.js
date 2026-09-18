/* eslint-disable no-unused-vars */
import { removeStorageFolderFiles } from "../storageHelpers.js";
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
    listIssuedCertificatesForUser,
    listSupabaseStoreForUser,
    readSupabaseProfileForUser,
    readSupabaseProgressForUser,
    saveSupabaseProfileForUser,
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
    shouldUseSupabaseMutations,
    markSupabaseUnavailable,
    rolesFromUser,
    randomUUID,
    createHash
  } = context;

  const readUserProfile = async (userId) => {
    if (shouldUseSupabaseMutations()) return (await readSupabaseProfileForUser(userId)) || createDefaultUser(userId);
    const users = await readJsonStore(usersFile, {});
    return users[userId] || createDefaultUser(userId);
  };
  const saveUserProfile = async (user) => {
    if (shouldUseSupabaseMutations()) return saveSupabaseProfileForUser(user);
    const users = await readJsonStore(usersFile, {});
    users[user.userId] = user;
    await writeJsonStore(usersFile, users);
    return user;
  };
  const listUserRecords = async (storeName, file, userId) => {
    if (shouldUseSupabaseMutations()) return listSupabaseStoreForUser(storeName, userId);
    return (await readJsonStore(file, [])).filter((item) => item.userId === userId);
  };
  const readUserProgress = async (userId) => {
    if (shouldUseSupabaseMutations()) return readSupabaseProgressForUser(userId);
    const progress = await readProgressStore();
    return progress[userId] || null;
  };

  app.get("/api/path/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const [progress, attempts, user] = await Promise.all([
      readUserProgress(userId),
      listUserRecords("attempts.json", attemptsFile, userId),
      readUserProfile(userId)
    ]);
    response.json(buildStudyPlan(progress || {}, attempts, user.goal));
  });

  app.get("/api/profile/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const [progress, userSubmissions, userAttempts, issuedCertificates, quizSessions, user] = await Promise.all([
      readUserProgress(userId),
      listUserRecords("submissions.json", submissionsFile, userId),
      listUserRecords("attempts.json", attemptsFile, userId),
      listIssuedCertificatesForUser(userId),
      listUserRecords("quiz-sessions.json", quizSessionsFile, userId),
      readUserProfile(userId)
    ]);

    response.json({
      userId,
      displayName: user.displayName,
      user,
      progress,
      submissions: userSubmissions,
      attempts: userAttempts.slice(0, 20),
      certificates: buildCertificatesForUser(userId, progress, userSubmissions, issuedCertificates, quizSessions).certificates,
      summary: buildProfileSummary(progress, userSubmissions, userAttempts)
    });
  });

  app.get("/api/users/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    response.json(await readUserProfile(userId));
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
    const current = await readUserProfile(userId);
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
    const saved = await saveUserProfile(next);
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
    response.json(saved);
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
    const avatarBucket = supabaseAdmin.storage.from("avatars");
    const objectPath = `${request.authUser.id}/avatar`;
    const { error: uploadError } = await avatarBucket.upload(objectPath, parsed.buffer, {
      contentType: parsed.mime,
      upsert: true,
      cacheControl: "3600"
    });
    if (uploadError) throw uploadError;
    await removeStorageFolderFiles(avatarBucket, request.authUser.id, ["avatar"]);
    const { data } = avatarBucket.getPublicUrl(objectPath);
    const userId = request.authUserId;
    const user = await saveUserProfile({
      ...await readUserProfile(userId),
      avatarUrl: `${data.publicUrl}?v=${Date.now()}`,
      updatedAt: new Date().toISOString()
    });
    response.status(201).json({ avatarUrl: user.avatarUrl });
  });

  app.get("/api/account/export", requireAuthenticatedRequest, async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const userId = request.authUserId;
    const [progress, submissions, attempts, user, issuedCertificates, learningEvents, quizSessions, discordLink, verifiedTracks, legalAcceptances] = await Promise.all([
      readUserProgress(userId),
      listUserRecords("submissions.json", submissionsFile, userId),
      listUserRecords("attempts.json", attemptsFile, userId),
      readUserProfile(userId),
      listIssuedCertificatesForUser(userId),
      listUserRecords("learning-events.json", learningEventsFile, userId),
      listUserRecords("quiz-sessions.json", quizSessionsFile, userId),
      supabaseAdmin && request.authUser?.id
        ? supabaseAdmin.from("discord_links").select("discord_id,discord_username,linked_at").eq("user_id", request.authUser.id).maybeSingle()
        : Promise.resolve({ data: null, error: null }),
      supabaseAdmin
        ? supabaseAdmin.from("verified_track_completions").select("track_id,completed_at").eq("user_id", userId)
        : Promise.resolve({ data: [], error: null }),
      supabaseAdmin && request.authUser?.id
        ? supabaseAdmin.from("legal_acceptances").select("document,version,method,accepted_at").eq("user_id", request.authUser.id)
        : Promise.resolve({ data: [], error: null })
    ]);
    for (const result of [discordLink, verifiedTracks, legalAcceptances]) {
      if (result.error) throw result.error;
    }
    response.json({
      exportedAt: new Date().toISOString(),
      account: {
        userId,
        email: request.authUser?.email,
        profile: user
      },
      progress,
      submissions,
      attempts,
      certificates: issuedCertificates,
      learningEvents,
      quizSessions,
      discord: discordLink.data,
      verifiedTrackCompletions: verifiedTracks.data || [],
      legalAcceptances: legalAcceptances.data || []
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
      await removeStorageFolderFiles(supabaseAdmin.storage.from("avatars"), request.authUser.id);
      const { error: purgeError } = await supabaseAdmin.rpc("purge_application_user_data", {
        p_auth_user_id: request.authUser.id,
        p_local_user_id: userId
      });
      if (purgeError) throw purgeError;
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(request.authUser.id);
      if (authError) throw authError;
    } else {
      await deleteLocalAccountData(userId);
    }
    response.json({ deleted: true });
  });
}
