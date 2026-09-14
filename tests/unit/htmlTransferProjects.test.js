// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { htmlTransferProjectModules } from "../../src/content/htmlTransferProjects.js";
import { validateLesson } from "../../src/lessonRuntime.js";

describe("independent HTML projects", () => {
  for (const lesson of htmlTransferProjectModules[0].lessons) {
    test(`${lesson.id}: reference passes and empty or unfinished work fails`, async () => {
      for (const locale of ["fr", "en"]) {
        expect((await validateLesson(lesson, lesson.solution[locale], locale)).filter((result) => !result.pass)).toEqual([]);
        expect((await validateLesson(lesson, lesson.starterCode[locale], locale)).some((result) => !result.pass)).toBe(true);
      }
      expect((await validateLesson(lesson, "<main><h1>Placeholder</h1></main>", "fr")).some((result) => !result.pass)).toBe(true);
    });
  }
  test("removing the product illustration fails the alternative check", async () => {
    const lesson = htmlTransferProjectModules[0].lessons.find((item) => item.id === "html-transfer-product");
    const results = await validateLesson(lesson, lesson.solution.fr.replace(/<img[^>]+>/, ""), "fr");
    expect(results.find((result) => result.type === "meaningfulAlt").pass).toBe(false);
  });
});
