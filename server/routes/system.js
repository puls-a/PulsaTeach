/* eslint-disable no-unused-vars */
export function registerSystemRoutes(app, context) {
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

  app.get("/api/health", (_request, response) => {
    response.json({
      ok: true,
      service: "pulsateach-api",
      storage: requireSupabaseStorage ? "supabase-strict" : shouldTrySupabase() ? "supabase-with-json-fallback" : "json-fallback",
      email: transactionalEmailEnabled ? "resend" : "disabled",
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/supabase/status", async (_request, response) => {
    if (!shouldTrySupabase()) {
      response.json({
        enabled: supabaseEnabled,
        mode: "json",
        ok: true,
        message: "PulsaTeach is using local JSON storage. Supabase can be enabled when the configured project is reachable."
      });
      return;
    }
    response.json(await getSupabaseStatus());
  });

  app.get("/api/me", (request, response) => {
    if (!request.authUser) {
      response.status(401).json({ error: "Authentication required." });
      return;
    }
    response.json({
      userId: request.authUserId,
      email: request.authUser.email,
      roles: request.authRoles || [],
      appMetadata: request.authUser.app_metadata || {},
      userMetadata: request.authUser.user_metadata || {}
    });
  });

  app.get("/api/catalog", async (_request, response) => {
    await publishDueScheduledCourses();
    const courses = await readJsonStore(coursesFile, []);
    const publishedTracks = courses.filter((course) => course.status === "published").map(normalizePublishedCourse);
    response.json({
      tracks: [...learningTracks, ...publishedTracks].map(summarizeTrack)
    });
  });

  app.get("/api/catalog/:trackId", async (request, response) => {
    await publishDueScheduledCourses();
    const courses = await readJsonStore(coursesFile, []);
    const publishedTracks = courses.filter((course) => course.status === "published").map(normalizePublishedCourse);
    const track = [...learningTracks, ...publishedTracks].find((item) => item.id === request.params.trackId);
    if (!track) {
      response.status(404).json({ error: "Track not found.", requestId: request.requestId });
      return;
    }
    response.json({ track });
  });

  app.get("/api/glossary", (_request, response) => {
    response.json({ terms: buildGlossaryIndex(learningTracks) });
  });
}
