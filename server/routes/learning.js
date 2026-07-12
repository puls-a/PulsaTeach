/* eslint-disable no-unused-vars */
export function registerLearningRoutes(app, context) {
  const {
    sensitiveRateLimit,
    deleteSupabaseRecord,
    attemptSchema,
    certificateRevokeSchema,
    eventSchema,
    progressMigrationSchema,
    progressSchema,
    quizSessionSchema,
    reviewSchema,
    submissionSchema,
    validateBody,
    submissionsFile,
    attemptsFile,
    usersFile,
    issuedCertificatesFile,
    learningEventsFile,
    quizSessionsFile,
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
    analyticsUserKey,
    buildCertificatesForUser,
    mergeProgress,
    shouldTrySupabase,
    randomUUID,
  } = context;

  app.get("/api/progress/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
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
    const store = await readProgressStore();
    store[userId] = {
      ...request.body,
      userId,
      updatedAt: new Date().toISOString()
    };
    await writeProgressStore(store);
    response.json(store[userId]);
  });

  app.post("/api/progress/migrate", requireAuthenticatedRequest, validateBody(progressMigrationSchema), async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const localProgress = request.body?.progress;
    if (!isObject(localProgress)) {
      response.status(400).json({ error: "Migration requires a progress object.", requestId: request.requestId });
      return;
    }
    const userId = request.authUserId;
    const store = await readProgressStore();
    const merged = mergeProgress(store[userId], localProgress);
    store[userId] = { ...merged, userId, updatedAt: new Date().toISOString() };
    await writeProgressStore(store);
    response.json({ migrated: true, progress: store[userId] });
  });

  app.get("/api/quizzes/:quizId/session", requireAuthenticatedRequest, async (request, response) => {
    const store = await readJsonStore(quizSessionsFile, []);
    const session = store.find((item) => item.userId === request.authUserId && item.quizId === request.params.quizId);
    response.json(session || null);
  });

  app.put("/api/quizzes/:quizId/session", requireAuthenticatedRequest, validateBody(quizSessionSchema), async (request, response) => {
    const store = await readJsonStore(quizSessionsFile, []);
    const id = `${request.authUserId}:${request.params.quizId}`;
    const index = store.findIndex((item) => item.id === id);
    const session = {
      id,
      userId: request.authUserId,
      quizId: request.params.quizId,
      ...request.body,
      updatedAt: new Date().toISOString()
    };
    if (index === -1) store.unshift(session);
    else store[index] = session;
    await writeJsonStore(quizSessionsFile, store.slice(0, 5000));
    response.json(session);
  });

  app.get("/api/submissions", async (request, response) => {
    const store = await readJsonStore(submissionsFile, []);
    const userId = Array.isArray(request.query.userId) ? request.query.userId[0] : request.query.userId;
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
    if (!normalizedUserId && !canReview) {
      sendApiError(response, request, 403, "ROLE_REQUIRED", "Reviewer role required to list all submissions.");
      return;
    }
    response.json(normalizedUserId ? store.filter((item) => item.userId === normalizedUserId) : store);
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

    const store = await readJsonStore(submissionsFile, []);
    const previous = store
      .filter((item) => item.userId === userId && item.projectId === payload.projectId)
      .sort((left, right) => Number(right.version || 1) - Number(left.version || 1))[0];
    if (previous && !["changes_requested", "approved"].includes(previous.status)) {
      sendApiError(response, request, 409, "SUBMISSION_ALREADY_ACTIVE", "Wait for review before submitting a new version.");
      return;
    }
    const now = new Date().toISOString();
    const submission = {
      id: `sub-${randomUUID()}`,
      rootId: previous?.rootId || previous?.id || null,
      supersedesId: previous?.id || null,
      version: Number(previous?.version || 0) + 1,
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
      reviewLog: [],
      createdAt: now,
      updatedAt: now
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
      id: `att-${Date.now()}`,
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

    const store = await readJsonStore(submissionsFile, []);
    const index = store.findIndex((submission) => submission.id === request.params.id);
    if (index === -1) {
      response.status(404).json({ error: "Submission not found." });
      return;
    }
    if (payload.expectedVersion && payload.expectedVersion !== Number(store[index].version || 1)) {
      sendApiError(response, request, 409, "SUBMISSION_VERSION_CONFLICT", "Submission version changed before this review was saved.");
      return;
    }

    const reviewedAt = new Date().toISOString();
    const review = {
      status: payload.status,
      feedback: String(payload.feedback || ""),
      reviewer: String(payload.reviewer || "PulsaTeach reviewer"),
      score: Number.isFinite(Number(payload.score)) ? Number(payload.score) : null,
      rubric: isObject(payload.rubric) ? payload.rubric : {},
      contextualComments: isObject(payload.contextualComments) ? payload.contextualComments : {},
      reviewedAt,
      updatedAt: reviewedAt
    };
    store[index] = {
      ...store[index],
      ...review,
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

  app.get("/api/certificates/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const progressStore = await readProgressStore();
    const submissions = await readJsonStore(submissionsFile, []);
    const progress = progressStore[userId] || {};
    const userSubmissions = submissions.filter((item) => item.userId === userId);
    const issued = await readJsonStore(issuedCertificatesFile, []);
    response.json(buildCertificatesForUser(userId, progress, userSubmissions, issued));
  });

  app.post("/api/certificates/:certificateId/issue", requireAuthenticatedRequest, async (request, response) => {
    if (!requireAuthenticatedWrite(request, response)) return;
    const userId = request.authUserId;
    const progressStore = await readProgressStore();
    const submissions = await readJsonStore(submissionsFile, []);
    const users = await readJsonStore(usersFile, {});
    const issued = await readJsonStore(issuedCertificatesFile, []);
    const existing = issued.find((item) => item.userId === userId && item.certificateId === request.params.certificateId && !item.revokedAt);
    if (existing) {
      response.json(existing);
      return;
    }
    const evaluation = buildCertificatesForUser(userId, progressStore[userId] || {}, submissions.filter((item) => item.userId === userId), issued)
      .certificates.find((item) => item.id === request.params.certificateId);
    if (!evaluation) {
      response.status(404).json({ error: "Certificate not found.", requestId: request.requestId });
      return;
    }
    if (!evaluation.eligible) {
      response.status(409).json({ error: "Certificate requirements are not complete.", progress: evaluation.progress, requestId: request.requestId });
      return;
    }
    const now = new Date().toISOString();
    const certificate = {
      id: randomUUID(),
      verificationCode: randomUUID().replaceAll("-", ""),
      userId,
      certificateId: evaluation.id,
      learnerName: users[userId]?.displayName || request.authUser?.email || "PulsaTeach Learner",
      title: evaluation.title,
      certificateVersion: evaluation.certificateVersion,
      evidence: evaluation.evidence,
      issuedAt: now,
      expiresAt: null,
      revokedAt: null,
      revocationReason: null
    };
    issued.unshift(certificate);
    await writeJsonStore(issuedCertificatesFile, issued);
    response.status(201).json(certificate);
  });

  app.get("/api/certificates/public/:verificationCode", async (request, response) => {
    const issued = await readJsonStore(issuedCertificatesFile, []);
    const certificate = issued.find((item) => item.verificationCode === request.params.verificationCode);
    if (!certificate) {
      response.status(404).json({ error: "Certificate not found.", requestId: request.requestId });
      return;
    }
    response.json({
      valid: !certificate.revokedAt && (!certificate.expiresAt || new Date(certificate.expiresAt).getTime() > Date.now()),
      status: certificate.revokedAt ? "revoked" : certificate.expiresAt && new Date(certificate.expiresAt).getTime() <= Date.now() ? "expired" : "valid",
      certificate: {
        verificationCode: certificate.verificationCode,
        learnerName: certificate.learnerName,
        title: certificate.title,
        certificateVersion: certificate.certificateVersion || 1,
        evidence: certificate.evidence,
        issuedAt: certificate.issuedAt,
        expiresAt: certificate.expiresAt || null,
        revokedAt: certificate.revokedAt,
        revocationReason: certificate.revocationReason || null
      }
    });
  });

  app.patch("/api/certificates/:id/revoke", requireRole("admin", "reviewer"), validateBody(certificateRevokeSchema), async (request, response) => {
    const issued = await readJsonStore(issuedCertificatesFile, []);
    const index = issued.findIndex((certificate) => certificate.id === request.params.id);
    if (index === -1) {
      sendApiError(response, request, 404, "CERTIFICATE_NOT_FOUND", "Certificate not found.");
      return;
    }
    issued[index] = {
      ...issued[index],
      revokedAt: new Date().toISOString(),
      revocationReason: request.body.reason
    };
    await writeJsonStore(issuedCertificatesFile, issued);
    response.json(issued[index]);
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
