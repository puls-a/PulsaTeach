import { describe, expect, test } from "vitest";
import { reactTrack } from "../../src/content/tracks/react.js";
import { typescriptTrack } from "../../src/content/tracks/typescript.js";

const expectedModules = {
  react: ["react-jsx-components", "react-props-composition", "react-state-events", "react-forms-a11y", "react-effects-hooks", "react-async-routing", "react-state-management", "react-quality-performance", "react-components", "react-state", "react-hooks-data", "react-production"],
  typescript: ["ts-foundations", "ts-unions-states", "ts-functions-generics", "ts-boundaries", "ts-config-tooling", "ts-migration-capstone", "typescript-foundations", "typescript-functions", "typescript-boundaries", "typescript-production"]
};

const stableInventory = {
  react: { modules: 12, lessons: 84, first: "react-jsx-components-element-jsx", last: "react-final-exam" },
  typescript: { modules: 10, lessons: 68, first: "ts-foundations-infer-const", last: "ts-final-exam" }
};

function lessons(track) {
  return track.modules.flatMap((module) => module.lessons);
}

function questions(track) {
  return lessons(track).flatMap((lesson) => lesson.questions || []);
}

function expectLocalized(value, allowSharedTerm = false) {
  expect(value.fr.trim()).not.toBe("");
  expect(value.en.trim()).not.toBe("");
  if (!allowSharedTerm) expect(value.en).not.toBe(value.fr);
}

describe.each([["react", reactTrack], ["typescript", typescriptTrack]])("%s curriculum unification", (id, track) => {
  test("preserves stable module order, IDs, and counts", () => {
    const allLessons = lessons(track);
    expect(track.modules.map((module) => module.id)).toEqual(expectedModules[id]);
    expect(track.modules).toHaveLength(stableInventory[id].modules);
    expect(allLessons).toHaveLength(stableInventory[id].lessons);
    expect(allLessons[0].id).toBe(stableInventory[id].first);
    expect(allLessons.at(-1).id).toBe(stableInventory[id].last);
    expect(new Set(allLessons.map((lesson) => lesson.id)).size).toBe(allLessons.length);
  });

  test("keeps bilingual titles, briefs, and assessment prompts in parity", () => {
    for (const module of track.modules) expectLocalized(module.title);
    for (const lesson of lessons(track)) {
      expectLocalized(lesson.title);
      expectLocalized(lesson.brief);
    }
    for (const question of questions(track)) {
      expectLocalized(question.prompt);
      for (const choice of question.choices) expectLocalized(choice.label, true);
    }
  });

  test("uses unique lesson concepts and assessment prompts", () => {
    const conceptKeys = lessons(track).filter((lesson) => lesson.type !== "quiz").map((lesson) => `${lesson.title.fr}\n${lesson.brief.fr}`.toLocaleLowerCase("fr"));
    const promptKeys = questions(track).map((question) => question.prompt.fr.toLocaleLowerCase("fr"));
    expect(new Set(conceptKeys).size).toBe(conceptKeys.length);
    expect(new Set(promptKeys).size).toBe(promptKeys.length);
  });
});

test("foundations precede professional integration and delivery", () => {
  expect(reactTrack.modules.findIndex((module) => module.id === "react-jsx-components")).toBeLessThan(reactTrack.modules.findIndex((module) => module.id === "react-production"));
  expect(typescriptTrack.modules.findIndex((module) => module.id === "ts-foundations")).toBeLessThan(typescriptTrack.modules.findIndex((module) => module.id === "typescript-production"));
  expect(reactTrack.modules.slice(-4).every((module) => /Studio|Livraison/.test(module.title.fr))).toBe(true);
  expect(typescriptTrack.modules.slice(-4).every((module) => /Studio|Livraison/.test(module.title.fr))).toBe(true);
});
