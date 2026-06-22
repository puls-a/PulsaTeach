/* eslint-disable no-unused-vars */
export function registerAdministrationRoutes(app, context) {
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

  app.get("/api/roadmap", (_request, response) => {
    response.json(productRoadmap);
  });

  app.get("/api/stats", async (_request, response) => {
    const progressStore = await readProgressStore();
    const submissions = await readJsonStore(submissionsFile, []);
    const attempts = await readJsonStore(attemptsFile, []);
    const enrollments = await readJsonStore(enrollmentsFile, []);
    const drafts = await readJsonStore(draftsFile, []);
    const catalogStats = getCatalogStats();
    const learnerIds = new Set([...Object.keys(progressStore), ...submissions.map((item) => item.userId).filter(Boolean)]);

    response.json({
      ...catalogStats,
      learners: learnerIds.size,
      submissions: submissions.length,
      approvedSubmissions: submissions.filter((item) => item.status === "approved").length,
      attempts: attempts.length,
      enrollments: enrollments.length,
      lessonDrafts: drafts.length,
      publishedDrafts: drafts.filter((item) => item.status === "published").length,
      certificates: certificates.length,
      generatedAt: new Date().toISOString()
    });
  });

  app.get("/api/analytics", requireRole("admin", "reviewer", "author"), async (_request, response) => {
    const progressStore = await readProgressStore();
    const submissions = await readJsonStore(submissionsFile, []);
    const attempts = await readJsonStore(attemptsFile, []);
    const enrollments = await readJsonStore(enrollmentsFile, []);
    const drafts = await readJsonStore(draftsFile, []);
    const progressItems = Object.values(progressStore);

    response.json({
      funnel: [
        privacyMetric("enrolled", "Enrolled", enrollments.length),
        privacyMetric("attempted", "Ran tests", new Set(attempts.map((item) => item.userId)).size),
        privacyMetric("completed", "Completed lesson", progressItems.filter((item) => Object.keys(item.completed || {}).length > 0).length),
        privacyMetric("submitted", "Submitted project", new Set(submissions.map((item) => item.userId)).size),
        privacyMetric("approved", "Approved project", new Set(submissions.filter((item) => item.status === "approved").map((item) => item.userId)).size)
      ],
      tracks: learningTracks.map((track) => {
        const lessonIds = track.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));
        const completed = progressItems.reduce((sum, progress) => sum + lessonIds.filter((id) => progress.completed?.[id]).length, 0);
        return {
          id: track.id,
          label: track.label,
          lessons: lessonIds.length,
          completions: privacyValue(completed),
          attempts: privacyValue(attempts.filter((attempt) => attempt.trackId === track.id).length)
        };
      }),
      content: {
        drafts: drafts.length,
        review: drafts.filter((item) => item.status === "review").length,
        published: drafts.filter((item) => item.status === "published").length
      },
      privacy: {
        aggregation: "cohort",
        minimumCohort: 3,
        identifiersExposed: false,
        eventRetentionDays: 180
      },
      generatedAt: new Date().toISOString()
    });
  });

  app.get("/api/admin/export", requireRole("admin"), async (_request, response) => {
    const [progress, submissions, attempts, enrollments, drafts, users, courses, issuedCertificates, learningEvents, quizSessions] = await Promise.all([
      readJsonStore(progressFile, {}),
      readJsonStore(submissionsFile, []),
      readJsonStore(attemptsFile, []),
      readJsonStore(enrollmentsFile, []),
      readJsonStore(draftsFile, []),
      readJsonStore(usersFile, {}),
      readJsonStore(coursesFile, []),
      readJsonStore(issuedCertificatesFile, []),
      readJsonStore(learningEventsFile, []),
      readJsonStore(quizSessionsFile, [])
    ]);
    response.json({
      exportedAt: new Date().toISOString(),
      progress,
      submissions,
      attempts,
      enrollments,
      drafts,
      users,
      courses,
      issuedCertificates,
      learningEvents,
      quizSessions
    });
  });

  app.get("/api/admin/users", requireRole("admin"), async (_request, response) => {
    if (!supabaseAdmin) {
      response.json([]);
      return;
    }
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) throw error;
    response.json((data.users || []).map((user) => ({
      id: user.id,
      email: user.email,
      roles: rolesFromUser(user),
      createdAt: user.created_at,
      lastSignInAt: user.last_sign_in_at
    })));
  });

  app.patch("/api/admin/users/:id/roles", requireRole("admin"), validateBody(roleUpdateSchema), async (request, response) => {
    if (!supabaseAdmin) {
      response.status(503).json({ error: "Supabase admin unavailable.", requestId: request.requestId });
      return;
    }
    const allowed = new Set(["admin", "author", "reviewer"]);
    const roles = Array.from(new Set((Array.isArray(request.body?.roles) ? request.body.roles : [])
      .map((role) => String(role).trim())
      .filter((role) => allowed.has(role))));
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(request.params.id, {
      app_metadata: { roles }
    });
    if (error) throw error;
    await supabaseAdmin.from("profiles").update({ roles, updated_at: new Date().toISOString() }).eq("auth_user_id", request.params.id);
    response.json({ id: data.user.id, email: data.user.email, roles });
  });
}
