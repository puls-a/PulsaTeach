import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { learningTracks } from "../../src/content/allTrackRegistry.js";
import { publicTrackCatalog } from "../../src/content/publicTrackCatalog.js";

const expectedTrackIds = [
  "tools",
  "html",
  "css",
  "javascript",
  "git",
  "accessibility",
  "testing",
  "typescript",
  "react",
  "node-api",
  "sql-postgresql",
  "web-security",
  "web-performance",
  "devops-deployment"
];

describe("catalog consistency", () => {
  test("published registry exposes every public course", () => {
    expect(learningTracks.map((track) => track.id)).toEqual(expectedTrackIds);
    expect(learningTracks.reduce((total, track) => total + track.modules.reduce((sum, module) => sum + module.lessons.length, 0), 0)).toBe(878);
  });

  test("every catalog first lesson route resolves in the published registry", () => {
    for (const entry of publicTrackCatalog) {
      const match = entry.firstHref.match(/^\/learn\/([^/]+)\/([^/]+)\/([^/]+)$/);
      expect(match, `${entry.id} should use the public lesson route convention`).not.toBeNull();

      const [, trackId, moduleId, lessonId] = match;
      const track = learningTracks.find((item) => item.id === trackId);
      const module = track?.modules.find((item) => item.id === moduleId);
      expect(track, `${entry.firstHref} should reference an active track`).toBeDefined();
      expect(module, `${entry.firstHref} should reference an active module`).toBeDefined();
      expect(module?.lessons.some((lesson) => lesson.id === lessonId), `${entry.firstHref} should reference an active lesson`).toBe(true);
    }
  });

  test("authoring, sandbox, catalog and missions are not limited to HTML/CSS/JS", () => {
    const authorPage = readFileSync("src/pages.jsx", "utf8");
    const sandbox = readFileSync("src/jsSandboxWorker.js", "utf8");
    const catalog = readFileSync("src/CurriculumHub.jsx", "utf8");
    const missions = readFileSync("src/features/learn/LearningLayout.jsx", "utf8");

    expect(authorPage).toContain("authorTrackOptions = publicTrackSummaries.map");
    expect(authorPage).not.toContain('options={["html", "css", "javascript"]}');
    expect(missions).toContain("projectMissions = learningTracks.map");

    for (const [file, content] of [["src/jsSandboxWorker.js", sandbox], ["src/CurriculumHub.jsx", catalog]]) {
      for (const trackId of expectedTrackIds) {
        expect(content, `${file} should mention ${trackId}`).toContain(trackId);
      }
    }
  });
});
