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
    getSupabaseStatus,
    supabaseAdmin,
    supabaseEnabled,
    deleteSupabaseLessonDraft,
    insertSupabaseStoreItem,
    updateSupabaseLessonDraft,
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
    shouldUseSupabaseMutations,
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
      revision: 1,
      createdAt: now,
      updatedAt: now
    };
    if (shouldUseSupabaseMutations()) {
      response.status(201).json(await insertSupabaseStoreItem("lesson-drafts.json", draft));
      return;
    }
    await withStoreMutation("lesson-drafts", async () => {
      const currentStore = await readJsonStore(draftsFile, []);
      currentStore.unshift(draft);
      await writeJsonStore(draftsFile, currentStore.slice(0, 1000));
    });
    response.status(201).json(draft);
  });

  app.patch("/api/lesson-drafts/:id", requireRole("admin", "author", "reviewer"), validateBody(lessonDraftUpdateSchema), async (request, response) => {
    const payload = request.body;
    if (!isObject(payload)) {
      response.status(400).json({ error: "Draft update requires an object." });
      return;
    }

    const changes = {
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.title ? { title: normalizeLocalizedText(payload.title) } : {}),
      ...(payload.objective ? { objective: normalizeLocalizedText(payload.objective) } : {}),
      ...(payload.prompt ? { prompt: normalizeLocalizedText(payload.prompt) } : {})
    };
    if (shouldUseSupabaseMutations()) {
      response.json(await updateSupabaseLessonDraft(request.params.id, changes, payload.expectedRevision));
      return;
    }
    const updated = await withStoreMutation("lesson-drafts", async () => {
      const store = await readJsonStore(draftsFile, []);
      const index = store.findIndex((item) => item.id === request.params.id);
      if (index === -1) throw lessonDraftError(404, "LESSON_DRAFT_NOT_FOUND", "Lesson draft not found.");
      const currentRevision = Number(store[index].revision || 1);
      if (currentRevision !== payload.expectedRevision) {
        throw lessonDraftError(409, "LESSON_DRAFT_CONFLICT", "Lesson draft changed. Reload it before retrying.", {
          expectedRevision: payload.expectedRevision,
          currentRevision
        });
      }
      store[index] = { ...store[index], ...changes, revision: currentRevision + 1, updatedAt: new Date().toISOString() };
      await writeJsonStore(draftsFile, store);
      return store[index];
    });
    response.json(updated);
  });

  app.delete("/api/lesson-drafts/:id", requireRole("admin", "author"), async (request, response) => {
    const expectedRevision = Number(Array.isArray(request.query.expectedRevision) ? request.query.expectedRevision[0] : request.query.expectedRevision);
    if (!Number.isInteger(expectedRevision) || expectedRevision < 1) {
      sendApiError(response, request, 400, "VALIDATION_ERROR", "A valid expectedRevision query parameter is required.");
      return;
    }
    if (shouldUseSupabaseMutations()) {
      await deleteSupabaseLessonDraft(request.params.id, expectedRevision);
    } else {
      await withStoreMutation("lesson-drafts", async () => {
        const store = await readJsonStore(draftsFile, []);
        const draft = store.find((item) => item.id === request.params.id);
        if (!draft) throw lessonDraftError(404, "LESSON_DRAFT_NOT_FOUND", "Lesson draft not found.");
        const currentRevision = Number(draft.revision || 1);
        if (currentRevision !== expectedRevision) {
          throw lessonDraftError(409, "LESSON_DRAFT_CONFLICT", "Lesson draft changed. Reload it before deleting.", {
            expectedRevision,
            currentRevision
          });
        }
        const next = store.filter((item) => item.id !== request.params.id);
        await writeJsonStore(draftsFile, next);
      });
    }
    response.json({ ok: true, id: request.params.id });
  });
}

function lessonDraftError(status, code, message, details) {
  return Object.assign(new Error(message), { status, code, details });
}
