import { describe, expect, test } from "vitest";
import { buildFlexboxTests, flexboxLevels, parseArenaFlex } from "../../src/components/FlexboxArena.jsx";
import { expectedDirection, jsArenaLevels, normalizeDirection } from "../../src/components/ArrowTargetGame.jsx";

describe("Flexbox Arena", () => {
  test("each visual level has a matching flex validation contract", () => {
    for (const level of flexboxLevels) {
      const code = `.arena {
        display: ${level.expected.display};
        justify-content: ${level.expected.justifyContent};
        align-items: ${level.expected.alignItems};
      }`;
      const parsed = parseArenaFlex(code);
      expect(buildFlexboxTests(parsed, level.expected).every((check) => check.pass), level.id).toBe(true);
    }
  });

  test("the old center/right mismatch is rejected", () => {
    const level = flexboxLevels.find((item) => item.id === "right-center");
    const parsed = parseArenaFlex(`.arena {
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }`);
    expect(buildFlexboxTests(parsed, level.expected).every((check) => check.pass)).toBe(false);
  });
});

describe("JavaScript Arena", () => {
  test("level cases match the direction helper", () => {
    for (const level of jsArenaLevels) {
      for (const item of level.cases) {
        expect(expectedDirection(item), `${level.id} ${item.x},${item.y}`).toBe(item.expected);
      }
    }
  });

  test("normalizes player return values", () => {
    expect(normalizeDirection(" Right-Up ")).toBe("right-up");
  });
});
