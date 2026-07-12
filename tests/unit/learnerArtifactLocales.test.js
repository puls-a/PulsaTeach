import { describe, expect, test } from "vitest";
import { gitTrack } from "../../src/content/tracks/git.js";
import { testingTrack } from "../../src/content/tracks/testing.js";
import { webPerformanceTrack } from "../../src/content/tracks/web-performance.js";
import { devopsDeploymentTrack } from "../../src/content/tracks/devops-deployment.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const tracks = [gitTrack, testingTrack, webPerformanceTrack, devopsDeploymentTrack];
const frenchBlocker = /[àâçéèêëîïôùûüœ]|\b(?:écris|décris|preuve|risques|déploiement|dépendances|sauvegarde|chargement|réessayer|résultats|surveillance)\b/i;

describe("FR/EN learner artifacts", () => {
  test.each(tracks.map((track) => [track.id, track]))("%s exposes clean English artifacts", (_id, track) => {
    for (const lesson of track.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz")) {
      for (const field of ["starterCode", "solution"]) {
        const english = resolveLocaleValue(lesson[field], "en");
        expect(english, `${track.id}/${lesson.id}/${field}`).not.toMatch(frenchBlocker);
      }
      for (const check of lesson.tests) {
        expect(resolveLocaleValue(check.label, "en"), `${track.id}/${lesson.id}/test label`).not.toMatch(frenchBlocker);
      }
    }
  });

  test.each(tracks.map((track) => [track.id, track]))("%s English reference artifacts satisfy their checks", async (_id, track) => {
    const practices = track.modules.flatMap((module) => module.lessons).filter((item) => item.type !== "quiz");
    for (const lesson of practices) {
      const results = await validateLesson(lesson, resolveLocaleValue(lesson.solution, "en"), "en");
      expect(results.every((result) => result.pass), `${track.id}/${lesson.id}`).toBe(true);
    }
  });
});
