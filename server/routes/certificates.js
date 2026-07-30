export function registerCertificateRoutes(app, context) {
  const {
    certificateRevokeSchema,
    submissionsFile,
    usersFile,
    issuedCertificatesFile,
    quizSessionsFile,
    readProgressStore,
    readJsonStore,
    writeJsonStore,
    withStoreMutation,
    authorizeUserParam,
    requireAuthenticatedWrite,
    requireAuthenticatedRequest,
    requireRole,
    sendApiError,
    buildCertificatesForUser,
    findSupabaseIssuedCertificateByVerificationCode,
    insertSupabaseIssuedCertificate,
    listIssuedCertificatesForUser,
    listSupabaseQuizSessionsForUser,
    revokeSupabaseIssuedCertificate,
    shouldUseSupabaseMutations,
    randomUUID,
    validateBody
  } = context;

  app.get("/api/certificates/:userId", async (request, response) => {
    if (!authorizeUserParam(request, response)) return;
    const userId = request.authUserId || request.params.userId;
    const progressStore = await readProgressStore();
    const submissions = await readJsonStore(submissionsFile, []);
    const quizSessions = shouldUseSupabaseMutations()
      ? await listSupabaseQuizSessionsForUser(userId)
      : await readJsonStore(quizSessionsFile, []);
    const issued = await listIssuedCertificatesForUser(userId);
    response.json(buildCertificatesForUser(
      userId,
      progressStore[userId] || {},
      submissions.filter((item) => item.userId === userId),
      issued,
      quizSessions
    ));
  });

  app.post("/api/certificates/:certificateId/issue", requireAuthenticatedRequest, async (request, response) => {
    await withStoreMutation("issued-certificates", async () => {
      if (!requireAuthenticatedWrite(request, response)) return;
      const userId = request.authUserId;
      const useSupabase = shouldUseSupabaseMutations();
      const issued = useSupabase
        ? await listIssuedCertificatesForUser(userId)
        : await readJsonStore(issuedCertificatesFile, []);
      const existing = issued.find((item) => item.userId === userId && item.certificateId === request.params.certificateId);
      if (existing?.revokedAt) {
        sendApiError(response, request, 409, "CERTIFICATE_REVOKED", "A revoked certificate cannot be reissued.");
        return;
      }
      if (existing) {
        response.json(existing);
        return;
      }

      const [progressStore, submissions, users, quizSessions] = await Promise.all([
        readProgressStore(),
        readJsonStore(submissionsFile, []),
        readJsonStore(usersFile, {}),
        useSupabase ? listSupabaseQuizSessionsForUser(userId) : readJsonStore(quizSessionsFile, [])
      ]);
      const evaluation = buildCertificatesForUser(
        userId,
        progressStore[userId] || {},
        submissions.filter((item) => item.userId === userId),
        issued,
        quizSessions
      ).certificates.find((item) => item.id === request.params.certificateId);
      if (!evaluation) {
        sendApiError(response, request, 404, "CERTIFICATE_NOT_FOUND", "Certificate not found.");
        return;
      }
      if (!evaluation.eligible) {
        sendApiError(response, request, 409, "CERTIFICATE_REQUIREMENTS_INCOMPLETE", "Certificate requirements are not complete.", { progress: evaluation.progress });
        return;
      }

      const now = new Date().toISOString();
      const candidate = {
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
      if (useSupabase) {
        const result = await insertSupabaseIssuedCertificate(candidate);
        if (result.certificate.revokedAt) {
          sendApiError(response, request, 409, "CERTIFICATE_REVOKED", "A revoked certificate cannot be reissued.");
          return;
        }
        response.status(result.created ? 201 : 200).json(result.certificate);
        return;
      }

      issued.unshift(candidate);
      await writeJsonStore(issuedCertificatesFile, issued);
      response.status(201).json(candidate);
    });
  });

  app.get("/api/certificates/public/:verificationCode", async (request, response) => {
    const certificate = shouldUseSupabaseMutations()
      ? await findSupabaseIssuedCertificateByVerificationCode(request.params.verificationCode)
      : (await readJsonStore(issuedCertificatesFile, [])).find((item) => item.verificationCode === request.params.verificationCode);
    if (!certificate) {
      sendApiError(response, request, 404, "CERTIFICATE_NOT_FOUND", "Certificate not found.");
      return;
    }
    const expired = Boolean(certificate.expiresAt && new Date(certificate.expiresAt).getTime() <= Date.now());
    const status = certificate.revokedAt ? "revoked" : expired ? "expired" : "valid";
    response.json({
      valid: status === "valid",
      status,
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
    await withStoreMutation("issued-certificates", async () => {
      if (shouldUseSupabaseMutations()) {
        const certificate = await revokeSupabaseIssuedCertificate(request.params.id, new Date().toISOString(), request.body.reason);
        if (!certificate) {
          sendApiError(response, request, 404, "CERTIFICATE_NOT_FOUND", "Certificate not found.");
          return;
        }
        response.json(certificate);
        return;
      }

      const issued = await readJsonStore(issuedCertificatesFile, []);
      const index = issued.findIndex((certificate) => certificate.id === request.params.id);
      if (index === -1) {
        sendApiError(response, request, 404, "CERTIFICATE_NOT_FOUND", "Certificate not found.");
        return;
      }
      if (!issued[index].revokedAt) {
        issued[index] = { ...issued[index], revokedAt: new Date().toISOString(), revocationReason: request.body.reason };
        await writeJsonStore(issuedCertificatesFile, issued);
      }
      response.json(issued[index]);
    });
  });
}
