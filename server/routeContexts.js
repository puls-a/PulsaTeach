export const routeDependencyKeys = Object.freeze({
  system: [
    "learningTracks", "buildGlossaryIndex", "normalizePublishedCourse",
    "transactionalEmailEnabled", "sensitiveRateLimit", "getSupabaseStatus",
    "checkSupabaseReadiness", "supabaseEnabled", "requireSupabaseStorage",
    "telemetrySchema", "validateBody", "coursesFile", "readJsonStore",
    "summarizeTrack", "publishDueScheduledCourses", "shouldTrySupabase"
  ],
  courses: [
    "validateCourseForPublication", "appendWorkflowLog", "authorizeCourseTransition",
    "createCourseVersion", "diffCourseVersions", "restoreCourseVersion",
    "deleteSupabaseRecord", "courseCreateSchema", "courseRollbackSchema",
    "courseUpdateSchema", "validateBody", "coursesFile", "courseVersionsFile",
    "readJsonStore", "writeJsonStore", "withStoreMutation", "requireRole",
    "sendApiError", "hasRole", "isObject", "normalizeLocalizedText", "slugify",
    "uniqueSlug", "publishDueScheduledCourses", "shouldTrySupabase", "randomUUID"
  ],
  administration: [
    "learningTracks", "productRoadmap", "supabaseAdmin", "roleUpdateSchema",
    "validateBody", "progressFile", "submissionsFile", "attemptsFile",
    "enrollmentsFile", "draftsFile", "usersFile", "coursesFile",
    "issuedCertificatesFile", "learningEventsFile", "quizSessionsFile",
    "certificates", "readProgressStore", "readJsonStore", "requireRole",
    "getCatalogStats", "privacyMetric", "privacyValue", "rolesFromUser"
  ],
  accounts: [
    "sendWelcomeEmail", "sensitiveRateLimit", "supabaseAdmin",
    "accountDeletionSchema", "avatarUploadSchema", "userSettingsSchema",
    "validateBody", "submissionsFile", "attemptsFile", "usersFile",
    "issuedCertificatesFile", "learningEventsFile", "quizSessionsFile",
    "certificates", "readProgressStore", "readJsonStore", "writeJsonStore",
    "authorizeUserParam", "requireAuthenticatedWrite",
    "requireAuthenticatedRequest", "isObject", "createDefaultUser",
    "buildCertificatesForUser", "parseImageDataUrl", "buildProfileSummary",
    "buildStudyPlan", "deleteLocalAccountData"
  ],
  authoring: [
    "sensitiveRateLimit", "deleteSupabaseRecord", "requireSupabaseStorage",
    "enrollmentSchema", "lessonDraftSchema", "lessonDraftUpdateSchema",
    "validateBody", "enrollmentsFile", "draftsFile", "readJsonStore",
    "writeJsonStore", "requireRole", "isObject", "normalizeLocalizedText",
    "shouldTrySupabase", "markSupabaseUnavailable"
  ],
  learning: [
    "sensitiveRateLimit", "deleteSupabaseRecord", "attemptSchema",
    "certificateRevokeSchema", "eventSchema", "progressMigrationSchema",
    "progressSchema", "quizSessionSchema", "reviewSchema", "submissionSchema",
    "validateBody", "submissionsFile", "attemptsFile", "usersFile",
    "issuedCertificatesFile", "learningEventsFile", "quizSessionsFile",
    "certificates", "readProgressStore", "writeProgressStore", "readJsonStore",
    "writeJsonStore", "withStoreMutation", "authorizeUserParam",
    "authorizePayloadUser", "requireAuthenticatedWrite",
    "requireAuthenticatedRequest", "requireRole", "sendApiError", "hasRole",
    "isObject", "analyticsUserKey", "buildCertificatesForUser", "mergeProgress",
    "shouldTrySupabase", "randomUUID"
  ]
});

export function createRouteContexts(source) {
  return Object.freeze(Object.fromEntries(
    Object.entries(routeDependencyKeys).map(([routeName, keys]) => [
      routeName,
      Object.freeze(pickDependencies(source, keys, routeName))
    ])
  ));
}

function pickDependencies(source, keys, routeName) {
  const missing = keys.filter((key) => !(key in source));
  if (missing.length) {
    throw new Error(`Missing ${routeName} route dependencies: ${missing.join(", ")}`);
  }
  return Object.fromEntries(keys.map((key) => [key, source[key]]));
}
