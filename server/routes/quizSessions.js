export function registerQuizSessionRoutes(app, context) {
  const {
    learningTracks,
    normalizeQuizLesson,
    scoreQuiz,
    getQuestionSetVersion,
    isProtectedExamLesson,
    decodeProtectedExamResponses,
    examTokenSecret,
    sensitiveRateLimit,
    quizSessionSchema,
    quizSubmissionSchema,
    quizSessionsFile,
    readJsonStore,
    writeJsonStore,
    withStoreMutation,
    saveSupabaseQuizDraft,
    shouldUseSupabaseMutations,
    submitSupabaseQuizSession,
    findSupabaseQuizSession,
    requireAuthenticatedRequest,
    requireAuthenticatedWrite,
    sendApiError,
    validateBody
  } = context;

  app.get("/api/quizzes/:quizId/session", requireAuthenticatedRequest, async (request, response) => {
    const session = shouldUseSupabaseMutations()
      ? await findSupabaseQuizSession(request.authUserId, request.params.quizId)
      : (await readJsonStore(quizSessionsFile, [])).find((item) => item.userId === request.authUserId && item.quizId === request.params.quizId);
    response.json(session ? projectPublicSession(session) : null);
  });

  app.put("/api/quizzes/:quizId/session", requireAuthenticatedRequest, validateBody(quizSessionSchema), async (request, response) => {
    await withStoreMutation("quiz-sessions", async () => {
      if (!requireAuthenticatedWrite(request, response)) return;
      const lesson = findQuizLesson(learningTracks, request.params.quizId);
      if (!lesson || !isProtectedExamLesson(lesson)) {
        sendApiError(response, request, 404, "QUIZ_NOT_FOUND", "Quiz not found.");
        return;
      }
      if (request.body.questionSetVersion !== getQuestionSetVersion(lesson)) {
        sendApiError(response, request, 409, "QUIZ_VERSION_CONFLICT", "The quiz changed. Reload it before saving this draft.");
        return;
      }
      const id = `${request.authUserId}:${request.params.quizId}`;
      if (shouldUseSupabaseMutations()) {
        const session = await saveSupabaseQuizDraft({
          id,
          userId: request.authUserId,
          quizId: request.params.quizId,
          ...request.body
        });
        response.json(projectPublicSession(session));
        return;
      }
      const store = await readJsonStore(quizSessionsFile, []);
      const index = store.findIndex((item) => item.id === id);
      const existing = index === -1 ? null : store[index];
      const session = {
        id,
        userId: request.authUserId,
        quizId: request.params.quizId,
        ...request.body,
        status: existing?.gradingVersion === 1 ? existing.status : "draft",
        score: existing?.gradingVersion === 1 ? existing.score : null,
        gradingVersion: existing?.gradingVersion === 1 ? 1 : null,
        gradedAt: existing?.gradingVersion === 1 ? existing.gradedAt : null,
        questionSetVersion: existing?.questionSetVersion || null,
        draftQuestionSetVersion: request.body.questionSetVersion,
        bestScore: existing?.bestScore || null,
        qualifiedAt: existing?.qualifiedAt || null,
        qualifiedQuestionSetVersion: existing?.qualifiedQuestionSetVersion || null,
        updatedAt: new Date().toISOString()
      };
      if (index === -1) store.unshift(session);
      else store[index] = session;
      await writeJsonStore(quizSessionsFile, store.slice(0, 5000));
      response.json(projectPublicSession(session));
    });
  });

  app.post("/api/quizzes/:quizId/submit", sensitiveRateLimit(3), requireAuthenticatedRequest, validateBody(quizSubmissionSchema), async (request, response) => {
    await withStoreMutation("quiz-sessions", async () => {
      if (!requireAuthenticatedWrite(request, response)) return;
      const lesson = findQuizLesson(learningTracks, request.params.quizId);
      if (!lesson || !isProtectedExamLesson(lesson)) {
        sendApiError(response, request, 404, "QUIZ_NOT_FOUND", "Quiz not found.");
        return;
      }
      if (request.body.questionSetVersion !== getQuestionSetVersion(lesson)) {
        sendApiError(response, request, 409, "QUIZ_VERSION_CONFLICT", "The quiz changed. Reload it before submitting.");
        return;
      }

      const quiz = normalizeQuizLesson(lesson, { expand: false });
      let decodedResponses;
      try {
        decodedResponses = decodeProtectedExamResponses(quiz, request.body.responses, examTokenSecret);
      } catch (error) {
        if (error?.code !== "INVALID_QUIZ_RESPONSE") throw error;
        sendApiError(response, request, 400, "INVALID_QUIZ_RESPONSE", "One or more quiz responses are invalid. Reload the assessment and try again.");
        return;
      }
      const score = scoreQuiz(quiz, decodedResponses);
      score.results = score.results.map((result) => ({
        ...result,
        feedback: quiz.questions.find((question) => question.id === result.questionId)?.explanation
      }));
      const useSupabase = shouldUseSupabaseMutations();
      const store = useSupabase ? [] : await readJsonStore(quizSessionsFile, []);
      const id = `${request.authUserId}:${request.params.quizId}`;
      const index = store.findIndex((item) => item.id === id);
      const existing = index === -1 ? null : store[index];
      const now = new Date().toISOString();
      const retryAt = existing?.gradedAt ? new Date(existing.gradedAt).getTime() + 15 * 60 * 1000 : 0;
      if (!useSupabase && retryAt > Date.now()) {
        sendApiError(response, request, 429, "QUIZ_RETAKE_COOLDOWN", "Wait before submitting another assessment attempt.", { retryAt: new Date(retryAt).toISOString() });
        return;
      }
      const previousBestScore = existing?.bestScore?.passed
        ? existing.bestScore
        : existing?.score?.passed ? existing.score : null;
      const previousQualifiedAt = previousBestScore ? existing?.qualifiedAt || existing?.gradedAt || null : null;
      const previousQualifiedVersion = previousBestScore
        ? existing?.qualifiedQuestionSetVersion || existing?.questionSetVersion || null
        : null;
      const currentQuestionSetVersion = getQuestionSetVersion(lesson);
      const replacesBestScore = score.passed && (
        !previousBestScore
        || previousQualifiedVersion !== currentQuestionSetVersion
        || Number(score.percent) > Number(previousBestScore.percent)
      );
      const session = {
        id,
        userId: request.authUserId,
        quizId: request.params.quizId,
        currentIndex: Math.max(quiz.questions.length - 1, 0),
        responses: request.body.responses,
        rationales: request.body.rationales,
        status: "completed",
        score,
        gradingVersion: 1,
        gradedAt: now,
        questionSetVersion: currentQuestionSetVersion,
        bestScore: replacesBestScore ? score : previousBestScore,
        qualifiedAt: replacesBestScore ? now : previousQualifiedAt,
        qualifiedQuestionSetVersion: replacesBestScore
          ? currentQuestionSetVersion
          : previousQualifiedVersion,
        updatedAt: now
      };
      if (useSupabase) {
        response.json(projectPublicSession(await submitSupabaseQuizSession(session)));
        return;
      }
      if (index === -1) store.unshift(session);
      else store[index] = session;
      await writeJsonStore(quizSessionsFile, store.slice(0, 5000));
      response.json(projectPublicSession(session));
    });
  });
}

function projectPublicSession(session) {
  const publicSession = { ...session };
  delete publicSession.bestScore;
  return {
    ...publicSession,
    score: session.score ? {
      earned: session.score.earned,
      available: session.score.available,
      percent: session.score.percent,
      passed: session.score.passed
    } : null
  };
}

function findQuizLesson(learningTracks, quizId) {
  return learningTracks
    .flatMap((track) => track.modules.flatMap((module) => module.lessons))
    .find((item) => item.id === quizId && item.type === "quiz");
}
