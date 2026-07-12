import { createHash } from "node:crypto";
import { describe, expect, test } from "vitest";
import { nodeApiTrack } from "../../src/content/tracks/node-api.js";
import { sqlPostgresqlTrack } from "../../src/content/tracks/sql-postgresql.js";

function lessons(track) {
  return track.modules.flatMap((module) => module.lessons);
}

function idDigest(track) {
  const ids = [track.id, ...track.modules.map(({ id }) => id), ...lessons(track).map(({ id }) => id)].sort();
  return createHash("sha256").update(ids.join("\n")).digest("hex");
}

describe("unified Node and SQL curricula", () => {
  test("preserves every public ID and curriculum count", () => {
    expect([nodeApiTrack.modules.length, lessons(nodeApiTrack).length]).toEqual([10, 68]);
    expect([sqlPostgresqlTrack.modules.length, lessons(sqlPostgresqlTrack).length]).toEqual([9, 60]);
    expect(idDigest(nodeApiTrack)).toBe("993fe903c589cf9110019f72a70de2fe6bc4429a26a77f48e64ae4e3d6dd9b7f");
    expect(idDigest(sqlPostgresqlTrack)).toBe("96f1d8e25e6618f423d79a9562a5568f08f66e8733fd0dcbc032cfa9bb74a08e");
  });

  test("orders foundations before analytics, security, and operations", () => {
    expect(nodeApiTrack.modules.map(({ id }) => id)).toEqual([
      "node-runtime", "node-runtime-npm", "node-http", "node-http-express", "node-validation-errors",
      "node-architecture-auth", "node-auth-isolation-foundations", "node-data-testing", "node-production", "node-production-ops"
    ]);
    expect(sqlPostgresqlTrack.modules.map(({ id }) => id)).toEqual([
      "sql-cli-psql", "sql-crud-fundamentals", "sql-foundations", "sql-modeling-normalization", "sql-relations",
      "sql-advanced-queries", "sql-transactions-security", "sql-roles-security", "sql-production"
    ]);
  });

  test("uses bilingual copy and authentic Node HTTP contracts", () => {
    const generated = lessons(nodeApiTrack).filter(({ id }) => id.startsWith("node-") && (id.includes("-npm-") || id.includes("-express-")));
    expect(generated.every(({ title, brief }) => title.fr !== title.en && brief.fr !== brief.en)).toBe(true);
    const source = lessons(nodeApiTrack).map(({ solution = "" }) => solution).join("\n");
    expect(source).toContain("status(201).json");
    expect(source).toContain("status(401)");
    expect(source).toContain("status(403)");
    expect(source).toContain("VALIDATION_ERROR");
    expect(source).not.toContain("PulsaTeach API evidence");
  });

  test("uses evolving SQL data with result and rejected-constraint evidence", () => {
    const source = lessons(sqlPostgresqlTrack).map(({ solution = "" }) => solution).join("\n").toLowerCase();
    expect(source).toContain("returning user_id, lesson_id, score");
    expect(source).toContain("select count(*) as evidence_rows");
    expect(source).toContain("constraint probe: score 101 must fail");
    expect(source).toContain("cross-user insert must fail");
    expect(source).not.toContain("pulsateach sql evidence");
  });
});
