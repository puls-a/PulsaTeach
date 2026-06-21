import { describe, expect, test } from "vitest";
import {
  authorizeCourseTransition,
  createCourseVersion,
  diffCourseVersions,
  restoreCourseVersion
} from "../../server/courseWorkflow.js";

describe("course workflow", () => {
  test("enforces the editorial transition graph by role", () => {
    expect(authorizeCourseTransition("draft", "review", ["author"]).allowed).toBe(true);
    expect(authorizeCourseTransition("draft", "published", ["admin"]).allowed).toBe(false);
    expect(authorizeCourseTransition("review", "approved", ["author"]).allowed).toBe(false);
    expect(authorizeCourseTransition("review", "approved", ["reviewer"]).allowed).toBe(true);
    expect(authorizeCourseTransition("published", "archived", ["reviewer"]).allowed).toBe(true);
  });

  test("computes field-level diffs and restores a snapshot as a new draft", () => {
    const now = new Date("2026-06-21T20:00:00.000Z");
    const first = {
      id: "course-1",
      slug: "course",
      title: { fr: "Version une", en: "Version one" },
      description: { fr: "Description", en: "Description" },
      level: "beginner",
      language: "fr",
      curriculum: { modules: [] },
      status: "draft",
      version: 1,
      workflowLog: []
    };
    const second = { ...first, title: { ...first.title, fr: "Version deux" }, version: 2 };
    const v1 = createCourseVersion(first, "author", "created", "", now);
    const v2 = createCourseVersion(second, "author", "content", "", now);

    expect(diffCourseVersions(v1, v2).changes).toEqual([
      { path: "title.fr", before: "Version une", after: "Version deux" }
    ]);

    const restored = restoreCourseVersion({ ...second, status: "published" }, v1, "reviewer", "Rollback demandé", now);
    expect(restored).toMatchObject({
      title: first.title,
      status: "draft",
      version: 3,
      publishedAt: null
    });
    expect(restored.workflowLog[0]).toMatchObject({ kind: "rollback", sourceVersion: 1 });
  });
});
