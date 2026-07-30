# PulsaTeach Backend

PulsaTeach uses an Express API backed by Supabase/Postgres.

## Run

```bash
npm run server
```

Default API URL: `http://127.0.0.1:4174`

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL Editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env`.
4. Fill:

```bash
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PULSATEACH_ADMIN_KEY=local_admin_key_for_development
PULSATEACH_ALLOW_LOCAL_IDENTITY=true
PULSATEACH_ALLOWED_ORIGINS=http://127.0.0.1:5173
```

The browser only receives the anon key. The service role key is used only by the Express API and must never be exposed to the frontend.

Admin and author endpoints require one of these controls:

- Supabase user metadata containing `role` or `roles` with `admin`, `author`, or `reviewer`.
- Local development header `X-PulsaTeach-Admin-Key`, matching `PULSATEACH_ADMIN_KEY`.

Local learner identity uses `X-PulsaTeach-User-Id` only when
`PULSATEACH_ALLOW_LOCAL_IDENTITY=true`. This mode is refused in production.
Do not expose a development admin key in production browser builds.

Storage modes:

- `PULSATEACH_STORAGE=json`: local JSON storage, recommended for development.
- `PULSATEACH_STORAGE=supabase`: use Supabase with automatic JSON fallback when unavailable.
- `PULSATEACH_STORAGE=supabase-strict`: require Supabase and fail when unavailable.

Production requires `supabase-strict`, configured allowed origins, and Supabase
credentials. The API refuses to start in production with a fallback storage mode.

## Security

- Private learner routes require an authenticated Supabase identity, or the explicit
  local identity mode during development.
- A learner cannot read or write another learner's progress, profile, attempts,
  submissions, settings, or certificates.
- Helmet security headers, CSP, restricted CORS, request rate limiting, payload
  limits, and Zod validation are enabled.
- JSON development writes are serialized and replaced atomically.
- `PULSATEACH_ADMIN_KEY`, `VITE_ADMIN_ACCESS_KEY`, and
  `PULSATEACH_ALLOW_LOCAL_IDENTITY` must not be configured in production.

## Auth Providers

Enable providers in Supabase Dashboard:

1. Authentication > Providers.
2. Enable GitHub, Apple, Google, Discord, or any provider you want to expose.
3. Add the provider client ID/secret from each provider dashboard.
4. Authentication > URL Configuration:
   - Site URL: `http://127.0.0.1:5173`
   - Redirect URLs: `http://127.0.0.1:5173/**`
   - OAuth callback page: `http://127.0.0.1:5173/auth/callback`

PulsaTeach exposes auth at `/auth`. Legacy `#/auth` links are migrated automatically.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | API status probe |
| `GET` | `/api/supabase/status` | Supabase configuration and table health |
| `GET` | `/api/catalog` | Lightweight catalog summaries for built-in and published tracks |
| `GET` | `/api/catalog/:trackId` | Complete content for one track, loaded on demand |
| `GET` | `/api/glossary` | Canonical bilingual glossary generated from all built-in tracks |
| `GET` | `/api/roadmap` | Product roadmap data |
| `GET` | `/api/stats` | Platform stats: lessons, modules, learners, submissions, certificates |
| `GET` | `/api/analytics` | Funnel, track, and content analytics |
| `GET` | `/api/admin/export` | Full JSON export for local backup, admin only |
| `GET` | `/api/path/:userId` | Personalized next lessons, weekly plan, and milestones |
| `GET` | `/api/profile/:userId` | Aggregated learner profile with progress, submissions, attempts, certificates |
| `GET` | `/api/users/:userId` | Load editable learner settings |
| `PUT` | `/api/users/:userId` | Save editable learner settings |
| `GET` | `/api/enrollments` | List landing enrollments, admin/reviewer only |
| `POST` | `/api/enrollments` | Register a learner email from the landing CTA |
| `GET` | `/api/lesson-drafts` | List authoring drafts, author/reviewer/admin only |
| `POST` | `/api/lesson-drafts` | Create a lesson draft, author/admin only |
| `PATCH` | `/api/lesson-drafts/:id` | Update draft copy or workflow status, author/reviewer/admin only |
| `DELETE` | `/api/lesson-drafts/:id` | Delete a lesson draft, author/admin only |
| `GET` | `/api/progress/:userId` | Load learner progress |
| `PUT` | `/api/progress/:userId` | Save learner progress |
| `GET` | `/api/attempts?userId=...` | List exercise attempts |
| `POST` | `/api/attempts` | Store a test run attempt from the learning lab |
| `GET` | `/api/submissions?userId=...` | List one learner's project submissions |
| `GET` | `/api/submissions` | List all submissions for the admin page, reviewer/admin only |
| `POST` | `/api/submissions` | Create a project submission |
| `PATCH` | `/api/submissions/:id/review` | Approve or request changes on a submission, reviewer/admin only |
| `DELETE` | `/api/submissions/:id` | Remove a submission, admin only |
| `GET` | `/api/certificates/:userId` | Compute certificate readiness for a learner |
| `POST` | `/api/certificates/:certificateId/issue` | Issue an eligible certificate |
| `GET` | `/api/certificates/public/:verificationCode` | Verify the minimal public certificate evidence |
| `PATCH` | `/api/certificates/:id/revoke` | Revoke an issued certificate, reviewer/admin only |
| `GET` | `/api/courses/:id/versions` | List immutable Course Studio versions |
| `GET` | `/api/courses/:id/versions/:version/diff` | Compare two course snapshots |
| `POST` | `/api/courses/:id/rollback` | Restore a version into a new draft |

## Current Data Stores

| Supabase table | Shape |
| --- | --- |
| `profiles` | Public learner profile linked to Supabase Auth |
| `progress` | JSONB progress payload keyed by `user_id` |
| `attempts` | Exercise test attempts |
| `submissions` | Project submissions and review metadata |
| `enrollments` | Landing enrollments |
| `lesson_drafts` | Authoring drafts |
| `course_drafts` | Current Course Studio state and workflow log |
| `course_versions` | Immutable content snapshots used by diff and rollback |
| `issued_certificates` | Public verification code and minimal evidence |
| `quiz_sessions` | Private quiz drafts, responses, scores, and resume state |

## Course Studio workflow

The API enforces:

```text
draft → review → changes_requested → review
review → approved → scheduled/published → archived
```

Authors edit only `draft` and `changes_requested` content. Reviewers approve,
schedule, publish, archive, and roll back. Every save or transition increments
the version and records an immutable snapshot. Clients send `expectedVersion`
to reject stale writes with `409 COURSE_VERSION_CONFLICT`.

Apply every file in `supabase/migrations/` before deploying code that consumes
new columns. Never deploy the Course Studio workflow release against an older
production schema.

## Sensitive workflow concurrency

Project submission creation and review use PostgreSQL RPC functions guarded by
transaction-scoped advisory locks. Reviews carry both the immutable project
`expectedVersion` and a mutable `expectedReviewRevision`; stale decisions fail
with `409 SUBMISSION_REVIEW_REVISION_CONFLICT` instead of replacing another
reviewer's journal entry.

Certificate lookup, issuance, public verification, and revocation use targeted
indexed Supabase operations. Issuance relies on the unique learner/certificate
constraint for idempotency, while revocation updates only one non-revoked row.
These sensitive writes fail closed if Supabase is unavailable and never retry
against JSON after an ambiguous database response. JSON mode retains local
mutexes for development and browser tests.

## Browser-test runtime

Playwright starts Vite and the Express application from
`tests/e2e/global-setup.js`, then closes both servers in its teardown. This avoids
the persistent child-process trees produced by nested `npm` and `concurrently`
commands on Windows. The E2E runtime explicitly enables JSON storage and local
identity; neither fallback is accepted by the production runtime.

## Content-loading contract

The catalog summary endpoint does not expose full lesson theory, corrections,
quiz answers, or project rubrics. The browser fetches a complete track only when
the learner opens it. Certificate-grade tracks come from the API, where exam
lessons are reduced to prompts and choices before they cross the server boundary.
Their grading keys and detailed results remain server-side, final attempts are
serialized in Supabase, and retakes have a persisted 15-minute cooldown.
Deferred loading keeps the initial bundle and API payload stable while the number
of tracks grows.
