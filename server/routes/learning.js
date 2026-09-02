/* eslint-disable no-unused-vars */
export function registerLearningRoutes(app, context) {
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
    createSupabaseSubmission,
    reviewSupabaseSubmission,
    shouldUseSupabaseMutations,
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
    createHash,
    sanitizeProgressExamEvidence,
    readSupabaseProgressForUser,
    saveSupabaseProgressAtomic
  } = context;

  const projectCatalog = learningTracks.flatMap((track) => (track.modules || []).flatMap((module) => (module.lessons || [])
    .filter((lesson) => lesson.type === "project")
    .map((lesson) => ({ id: lesson.id, trackId: track.id, title: lesson.title }))));
  const projectIds = new Set(projectCatalog.map((project) => project.id));

  app.get("/api/projects/catalog", (_request, response) => {
    response.set("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
    response.json(projectCatalog);
  });

  app.post("/api/pulsaconf/register", sensitiveRateLimit(10), async (request, response) => {
    const fullName = String(request.body?.fullName || "").trim();
    const email = String(request.body?.email || "").trim().toLowerCase();
    const workshop = String(request.body?.workshop || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (workshop && !["html", "forms"].includes(workshop))) {
      response.status(400).json({ accepted: false, error: "Provide a valid email and, when selected, a supported workshop." });
      return;
    }
    const enrollments = await readJsonStore(enrollmentsFile, []);
    if (!enrollments.some((entry) => entry.email === email && entry.source === "pulsaconf")) {
      enrollments.unshift({ id: `enr-${randomUUID()}`, email, locale: "fr", source: "pulsaconf", status: "active", createdAt: new Date().toISOString() });
      await writeJsonStore(enrollmentsFile, enrollments.slice(0, 2000));
    }
    response.status(201).json({ accepted: true, workshop });
  });

  app.get("/api/progress/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    if (shouldUseSupabaseMutations()) {
      response.json(await readSupabaseProgressForUser(userId));
      return;
    }
    const store = await readProgressStore();
    response.json(store[userId] || null);
  });

  app.put("/api/progress/:userId", requireAuthenticatedRequest, validateBody(progressSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    if (!isObject(request.body)) {
      response.status(400).json({ error: "Progress payload must be an object." });
      return;
    }
    if (shouldUseSupabaseMutations()) {
      response.json(await saveSupabaseProgressAtomic(userId, request.body, mergeProgress, sanitizeProgressExamEvidence));
      return;
    }
    await withStoreMutation(`progress:${userId}`, async () => {
      const store = await readProgressStore();
      store[userId] = {
        ...sanitizeProgressExamEvidence(mergeProgress(store[userId], request.body)),
        userId,
        updatedAt: new Date().toISOString()
      };
      await writeProgressStore(store);
      response.json(store[userId]);
    });
  });

  app.post("/api/progress/migrate", requireAuthenticatedRequest, validateBody(progressMigrationSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const localProgress = request.body?.progress;
    if (!isObject(localProgress)) {
      response.status(400).json({ error: "Migration requires a progress object.", requestId: request.requestId });
      return;
    }
    const userId = request.authUserId;
    if (shouldUseSupabaseMutations()) {
      const progress = await saveSupabaseProgressAtomic(userId, localProgress, mergeProgress, sanitizeProgressExamEvidence);
      response.json({ migrated: true, progress });
      return;
    }
    await withStoreMutation(`progress:${userId}`, async () => {
      const store = await readProgressStore();
      const merged = sanitizeProgressExamEvidence(mergeProgress(store[userId], localProgress));
      store[userId] = { ...merged, userId, updatedAt: new Date().toISOString() };
      await writeProgressStore(store);
      response.json({ migrated: true, progress: store[userId] });
    });
  });

  app.get("/api/submissions", async (request, response) => {
    const store = await readJsonStore(submissionsFile, []);
    const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
    const requestedUserId = typeof userId === "string" ? userId.trim() : "";
    const canReview = hasRole(request, "admin", "reviewer");
    if (canReview) {
      response.json(requestedUserId ? store.filter((item) => item.userId === requestedUserId) : store);
      return;
    }
    if (!request.authUserId) {
      sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
      return;
    }
    if (request.authUserId && requestedUserId && requestedUserId !== request.authUserId) {
      sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot access another learner.");
      return;
    }
    response.json(store.filter((item) => item.userId === request.authUserId));
  });

  app.post("/api/submissions", requireAuthenticatedRequest, validateBody(submissionSchema), async (request, response) => {
    await withStoreMutation("submissions", async () => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const payload = request.body;
    if (!isObject(payload) || !payload.projectId || !payload.title) {
      response.status(400).json({ error: "Submission requires userId, projectId and title." });
      return;
    }
    const userId = request.authUserId || payload.userId;
    if (!userId || !authorizePayloadUser(request, response, payload.userId)) return;
    if (!projectIds.has(String(payload.projectId))) {
      sendApiError(response, request, 400, "PROJECT_NOT_FOUND", "Choose a project from the PulsaTeach curriculum.");
      return;
    }

    const now = new Date().toISOString();
    const baseSubmission = {
      id: `sub-${randomUUID()}`,
      userId: String(userId),
      projectId: String(payload.projectId),
      title: String(payload.title),
      description: String(payload.description || ""),
      url: String(payload.url || ""),
      repositoryUrl: String(payload.repositoryUrl || ""),
      archiveUrl: String(payload.archiveUrl || ""),
      screenshots: payload.screenshots || [],
      deliverables: payload.deliverables || [],
      selfAssessment: String(payload.selfAssessment || ""),
      visibility: payload.visibility || "private",
      status: "submitted",
      reviewRevision: 0,
      reviewLog: [],
      createdAt: now,
      updatedAt: now
    };
    if (shouldUseSupabaseMutations()) {
      response.status(201).json(await createSupabaseSubmission(baseSubmission));
      return;
    }

    const store = await readJsonStore(submissionsFile, []);
    const previous = store
      .filter((item) => item.userId === userId && item.projectId === payload.projectId)
      .sort((left, right) => Number(right.version || 1) - Number(left.version || 1))[0];
    if (previous && !["changes_requested", "approved"].includes(previous.status)) {
      sendApiError(response, request, 409, "SUBMISSION_ALREADY_ACTIVE", "Wait for review before submitting a new version.");
      return;
    }
    const submission = {
      ...baseSubmission,
      rootId: previous?.rootId || previous?.id || null,
      supersedesId: previous?.id || null,
      version: Number(previous?.version || 0) + 1,
    };
    if (!submission.rootId) submission.rootId = submission.id;
    store.unshift(submission);
    await writeJsonStore(submissionsFile, store.slice(0, 500));
    response.status(201).json(submission);
    });
  });

  app.get("/api/attempts", async (request, response) => {
    const store = await readJsonStore(attemptsFile, []);
    const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
    const lessonId = Array.isArray(request.query.lessonId) ? request.query.lessonId[0] : request.query.lessonId;
    const requestedUserId = typeof userId === "string" ? userId.trim() : "";
    const canReview = hasRole(request, "admin", "reviewer");
    if (!request.authUserId && !canReview) {
      sendApiError(response, request, 401, "AUTH_REQUIRED", "Authentication required.");
      return;
    }
    if (request.authUserId && requestedUserId && requestedUserId !== request.authUserId) {
      sendApiError(response, request, 403, "USER_ACCESS_DENIED", "Authenticated user cannot access another learner.");
      return;
    }
    const normalizedUserId = request.authUserId || requestedUserId;
    const normalizedLessonId = typeof lessonId === "string" ? lessonId.trim() : "";
    response.json(
      store.filter((item) =>
        (!normalizedUserId || item.userId === normalizedUserId) &&
        (!normalizedLessonId || item.lessonId === normalizedLessonId)
      )
    );
  });

  app.post("/api/attempts", requireAuthenticatedRequest, validateBody(attemptSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const payload = request.body;
    if (!isObject(payload) || !payload.lessonId) {
      response.status(400).json({ error: "Attempt requires userId and lessonId." });
      return;
    }
    const userId = request.authUserId || payload.userId;
    if (!userId || !authorizePayloadUser(request, response, payload.userId)) return;

    const store = await readJsonStore(attemptsFile, []);
    const passed = Number(payload.passed || 0);
    const total = Number(payload.total || 0);
    const attempt = {
      id: `att-${randomUUID()}`,
      userId: String(userId),
      lessonId: String(payload.lessonId),
      trackId: String(payload.trackId || ""),
      moduleId: String(payload.moduleId || ""),
      passed,
      total,
      success: total > 0 && passed === total,
      createdAt: new Date().toISOString()
    };
    store.unshift(attempt);
    await writeJsonStore(attemptsFile, store.slice(0, 1000));
    response.status(201).json(attempt);
  });

  app.patch("/api/submissions/:id/review", requireRole("admin", "reviewer"), validateBody(reviewSchema), async (request, response) => {
    await withStoreMutation("submissions", async () => {
    const payload = request.body;
    const allowedStatuses = new Set(["in_review", "approved", "changes_requested"]);
    if (!isObject(payload) || !allowedStatuses.has(payload.status)) {
      response.status(400).json({ error: "Review requires a valid status." });
      return;
    }
    if (payload.status === "approved" && payload.score == null) {
      sendApiError(response, request, 400, "REVIEW_SCORE_REQUIRED", "Approved submissions require a score.");
      return;
    }

    const reviewer = String(request.authUserId || payload.reviewer || "PulsaTeach reviewer");
    if (shouldUseSupabaseMutations()) {
      response.json(await reviewSupabaseSubmission(request.params.id, { ...payload, reviewer }));
      return;
    }

    const store = await readJsonStore(submissionsFile, []);
    const index = store.findIndex((submission) => submission.id === request.params.id);
    if (index === -1) {
      sendApiError(response, request, 404, "SUBMISSION_NOT_FOUND", "Submission not found.");
      return;
    }
    if (payload.expectedVersion && payload.expectedVersion !== Number(store[index].version || 1)) {
      sendApiError(response, request, 409, "SUBMISSION_VERSION_CONFLICT", "Submission version changed before this review was saved.");
      return;
    }
    const currentReviewRevision = Number(store[index].reviewRevision || 0);
    if (payload.expectedReviewRevision !== currentReviewRevision) {
      sendApiError(response, request, 409, "SUBMISSION_REVIEW_REVISION_CONFLICT", "Submission review changed before this decision was saved.", {
        expectedReviewRevision: payload.expectedReviewRevision,
        currentReviewRevision
      });
      return;
    }
    const currentRootId = store[index].rootId || store[index].id;
    const isSuperseded = store.some((submission) => (submission.rootId || submission.id) === currentRootId && Number(submission.version || 1) > Number(store[index].version || 1));
    if (payload.status === "approved" && isSuperseded) {
      sendApiError(response, request, 409, "SUBMISSION_SUPERSEDED", "Only the latest project version can be approved.");
      return;
    }

    const reviewedAt = new Date().toISOString();
    const review = {
      status: payload.status,
      feedback: String(payload.feedback || ""),
      reviewer,
      score: payload.score == null ? null : Number(payload.score),
      rubric: isObject(payload.rubric) ? payload.rubric : {},
      contextualComments: isObject(payload.contextualComments) ? payload.contextualComments : {},
      reviewedAt,
      updatedAt: reviewedAt
    };
    store[index] = {
      ...store[index],
      ...review,
      reviewRevision: currentReviewRevision + 1,
      reviewLog: [{
        status: review.status,
        feedback: review.feedback,
        reviewer: review.reviewer,
        score: review.score,
        rubric: review.rubric,
        contextualComments: review.contextualComments,
        at: reviewedAt
      }, ...(store[index].reviewLog || [])].slice(0, 100)
    };
    await writeJsonStore(submissionsFile, store);
    response.json(store[index]);
    });
  });

  app.delete("/api/submissions/:id", requireRole("admin"), async (request, response) => {
    await withStoreMutation("submissions", async () => {
    const store = await readJsonStore(submissionsFile, []);
    const submission = store.find((item) => item.id === request.params.id);
    if (!submission) {
      sendApiError(response, request, 404, "SUBMISSION_NOT_FOUND", "Submission not found.");
      return;
    }
    if (shouldTrySupabase()) await deleteSupabaseRecord("submissions.json", submission.id);
    else await writeJsonStore(submissionsFile, store.filter((item) => item.id !== submission.id));
    response.json({ ok: true, id: submission.id });
    });
  });

  app.post("/api/events", sensitiveRateLimit(120), requireAuthenticatedRequest, validateBody(eventSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const payload = request.body;
    if (!isObject(payload) || !payload.eventType) {
      response.status(400).json({ error: "Event type is required.", requestId: request.requestId });
      return;
    }
    const allowedEvents = new Set(["lesson_opened", "tests_run", "tests_failed", "lesson_completed", "hint_opened", "progress_migrated", "review_started", "review_answered", "review_completed"]);
    if (!allowedEvents.has(payload.eventType)) {
      response.status(400).json({ error: "Unsupported event type.", requestId: request.requestId });
      return;
    }
    const store = await readJsonStore(learningEventsFile, []);
    const event = {
      id: randomUUID(),
      userId: request.authUserId,
      eventType: payload.eventType,
      lessonId: payload.lessonId ? String(payload.lessonId) : "",
      trackId: payload.trackId ? String(payload.trackId) : "",
      payload: isObject(payload.payload) ? payload.payload : {},
      requestId: request.requestId,
      createdAt: new Date().toISOString()
    };
    store.unshift(event);
    const retentionStart = Date.now() - 180 * 24 * 60 * 60 * 1000;
    await writeJsonStore(learningEventsFile, store.filter((item) => new Date(item.createdAt).getTime() >= retentionStart).slice(0, 10000));
    response.status(201).json(event);
  });

  app.get("/api/admin/learning-events", requireRole("admin", "reviewer", "author"), async (request, response) => {
    const store = await readJsonStore(learningEventsFile, []);
    const failedOnly = request.query.failed === "true";
    const includeIdentity = request.query.includeIdentity === "true" && hasRole(request, "admin");
    response.json((failedOnly ? store.filter((event) => event.eventType === "tests_failed") : store).slice(0, 500).map((event) => ({
      ...event,
      userKey: analyticsUserKey(event.userId),
      ...(includeIdentity ? {} : { userId: undefined })
    })));
  });
}
