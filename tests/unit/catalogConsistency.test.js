import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { learningTracks } from "../../src/content/allTrackRegistry.js";

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
    expect(learningTracks.reduce((total, track) => total + track.modules.reduce((sum, module) => sum + module.lessons.length, 0), 0)).toBe(871);
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
