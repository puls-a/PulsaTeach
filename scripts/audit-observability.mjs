import { readFile } from "node:fs/promises";

const failures = [];
const main = await readFile(new URL("../src/main.jsx", import.meta.url), "utf8");
const observability = await readFile(new URL("../src/observability.js", import.meta.url), "utf8");
const lessonWorkspace = await readFile(new URL("../src/features/learn/LessonWorkspace.jsx", import.meta.url), "utf8");
const reviewPage = await readFile(new URL("../src/features/review/ReviewPage.jsx", import.meta.url), "utf8");
const validation = await readFile(new URL("../server/validation.js", import.meta.url), "utf8");
const learningRoutes = await readFile(new URL("../server/routes/learning.js", import.meta.url), "utf8");
const systemRoutes = await readFile(new URL("../server/routes/system.js", import.meta.url), "utf8");
const administrationRoutes = await readFile(new URL("../server/routes/administration.js", import.meta.url), "utf8");

for (const signal of ["LCP", "CLS", "INP", "client_error"]) {
  if (!observability.includes(signal)) failures.push(`Missing browser telemetry signal: ${signal}.`);
}
if (!main.includes("startObservability();")) failures.push("Browser observability must start from main.jsx.");
if (!observability.includes("navigator.sendBeacon") || !observability.includes("keepalive: true")) failures.push("Telemetry must use sendBeacon with a keepalive fetch fallback.");
if (!systemRoutes.includes('app.post("/api/telemetry"') || !validation.includes('type: z.enum(["web_vital", "client_error"])')) failures.push("Telemetry endpoint and schema must stay wired.");

for (const event of ["lesson_opened", "tests_run", "tests_failed", "lesson_completed", "progress_migrated", "review_started", "review_answered", "review_completed"]) {
  if (!validation.includes(event) || !learningRoutes.includes(event)) failures.push(`Server event contract is missing ${event}.`);
}
if (!lessonWorkspace.includes('eventType: "tests_run"')) failures.push("Lesson test launches must emit tests_run events.");
if (!lessonWorkspace.includes('eventType: checks.every((check) => check.pass) ? "lesson_completed" : "tests_failed"')) failures.push("Lesson outcomes must emit completion/failure events.");
if (!reviewPage.includes('eventType: "review_started"') || !reviewPage.includes('"review_completed" : "review_answered"')) failures.push("Review workflow events must stay instrumented.");
if (!learningRoutes.includes("analyticsUserKey(event.userId)") || !administrationRoutes.includes("minimumCohort: 3")) failures.push("Analytics endpoints must keep pseudonymization and cohort privacy metadata.");

if (failures.length) {
  console.error(`Observability audit failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log("Observability audit passed: Web Vitals, client errors, learning events, and privacy guards are wired.");
