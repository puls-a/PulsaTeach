import { describe, expect, test } from "vitest";
import { cssTrack } from "../../src/content/cssTrack.js";
import { javascriptTrack } from "../../src/content/javascriptTrack.js";
import { nodeApiTrack } from "../../src/content/tracks/node-api.js";
import { reactTrack } from "../../src/content/tracks/react.js";
import { sqlPostgresqlTrack } from "../../src/content/tracks/sql-postgresql.js";
import { typescriptTrack } from "../../src/content/tracks/typescript.js";

const tracks = [cssTrack, javascriptTrack, reactTrack, typescriptTrack, nodeApiTrack, sqlPostgresqlTrack];
const frenchProse = /[àâçéèêëîïôùûü]|\b(?:ajoute|bienvenue|construi[st]|écris|merci|publié|réviser|tâche|utilise|vérifie)\b/i;

function lessons(track) {
  return track.modules.flatMap((module) => module.lessons);
}

describe.each(tracks)("$id English validation", (track) => {
  test("does not require French prose in code validation tokens", () => {
    for (const lesson of lessons(track)) {
      for (const check of lesson.tests || []) {
        const values = typeof check.value === "object" ? Object.values(check.value) : [check.value];
        for (const value of values.filter((item) => typeof item === "string")) {
          expect(value, `${track.id}/${lesson.id}`).not.toMatch(frenchProse);
        }
      }
    }
  });
});

test("generated CSS and JavaScript validation labels are localized", () => {
  const generated = [...lessons(cssTrack), ...lessons(javascriptTrack)]
    .flatMap((lesson) => lesson.tests || [])
    .filter((check) => typeof check.label === "object");

  expect(generated.length).toBeGreaterThan(100);
  expect(generated.every(({ label }) => label.fr && label.en)).toBe(true);
});
