import { describe, expect, test } from "vitest";
import { mapIssuedCertificateRow, mapQuizSessionRow, mapSensitiveRpcError, mapSubmissionRow } from "../../server/supabaseSensitiveOperations.js";

describe("sensitive persistence mappings", () => {
  test("maps certificate and review revisions without leaking database naming", () => {
    expect(mapIssuedCertificateRow({
      id: "certificate-id",
      verification_code: "verify-me",
      user_id: "learner",
      certificate_id: "frontend-foundations",
      certificate_version: 2,
      learner_name: "Learner",
      evidence: {},
      issued_at: "2026-07-30T12:00:00.000Z"
    })).toMatchObject({ verificationCode: "verify-me", certificateVersion: 2, userId: "learner" });

    expect(mapSubmissionRow({
      id: "submission-id",
      user_id: "learner",
      project_id: "project",
      review_revision: 3,
      version: 2,
      status: "approved"
    })).toMatchObject({ reviewRevision: 3, version: 2, status: "approved" });
  });

  test("maps atomic quiz qualification evidence from the session payload", () => {
    expect(mapQuizSessionRow({
      id: "learner:exam",
      user_id: "learner",
      quiz_id: "exam",
      payload: {
        currentIndex: 4,
        gradingVersion: 1,
        questionSetVersion: "exam:2",
        bestScore: { passed: true, percent: 90 },
        qualifiedQuestionSetVersion: "exam:2"
      },
      status: "completed",
      score: { passed: false, percent: 40 },
      updated_at: "2026-07-30T12:00:00.000Z"
    })).toMatchObject({
      gradingVersion: 1,
      questionSetVersion: "exam:2",
      bestScore: { passed: true, percent: 90 },
      qualifiedQuestionSetVersion: "exam:2",
      score: { passed: false, percent: 40 }
    });
  });

  test.each([
    ["PT001", 409, "SUBMISSION_ALREADY_ACTIVE"],
    ["PT002", 404, "SUBMISSION_NOT_FOUND"],
    ["PT003", 409, "SUBMISSION_REVIEW_REVISION_CONFLICT"],
    ["PT004", 409, "SUBMISSION_SUPERSEDED"],
    ["PT005", 400, "REVIEW_SCORE_REQUIRED"],
    ["PT006", 409, "SUBMISSION_VERSION_CONFLICT"],
    ["PT007", 429, "QUIZ_RETAKE_COOLDOWN"],
    ["PT008", 409, "CERTIFICATE_REVOKED"],
    ["PT009", 409, "CERTIFICATE_REQUIREMENTS_INCOMPLETE"]
  ])("maps RPC error %s to a stable API contract", (databaseCode, status, apiCode) => {
    const mapped = mapSensitiveRpcError({ code: databaseCode, details: '{"currentReviewRevision":2}' });
    expect(mapped).toMatchObject({ status, code: apiCode, details: { currentReviewRevision: 2 } });
  });

  test("preserves unexpected database errors", () => {
    const error = { code: "08006", message: "connection failure" };
    expect(mapSensitiveRpcError(error)).toBe(error);
  });

  test("maps RPC contracts when PostgREST preserves the message but normalizes the SQLSTATE", () => {
    expect(mapSensitiveRpcError({ code: "P0001", message: "SUBMISSION_ALREADY_ACTIVE" }))
      .toMatchObject({ status: 409, code: "SUBMISSION_ALREADY_ACTIVE" });
  });
});
