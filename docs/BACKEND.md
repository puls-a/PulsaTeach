# PulsaTeach Backend V1

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
```

The browser only receives the anon key. The service role key is used only by the Express API and must never be exposed to the frontend.

Storage modes:

- `PULSATEACH_STORAGE=json`: local JSON storage, recommended for development.
- `PULSATEACH_STORAGE=supabase`: use Supabase with automatic JSON fallback when unavailable.
- `PULSATEACH_STORAGE=supabase-strict`: require Supabase and fail when unavailable.

## Auth Providers

Enable providers in Supabase Dashboard:

1. Authentication > Providers.
2. Enable GitHub, Apple, Google, Discord, or any provider you want to expose.
3. Add the provider client ID/secret from each provider dashboard.
4. Authentication > URL Configuration:
   - Site URL: `http://127.0.0.1:5173`
   - Redirect URLs: `http://127.0.0.1:5173/**`
   - OAuth callback page: `http://127.0.0.1:5173/auth/callback`

PulsaTeach exposes auth at `#/auth`.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | API status probe |
| `GET` | `/api/supabase/status` | Supabase configuration and table health |
| `GET` | `/api/catalog` | Lesson catalog generated from `src/learningContent.js` |
| `GET` | `/api/roadmap` | Product roadmap data |
| `GET` | `/api/stats` | Platform stats: lessons, modules, learners, submissions, certificates |
| `GET` | `/api/analytics` | Funnel, track, and content analytics |
| `GET` | `/api/admin/export` | Full JSON export for local backup |
| `GET` | `/api/path/:userId` | Personalized next lessons, weekly plan, and milestones |
| `GET` | `/api/profile/:userId` | Aggregated learner profile with progress, submissions, attempts, certificates |
| `GET` | `/api/users/:userId` | Load editable learner settings |
| `PUT` | `/api/users/:userId` | Save editable learner settings |
| `GET` | `/api/enrollments` | List landing enrollments |
| `POST` | `/api/enrollments` | Register a learner email from the landing CTA |
| `GET` | `/api/lesson-drafts` | List authoring drafts |
| `POST` | `/api/lesson-drafts` | Create a lesson draft |
| `PATCH` | `/api/lesson-drafts/:id` | Update draft copy or workflow status |
| `DELETE` | `/api/lesson-drafts/:id` | Delete a lesson draft |
| `GET` | `/api/progress/:userId` | Load learner progress |
| `PUT` | `/api/progress/:userId` | Save learner progress |
| `GET` | `/api/attempts?userId=...` | List exercise attempts |
| `POST` | `/api/attempts` | Store a test run attempt from the learning lab |
| `GET` | `/api/submissions?userId=...` | List one learner's project submissions |
| `GET` | `/api/submissions` | List all submissions for the admin page |
| `POST` | `/api/submissions` | Create a project submission |
| `PATCH` | `/api/submissions/:id/review` | Approve or request changes on a submission |
| `GET` | `/api/certificates/:userId` | Compute certificate readiness for a learner |

## Current Data Stores

| Supabase table | Shape |
| --- | --- |
| `profiles` | Public learner profile linked to Supabase Auth |
| `progress` | JSONB progress payload keyed by `user_id` |
| `attempts` | Exercise test attempts |
| `submissions` | Project submissions and review metadata |
| `enrollments` | Landing enrollments |
| `lesson_drafts` | Authoring drafts |

## Next Backend Milestones

1. Add real auth and roles: learner, reviewer, admin.
2. Add row-level policies for direct browser reads where needed.
3. Add server-side exercise attempts and code snapshots.
4. Add certificate issuance records instead of computed-only certificates.
5. Add content authoring endpoints with lesson versioning.
