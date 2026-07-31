import { supabaseAdmin } from "./supabaseServer.js";

const certificateColumns = "id,verification_code,user_id,certificate_id,certificate_version,learner_name,title,evidence,issued_at,expires_at,revoked_at,revocation_reason";
const publicCertificateColumns = "verification_code,certificate_version,learner_name,title,evidence,issued_at,expires_at,revoked_at,revocation_reason";

export function mapIssuedCertificateRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    verificationCode: row.verification_code,
    userId: row.user_id,
    certificateId: row.certificate_id,
    certificateVersion: row.certificate_version || 1,
    learnerName: row.learner_name,
    title: row.title,
    evidence: row.evidence || {},
    issuedAt: row.issued_at,
    expiresAt: row.expires_at,
    revokedAt: row.revoked_at,
    revocationReason: row.revocation_reason
  };
}

export function mapSubmissionRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    rootId: row.root_id || row.id,
    supersedesId: row.supersedes_id,
    version: Number(row.version || 1),
    reviewRevision: Number(row.review_revision || 0),
    userId: row.user_id,
    projectId: row.project_id,
    title: row.title,
    description: row.description || "",
    url: row.url || "",
    repositoryUrl: row.repository_url || "",
    archiveUrl: row.archive_url || "",
    screenshots: row.screenshots || [],
    deliverables: row.deliverables || [],
    selfAssessment: row.self_assessment || "",
    visibility: row.visibility || "private",
    status: row.status,
    feedback: row.feedback || "",
    reviewer: row.reviewer || "",
    score: row.score,
    rubric: row.rubric || {},
    contextualComments: row.contextual_comments || {},
    reviewLog: row.review_log || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at,
    reviewedAt: row.reviewed_at
  };
}

export function mapQuizSessionRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    quizId: row.quiz_id,
    currentIndex: row.payload?.currentIndex || 0,
    responses: row.payload?.responses || {},
    rationales: row.payload?.rationales || {},
    status: row.status || "draft",
    score: row.score || null,
    gradingVersion: row.payload?.gradingVersion || null,
    gradedAt: row.payload?.gradedAt || null,
    questionSetVersion: row.payload?.questionSetVersion || null,
    draftQuestionSetVersion: row.payload?.draftQuestionSetVersion || null,
    bestScore: row.payload?.bestScore || null,
    qualifiedAt: row.payload?.qualifiedAt || null,
    qualifiedQuestionSetVersion: row.payload?.qualifiedQuestionSetVersion || null,
    updatedAt: row.updated_at
  };
}

export function mapSensitiveRpcError(error) {
  const contracts = {
    PT001: [409, "SUBMISSION_ALREADY_ACTIVE", "Wait for review before submitting a new version."],
    PT002: [404, "SUBMISSION_NOT_FOUND", "Submission not found."],
    PT003: [409, "SUBMISSION_REVIEW_REVISION_CONFLICT", "Submission review changed before this decision was saved."],
    PT004: [409, "SUBMISSION_SUPERSEDED", "Only the latest project version can be approved."],
    PT005: [400, "REVIEW_SCORE_REQUIRED", "Approved submissions require a score."],
    PT006: [409, "SUBMISSION_VERSION_CONFLICT", "Submission version changed before this operation completed."],
    PT007: [429, "QUIZ_RETAKE_COOLDOWN", "Wait before submitting another assessment attempt."],
    PT008: [409, "CERTIFICATE_REVOKED", "A revoked certificate cannot be reissued."],
    PT009: [409, "CERTIFICATE_REQUIREMENTS_INCOMPLETE", "Certificate requirements are not complete."],
    PT010: [409, "QUIZ_VERSION_CONFLICT", "The quiz changed. Reload it before saving this draft."]
  };
  const contractKey = contracts[error?.code]
    ? error.code
    : Object.keys(contracts).find((key) => String(error?.message || "").includes(key) || String(error?.message || "").includes(contracts[key][1]));
  const contract = contracts[contractKey];
  if (!contract) return error;
  const mapped = new Error(contract[2]);
  mapped.status = contract[0];
  mapped.code = contract[1];
  try {
    mapped.details = JSON.parse(error.details || "{}");
  } catch {
    mapped.details = {};
  }
  return mapped;
}

export async function listSupabaseIssuedCertificatesForUser(userId) {
  requireClient();
  const { data, error } = await supabaseAdmin.from("issued_certificates")
    .select(certificateColumns)
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapIssuedCertificateRow);
}

export async function findSupabaseIssuedCertificateByVerificationCode(verificationCode) {
  requireClient();
  const { data, error } = await supabaseAdmin.from("issued_certificates")
    .select(publicCertificateColumns)
    .eq("verification_code", verificationCode)
    .maybeSingle();
  if (error) throw error;
  return mapIssuedCertificateRow(data);
}

export async function issueSupabaseCertificateAtomic(certificate, requirements) {
  requireClient();
  const { data, error } = await supabaseAdmin.rpc("issue_certificate_atomic", {
    p_id: certificate.id,
    p_verification_code: certificate.verificationCode,
    p_user_id: certificate.userId,
    p_certificate_id: certificate.certificateId,
    p_certificate_version: certificate.certificateVersion || 1,
    p_learner_name: certificate.learnerName,
    p_title: certificate.title,
    p_evidence: certificate.evidence || {},
    p_required_exams: requirements.exams,
    p_required_projects: requirements.projects,
    p_issued_at: certificate.issuedAt
  });
  if (error) throw mapSensitiveRpcError(error);
  return {
    created: Boolean(data?.created),
    certificate: mapIssuedCertificateRow(data?.certificate)
  };
}

export async function revokeSupabaseIssuedCertificate(id, revokedAt, reason) {
  requireClient();
  const { data, error } = await supabaseAdmin.from("issued_certificates")
    .update({ revoked_at: revokedAt, revocation_reason: reason })
    .eq("id", id)
    .is("revoked_at", null)
    .select(certificateColumns)
    .maybeSingle();
  if (error) throw error;
  if (data) return mapIssuedCertificateRow(data);
  const existing = await findSupabaseIssuedCertificateById(id);
  return mapIssuedCertificateRow(existing);
}

export async function createSupabaseSubmission(submission) {
  requireClient();
  const { data, error } = await supabaseAdmin.rpc("create_submission_atomic", {
    p_id: submission.id,
    p_user_id: submission.userId,
    p_project_id: submission.projectId,
    p_title: submission.title,
    p_description: submission.description,
    p_url: submission.url,
    p_repository_url: submission.repositoryUrl,
    p_archive_url: submission.archiveUrl,
    p_screenshots: submission.screenshots,
    p_deliverables: submission.deliverables,
    p_self_assessment: submission.selfAssessment,
    p_visibility: submission.visibility
  });
  if (error) {
    const latest = await findLatestSupabaseSubmission(submission.userId, submission.projectId);
    if (latest && !["changes_requested", "approved"].includes(latest.status)) {
      throw mapSensitiveRpcError({
        code: "PT001",
        details: JSON.stringify({ submissionId: latest.id, version: latest.version, status: latest.status })
      });
    }
    throw mapSensitiveRpcError(error);
  }
  return mapSubmissionRow(requireRpcRow(data));
}

export async function reviewSupabaseSubmission(id, review) {
  requireClient();
  const { data, error } = await supabaseAdmin.rpc("review_submission_atomic", {
    p_id: id,
    p_expected_version: review.expectedVersion || null,
    p_expected_review_revision: review.expectedReviewRevision,
    p_status: review.status,
    p_feedback: review.feedback,
    p_reviewer: review.reviewer,
    p_score: review.score,
    p_rubric: review.rubric,
    p_contextual_comments: review.contextualComments
  });
  if (error) {
    const current = await findSupabaseSubmissionById(id);
    if (!current) throw mapSensitiveRpcError({ code: "PT002" });
    if (current.reviewRevision !== review.expectedReviewRevision) {
      throw mapSensitiveRpcError({
        code: "PT003",
        details: JSON.stringify({ expectedReviewRevision: review.expectedReviewRevision, currentReviewRevision: current.reviewRevision })
      });
    }
    if (review.expectedVersion && current.version !== review.expectedVersion) throw mapSensitiveRpcError({ code: "PT006" });
    throw mapSensitiveRpcError(error);
  }
  return mapSubmissionRow(requireRpcRow(data));
}

export async function saveSupabaseQuizDraft(session) {
  requireClient();
  const { data, error } = await supabaseAdmin.rpc("save_quiz_draft_atomic", {
    p_id: session.id,
    p_user_id: session.userId,
    p_quiz_id: session.quizId,
    p_current_index: session.currentIndex,
    p_responses: session.responses,
    p_rationales: session.rationales,
    p_question_set_version: session.questionSetVersion
  });
  if (error) throw mapSensitiveRpcError(error);
  return mapQuizSessionRow(requireRpcRow(data));
}

export async function submitSupabaseQuizSession(session) {
  requireClient();
  const { data, error } = await supabaseAdmin.rpc("submit_quiz_session_atomic", {
    p_id: session.id,
    p_user_id: session.userId,
    p_quiz_id: session.quizId,
    p_current_index: session.currentIndex,
    p_responses: session.responses,
    p_rationales: session.rationales,
    p_score: session.score,
    p_question_set_version: session.questionSetVersion
  });
  if (error) throw mapSensitiveRpcError(error);
  return mapQuizSessionRow(requireRpcRow(data));
}

export async function findSupabaseQuizSession(userId, quizId) {
  requireClient();
  const { data, error } = await supabaseAdmin.from("quiz_sessions")
    .select("*")
    .eq("user_id", userId)
    .eq("quiz_id", quizId)
    .maybeSingle();
  if (error) throw error;
  return data ? mapQuizSessionRow(data) : null;
}

export async function listSupabaseQuizSessionsForUser(userId) {
  requireClient();
  const { data, error } = await supabaseAdmin.from("quiz_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapQuizSessionRow);
}

async function findSupabaseIssuedCertificateById(id) {
  const { data, error } = await supabaseAdmin.from("issued_certificates").select(certificateColumns).eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

async function findLatestSupabaseSubmission(userId, projectId) {
  const { data, error } = await supabaseAdmin.from("submissions")
    .select("*")
    .eq("user_id", userId)
    .eq("project_id", projectId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? mapSubmissionRow(data) : null;
}

async function findSupabaseSubmissionById(id) {
  const { data, error } = await supabaseAdmin.from("submissions").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapSubmissionRow(data) : null;
}

function requireRpcRow(data) {
  const row = Array.isArray(data) ? data[0] : data;
  if (!row || (Array.isArray(data) && data.length !== 1)) throw new Error("Supabase RPC returned an invalid row set.");
  return row;
}

function requireClient() {
  if (!supabaseAdmin) throw new Error("Supabase is not configured.");
}
