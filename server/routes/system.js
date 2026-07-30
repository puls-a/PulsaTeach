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
    projectPublicTrack,
    sendWelcomeEmail,
    transactionalEmailEnabled,
    sensitiveRateLimit,
    deleteSupabaseRecord,
    getSupabaseStatus,
    checkSupabaseReadiness,
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
    telemetrySchema,
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

  const healthPayload = () => ({
    ok: true,
    service: "pulsateach-api",
    storage: requireSupabaseStorage ? "supabase-strict" : shouldTrySupabase() ? "supabase-with-json-fallback" : "json-fallback",
    email: transactionalEmailEnabled ? "resend" : "disabled",
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) || process.env.npm_package_version || "development",
    timestamp: new Date().toISOString()
  });

  app.get("/api/health/live", (_request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.json({ ok: true, service: "pulsateach-api", timestamp: new Date().toISOString() });
  });

  app.get("/api/health/ready", async (_request, response) => {
    const database = await checkSupabaseReadiness();
    const ready = requireSupabaseStorage ? database.ok : true;
    response.setHeader("Cache-Control", "no-store");
    response.status(ready ? 200 : 503).json({
      ...healthPayload(),
      ok: ready,
      checks: { database }
    });
  });

  app.get("/api/health", (_request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.json({
      ...healthPayload()
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
    response.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
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
    response.setHeader("Cache-Control", "no-store");
    response.json({ track: projectPublicTrack(track) });
  });

  app.get("/api/glossary", (_request, response) => {
    response.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=1800");
    response.json({ terms: buildGlossaryIndex(learningTracks) });
  });

  app.post("/api/telemetry", sensitiveRateLimit(60), validateBody(telemetrySchema), (request, response) => {
    console.log(JSON.stringify({
      level: request.body.type === "client_error" ? "warn" : "info",
      event: request.body.type,
      name: request.body.name,
      value: request.body.value,
      rating: request.body.rating,
      route: request.body.route,
      fingerprint: request.body.fingerprint,
      navigationType: request.body.navigationType,
      requestId: request.requestId
    }));
    response.status(202).end();
  });
}
