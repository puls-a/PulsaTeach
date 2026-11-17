import { describe, expect, test } from "vitest";
import { cssModuleOrder } from "../../src/content/cssTrackMetadata.js";
import { loadLocalTrack } from "../../src/content/localTrackLoader.js";
import { publicTrackCatalog } from "../../src/content/publicTrackCatalog.js";

describe("public CSS curriculum route integration", () => {
  test("full track follows the published order with one quiz and project per module", async () => {
    const track = await loadLocalTrack("css");
    expect(track.modules.map((item) => item.id)).toEqual(cssModuleOrder);
    for (const item of track.modules) {
      expect(item.lessons.some((lesson) => lesson.type === "quiz"), `${item.id} quiz`).toBe(true);
      expect(item.lessons.some((lesson) => lesson.type === "project"), `${item.id} project`).toBe(true);
      expect(new Set(item.lessons.map((lesson) => lesson.id)).size, `${item.id} lesson IDs`).toBe(item.lessons.length);
    }
  });

  test("every module-specific loader resolves the same public lesson sequence", async () => {
    const full = await loadLocalTrack("css");
    for (const moduleId of cssModuleOrder) {
      const expected = full.modules.find((item) => item.id === moduleId);
      const loaded = await loadLocalTrack("css", { moduleId });
      const actual = loaded.modules.find((item) => item.id === moduleId);
      expect(actual, `${moduleId} direct loader`).toBeDefined();
      expect(actual.lessons.map((lesson) => lesson.id), `${moduleId} lesson route`).toEqual(expected.lessons.map((lesson) => lesson.id));
    }
  });

  test("public CSS catalogue starts at the first published module and lesson", async () => {
    const entry = publicTrackCatalog.find((item) => item.id === "css");
    const match = entry.firstHref.match(/^\/learn\/css\/([^/]+)\/([^/]+)$/);
    expect(match).not.toBeNull();
    const [, moduleId, lessonId] = match;
    const track = await loadLocalTrack("css", { moduleId });
    const module = track.modules.find((item) => item.id === moduleId);
    expect(moduleId).toBe(cssModuleOrder[0]);
    expect(module.lessons[0].id).toBe(lessonId);
  });
});
