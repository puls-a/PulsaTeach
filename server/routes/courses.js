/* eslint-disable no-unused-vars */
export function registerCoursesRoutes(app, context) {
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

  app.get("/api/courses", async (request, response) => {
    await publishDueScheduledCourses();
    const courses = await readJsonStore(coursesFile, []);
    const canReview = hasRole(request, "admin", "author", "reviewer");
    response.json(canReview ? courses : courses.filter((course) => course.status === "published"));
  });

  app.post("/api/courses", requireRole("admin", "author"), validateBody(courseCreateSchema), async (request, response) => {
    await withStoreMutation("courses", async () => {
    const payload = request.body;
    if (!isObject(payload) || !payload.title) {
      response.status(400).json({ error: "Course requires a title.", requestId: request.requestId });
      return;
    }
    const store = await readJsonStore(coursesFile, []);
    const now = new Date().toISOString();
    const title = normalizeLocalizedText(payload.title);
    const baseSlug = slugify(payload.slug || title.fr || title.en || "formation");
    const slug = uniqueSlug(baseSlug, store);
    const course = {
      id: `course-${randomUUID()}`,
      slug,
      title,
      description: normalizeLocalizedText(payload.description || ""),
      level: String(payload.level || "beginner"),
      language: String(payload.language || "fr"),
      status: "draft",
      version: 1,
      authorUserId: request.authUserId || "admin",
      curriculum: isObject(payload.curriculum) ? payload.curriculum : { modules: [] },
      workflowLog: [{
        from: null,
        to: "draft",
        actor: request.authUserId || "admin",
        comment: "Course created",
        at: now,
        kind: "created"
      }],
      createdAt: now,
      updatedAt: now,
      publishedAt: null,
      scheduledAt: null,
      archivedAt: null
    };
    if (shouldTrySupabase()) {
      const { data, error } = await supabaseAdmin.rpc("create_course_atomic", {
        p_course: course,
        p_actor: request.authUserId || "admin"
      });
      if (error) throw error;
      response.status(201).json(data);
      return;
    }
    store.unshift(course);
    const versions = await readJsonStore(courseVersionsFile, []);
    versions.unshift(createCourseVersion(course, request.authUserId || "admin", "created", "Course created", new Date(now)));
    await writeJsonStore(coursesFile, store);
    await writeJsonStore(courseVersionsFile, versions);
    response.status(201).json(course);
    });
  });

  app.patch("/api/courses/:id", requireRole("admin", "author", "reviewer"), validateBody(courseUpdateSchema), async (request, response) => {
    await withStoreMutation("courses", async () => {
    const store = await readJsonStore(coursesFile, []);
    const index = store.findIndex((course) => course.id === request.params.id);
    if (index === -1) {
      response.status(404).json({ error: "Course not found.", requestId: request.requestId });
      return;
    }
    const payload = isObject(request.body) ? request.body : {};
    const current = store[index];
    if (payload.expectedVersion && Number(payload.expectedVersion) !== Number(current.version || 1)) {
      sendApiError(response, request, 409, "COURSE_VERSION_CONFLICT", "Course was updated by another editor.", { currentVersion: current.version || 1 });
      return;
    }
    const nextStatus = payload.status || current.status;
    const transition = authorizeCourseTransition(current.status, nextStatus, request.authRoles || []);
    if (!transition.allowed) {
      sendApiError(response, request, 403, "COURSE_TRANSITION_DENIED", `Transition ${current.status} → ${nextStatus} is not allowed for this role.`, { requiredRoles: transition.requiredRoles });
      return;
    }
    const hasContentChanges = ["title", "description", "curriculum", "level"].some((field) => payload[field] !== undefined);
    const changedStatus = nextStatus !== current.status;
    if (!hasContentChanges && !changedStatus) {
      sendApiError(response, request, 400, "COURSE_NO_CHANGES", "Course update does not contain any changes.");
      return;
    }
    if (hasContentChanges && !hasRole(request, "admin", "author")) {
      sendApiError(response, request, 403, "COURSE_EDIT_DENIED", "Author role required to edit course content.");
      return;
    }
    if ((hasContentChanges || ["review"].includes(nextStatus)) && !hasRole(request, "admin") && current.authorUserId !== request.authUserId) {
      sendApiError(response, request, 403, "COURSE_OWNER_REQUIRED", "Only the owning author can edit or submit this course.");
      return;
    }
    if (hasContentChanges && !["draft", "changes_requested"].includes(current.status)) {
      sendApiError(response, request, 409, "COURSE_CONTENT_LOCKED", "Course content can only be edited in draft or changes_requested status.");
      return;
    }
    if (nextStatus === "changes_requested" && !payload.comment?.trim()) {
      sendApiError(response, request, 400, "REVIEW_COMMENT_REQUIRED", "A review comment is required when changes are requested.");
      return;
    }
    const candidate = {
      ...current,
      ...(payload.title ? { title: normalizeLocalizedText(payload.title) } : {}),
      ...(payload.description ? { description: normalizeLocalizedText(payload.description) } : {}),
      ...(payload.curriculum && isObject(payload.curriculum) ? { curriculum: payload.curriculum } : {}),
      ...(payload.level ? { level: String(payload.level) } : {})
    };
    if (["approved", "scheduled", "published"].includes(nextStatus)) {
      const validationErrors = validateCourseForPublication(candidate);
      if (validationErrors.length) {
        response.status(422).json({ error: "Course is not ready for publication.", validationErrors, requestId: request.requestId });
        return;
      }
    }
    if (nextStatus === "scheduled" && (!payload.scheduledAt || new Date(payload.scheduledAt).getTime() <= Date.now())) {
      sendApiError(response, request, 400, "INVALID_SCHEDULE", "A future scheduledAt value is required.");
      return;
    }
    const now = new Date();
    const nextVersion = Number(current.version || 1) + 1;
    store[index] = {
      ...candidate,
      status: nextStatus,
      version: nextVersion,
      updatedAt: now.toISOString(),
      publishedAt: nextStatus === "published" ? current.publishedAt || now.toISOString() : nextStatus === "archived" ? current.publishedAt : null,
      scheduledAt: nextStatus === "scheduled" ? payload.scheduledAt : null,
      archivedAt: nextStatus === "archived" ? now.toISOString() : null,
      workflowLog: changedStatus
        ? appendWorkflowLog(current.workflowLog, {
            from: current.status,
            to: nextStatus,
            actor: request.authUserId || request.authRoles?.join(",") || "system",
            comment: payload.comment || "",
            at: now.toISOString(),
            kind: "transition"
          })
        : current.workflowLog || []
    };
    if (shouldTrySupabase()) {
      const { data, error } = await supabaseAdmin.rpc("save_course_atomic", {
        p_course: store[index],
        p_expected_version: Number(current.version || 1),
        p_actor: request.authUserId || "admin",
        p_change_type: changedStatus ? "transition" : "content",
        p_comment: payload.comment || ""
      });
      if (error?.message?.includes("COURSE_VERSION_CONFLICT")) {
        sendApiError(response, request, 409, "COURSE_VERSION_CONFLICT", "Course was updated by another editor.", { currentVersion: Number(error.details) || undefined });
        return;
      }
      if (error) throw error;
      response.json(data);
      return;
    }
    const versions = await readJsonStore(courseVersionsFile, []);
    if (!versions.some((entry) => entry.courseId === current.id)) {
      versions.unshift(createCourseVersion({ ...current, version: Number(current.version || 1) }, current.authorUserId || "system", "created", "Legacy baseline"));
    }
    versions.unshift(createCourseVersion(store[index], request.authUserId || "admin", changedStatus ? "transition" : "content", payload.comment, now));
    await writeJsonStore(coursesFile, store);
    await writeJsonStore(courseVersionsFile, versions.slice(0, 5000));
    response.json(store[index]);
    });
  });

  app.get("/api/courses/:id/versions", requireRole("admin", "author", "reviewer"), async (request, response) => {
    const courses = await readJsonStore(coursesFile, []);
    if (!courses.some((course) => course.id === request.params.id)) {
      sendApiError(response, request, 404, "COURSE_NOT_FOUND", "Course not found.");
      return;
    }
    const versions = await readJsonStore(courseVersionsFile, []);
    response.json(versions.filter((version) => version.courseId === request.params.id).map(({ snapshot: _snapshot, ...version }) => version));
  });

  app.get("/api/courses/:id/versions/:version/diff", requireRole("admin", "author", "reviewer"), async (request, response) => {
    const versions = (await readJsonStore(courseVersionsFile, [])).filter((entry) => entry.courseId === request.params.id);
    const target = versions.find((entry) => entry.version === Number(request.params.version));
    const againstVersion = Number(request.query.against) || Number(request.params.version) - 1;
    const against = versions.find((entry) => entry.version === againstVersion);
    if (!target || !against) {
      sendApiError(response, request, 404, "COURSE_VERSION_NOT_FOUND", "Course version not found.");
      return;
    }
    response.json(diffCourseVersions(against, target));
  });

  app.post("/api/courses/:id/rollback", requireRole("admin", "reviewer"), validateBody(courseRollbackSchema), async (request, response) => {
    await withStoreMutation("courses", async () => {
    const store = await readJsonStore(coursesFile, []);
    const index = store.findIndex((course) => course.id === request.params.id);
    if (index === -1) {
      sendApiError(response, request, 404, "COURSE_NOT_FOUND", "Course not found.");
      return;
    }
    const versions = await readJsonStore(courseVersionsFile, []);
    const source = versions.find((entry) => entry.courseId === request.params.id && entry.version === request.body.version);
    if (!source) {
      sendApiError(response, request, 404, "COURSE_VERSION_NOT_FOUND", "Course version not found.");
      return;
    }
    const now = new Date();
    store[index] = restoreCourseVersion(store[index], source, request.authUserId || "admin", request.body.comment, now);
    if (shouldTrySupabase()) {
      const { data, error } = await supabaseAdmin.rpc("save_course_atomic", {
        p_course: store[index],
        p_expected_version: Number(store[index].version || 2) - 1,
        p_actor: request.authUserId || "admin",
        p_change_type: "rollback",
        p_comment: request.body.comment
      });
      if (error?.message?.includes("COURSE_VERSION_CONFLICT")) {
        sendApiError(response, request, 409, "COURSE_VERSION_CONFLICT", "Course was updated by another editor.");
        return;
      }
      if (error) throw error;
      response.json(data);
      return;
    }
    versions.unshift(createCourseVersion(store[index], request.authUserId || "admin", "rollback", request.body.comment, now));
    await writeJsonStore(coursesFile, store);
    await writeJsonStore(courseVersionsFile, versions.slice(0, 5000));
    response.json(store[index]);
    });
  });

  app.delete("/api/courses/:id", requireRole("admin", "author"), async (request, response) => {
    await withStoreMutation("courses", async () => {
    const store = await readJsonStore(coursesFile, []);
    const course = store.find((item) => item.id === request.params.id);
    if (!course) {
      response.status(404).json({ error: "Course not found.", requestId: request.requestId });
      return;
    }
    if (course.status === "published" && !hasRole(request, "admin")) {
      response.status(403).json({ error: "Only an admin can delete a published course.", requestId: request.requestId });
      return;
    }
    if (!hasRole(request, "admin") && course.authorUserId !== request.authUserId) {
      sendApiError(response, request, 403, "COURSE_OWNER_REQUIRED", "Only the owning author can delete this course.");
      return;
    }
    if (shouldTrySupabase()) await deleteSupabaseRecord("course-drafts.json", course.id);
    else await writeJsonStore(coursesFile, store.filter((item) => item.id !== course.id));
    const versions = await readJsonStore(courseVersionsFile, []);
    const remainingVersions = versions.filter((entry) => entry.courseId !== course.id);
    if (shouldTrySupabase()) {
      for (const entry of versions.filter((item) => item.courseId === course.id)) {
        await deleteSupabaseRecord("course-versions.json", entry.id);
      }
    } else {
      await writeJsonStore(courseVersionsFile, remainingVersions);
    }
    response.json({ ok: true, id: course.id });
    });
  });
}
