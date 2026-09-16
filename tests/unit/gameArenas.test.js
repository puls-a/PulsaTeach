import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { buildFlexboxTests, flexboxLevels, parseArenaFlex } from "../../src/components/FlexboxArena.jsx";
import { expectedDirection, jsArenaLevels, normalizeDirection, projectileGeometry } from "../../src/components/ArrowTargetGame.jsx";
import { awardGameMission, gameMissionIds } from "../../src/gameContent.js";
import { mergeGameProgress, normalizeGameProgress } from "../../src/gameProgress.js";

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

  test("only reads declarations inside the .arena rule", () => {
    const parsed = parseArenaFlex(`
      /* .arena { display: flex; justify-content: flex-end; } */
      .other { display: flex; justify-content: flex-end; align-items: flex-end; }
      .arena { display: flex; justify-content: center; align-items: center; }
    `);
    expect(parsed).toEqual({ display: "flex", justifyContent: "center", alignItems: "center" });
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

  test("keeps the projectile aligned in non-square arenas", () => {
    const target = { x: 78, y: 22 };
    const projectile = projectileGeometry(target, 800, 400);
    const targetCenter = { x: 624, y: 88 };
    const aim = { x: targetCenter.x - 400, y: targetCenter.y - 200 };
    const endpoint = { x: projectile.end.x - 400, y: projectile.end.y - 200 };
    expect(aim.x * endpoint.y - aim.y * endpoint.x).toBeCloseTo(0, 6);
    expect(Math.hypot(targetCenter.x - projectile.end.x, targetCenter.y - projectile.end.y)).toBeCloseTo(42, 6);
  });
});

describe("game rewards", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage());
    localStorage.setItem("pulsateach-user-id", "guest-test");
    vi.stubGlobal("window", { dispatchEvent: vi.fn() });
    vi.stubGlobal("CustomEvent", class CustomEvent {
      constructor(type, options) {
        this.type = type;
        this.detail = options?.detail;
      }
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  test("requires every arena mission before unlocking its badge", () => {
    const finalOnly = awardGameMission(gameMissionIds.javascript.at(-1), 50, "arrow-clear", gameMissionIds.javascript);
    expect(finalOnly.badgeAwarded).toBe(false);
    expect(finalOnly.progress.badges["arrow-clear"]).toBeUndefined();

    for (const missionId of gameMissionIds.javascript.slice(0, -1)) {
      awardGameMission(missionId, 30, "arrow-clear", gameMissionIds.javascript);
    }
    const progress = JSON.parse(localStorage.getItem("pulsateach-game-progress:owner:guest-test"));
    expect(progress.badges["arrow-clear"]).toBe(true);
  });

  test("does not award XP twice when a mission is replayed", () => {
    const first = awardGameMission(gameMissionIds.playground[0], 25, "first-preview", gameMissionIds.playground);
    const replay = awardGameMission(gameMissionIds.playground[0], 25, "first-preview", gameMissionIds.playground);
    expect(first.awarded).toBe(true);
    expect(replay.awarded).toBe(false);
    expect(replay.progress.xp).toBe(25);
  });

  test("merges disjoint devices and derives trusted XP and badges", () => {
    const local = { xp: 999999, missions: { "flexbox-arena-center": true, "flexbox-arena-right-center": true } };
    const remote = { missions: { "flexbox-arena-bottom-center": 1, "flexbox-arena-right-bottom": 999 } };
    const merged = mergeGameProgress(local, remote);
    expect(merged.xp).toBe(120);
    expect(merged.badges["flexbox-clear"]).toBe(true);
    expect(merged.missions["flexbox-arena-right-bottom"]).toBe(40);
    expect(normalizeGameProgress({ missions: { unknown: true }, badges: { stale: true } })).toMatchObject({ xp: 0, missions: {}, badges: {} });
  });
});

function createStorage() {
  const storage = {};
  Object.defineProperties(storage, {
    getItem: { value: (key) => Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null },
    setItem: { value: (key, value) => { storage[key] = String(value); } },
    removeItem: { value: (key) => { delete storage[key]; } },
    clear: { value: () => Object.keys(storage).forEach((key) => delete storage[key]) }
  });
  return storage;
}
