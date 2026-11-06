# PulsaTeach agent instructions

Before substantial work, read `docs/MASTER_EXECUTION_PLAN.md`. It is the active
source of truth for priorities, completion criteria, current status, and the
session handoff protocol. Other roadmap and evidence files are historical unless
the master plan explicitly references them.

## Required workflow

1. Inspect the worktree and preserve unrelated user changes.
2. Select the highest-priority unfinished item in the master plan.
3. Audit the existing behavior before editing.
4. Implement a coherent end-to-end batch rather than stopping at analysis.
5. Add tests that prove behavior, bilingual integrity, and meaningful failure.
6. Run risk-appropriate checks and `npm run validate` before completing a batch.
7. Update the status table and journal in the master plan.

Do not treat generated counts, green structural audits, or old conformity
matrices as proof of pedagogical quality. Do not commit, push, deploy, incur a
cost, or make an irreversible external change without explicit authorization.
