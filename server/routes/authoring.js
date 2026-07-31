/* eslint-disable no-unused-vars */
export function registerAuthoringRoutes(app, context) {
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

  app.get("/api/enrollments", requireRole("admin", "reviewer"), async (_request, response) => {
    response.json(await readJsonStore(enrollmentsFile, []));
  });

  app.post("/api/enrollments", sensitiveRateLimit(20), validateBody(enrollmentSchema), async (request, response) => {
    const payload = request.body;
    if (!isObject(payload) || !payload.email) {
      response.status(400).json({ error: "Enrollment requires an email." });
      return;
    }

    const email = String(payload.email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      response.status(400).json({ error: "Enrollment email is invalid." });
      return;
    }

    const store = await readJsonStore(enrollmentsFile, []);
    const existing = store.find((item) => item.email === email);
    if (existing) {
      response.status(202).json({ accepted: true });
      return;
    }

    const enrollment = {
      id: `enr-${randomUUID()}`,
      email,
      locale: String(payload.locale || "en"),
      source: String(payload.source || "landing"),
      status: "active",
      createdAt: new Date().toISOString()
    };
    store.unshift(enrollment);
    await writeJsonStore(enrollmentsFile, store.slice(0, 2000));
    response.status(202).json({ accepted: true });
  });

  app.get("/api/lesson-drafts", requireRole("admin", "author", "reviewer"), async (request, response) => {
    const store = await readJsonStore(draftsFile, []);
    const status = Array.isArray(request.query.status) ? request.query.status[0] : request.query.status;
    const normalizedStatus = typeof status === "string" ? status.trim() : "";
    response.json(normalizedStatus ? store.filter((item) => item.status === normalizedStatus) : store);
  });

  app.post("/api/lesson-drafts", requireRole("admin", "author"), validateBody(lessonDraftSchema), async (request, response) => {
    const payload = request.body;
    if (!isObject(payload) || !payload.trackId || !payload.title) {
      response.status(400).json({ error: "Lesson draft requires trackId and title." });
      return;
    }

    const store = await readJsonStore(draftsFile, []);
    const now = new Date().toISOString();
    const draft = {
      id: `draft-${randomUUID()}`,
      trackId: String(payload.trackId),
      moduleId: String(payload.moduleId || "backlog"),
      title: normalizeLocalizedText(payload.title),
      objective: normalizeLocalizedText(payload.objective || ""),
      prompt: normalizeLocalizedText(payload.prompt || ""),
      type: String(payload.type || "html"),
      difficulty: String(payload.difficulty || "starter"),
      skills: Array.isArray(payload.skills) ? payload.skills.map(String) : [],
      xp: Number.isFinite(Number(payload.xp)) ? Number(payload.xp) : 25,
      status: "draft",
      createdAt: now,
      updatedAt: now
    };
    store.unshift(draft);
    await writeJsonStore(draftsFile, store.slice(0, 1000));
    response.status(201).json(draft);
  });

  app.patch("/api/lesson-drafts/:id", requireRole("admin", "author", "reviewer"), validateBody(lessonDraftUpdateSchema), async (request, response) => {
    const payload = request.body;
    if (!isObject(payload)) {
      response.status(400).json({ error: "Draft update requires an object." });
      return;
    }

    const allowedStatuses = new Set(["draft", "review", "published"]);
    const store = await readJsonStore(draftsFile, []);
    const index = store.findIndex((item) => item.id === request.params.id);
    if (index === -1) {
      response.status(404).json({ error: "Lesson draft not found." });
      return;
    }

    store[index] = {
      ...store[index],
      ...(payload.status && allowedStatuses.has(payload.status) ? { status: payload.status } : {}),
      ...(payload.title ? { title: normalizeLocalizedText(payload.title) } : {}),
      ...(payload.objective ? { objective: normalizeLocalizedText(payload.objective) } : {}),
      ...(payload.prompt ? { prompt: normalizeLocalizedText(payload.prompt) } : {}),
      updatedAt: new Date().toISOString()
    };
    await writeJsonStore(draftsFile, store);
    response.json(store[index]);
  });

  app.delete("/api/lesson-drafts/:id", requireRole("admin", "author"), async (request, response) => {
    const store = await readJsonStore(draftsFile, []);
    const next = store.filter((item) => item.id !== request.params.id);
    if (next.length === store.length) {
      response.status(404).json({ error: "Lesson draft not found." });
      return;
    }
    if (shouldTrySupabase()) {
      try {
        await deleteSupabaseRecord("lesson-drafts.json", request.params.id);
        response.json({ ok: true, id: request.params.id });
        return;
      } catch (error) {
        if (requireSupabaseStorage) throw error;
        markSupabaseUnavailable();
      }
    }
    await writeJsonStore(draftsFile, next);
    response.json({ ok: true, id: request.params.id });
  });
}
