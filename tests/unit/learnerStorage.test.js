import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  clearLearnerStorage,
  getLearnerItem,
  getLearnerStorageOwner,
  learnerStorageKey,
  setLearnerItem,
  setLearnerStorageOwner
} from "../../src/learnerStorage.js";

describe("learner storage", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage());
    vi.stubGlobal("window", { dispatchEvent: vi.fn() });
    vi.stubGlobal("CustomEvent", class CustomEvent {
      constructor(type, options) {
        this.type = type;
        this.detail = options?.detail;
      }
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  test("migrates legacy learner data without dispatching during a read", () => {
    localStorage.setItem("pulsateach-learning-progress", '{"xp":25}');
    const owner = getLearnerStorageOwner();
    expect(localStorage.getItem("pulsateach-learning-progress")).toBeNull();
    expect(localStorage.getItem(learnerStorageKey("pulsateach-learning-progress", owner))).toBe('{"xp":25}');
    expect(window.dispatchEvent).not.toHaveBeenCalled();
  });

  test("migrates legacy data when a guest owner already exists", () => {
    localStorage.setItem("pulsateach-user-id", "guest-existing");
    localStorage.setItem("pulsateach-learning-progress", '{"xp":40}');
    expect(getLearnerStorageOwner()).toBe("guest-existing");
    expect(getLearnerItem("pulsateach-learning-progress")).toBe('{"xp":40}');
    expect(localStorage.getItem("pulsateach-learning-progress")).toBeNull();
  });

  test("transfers guest work once and isolates authenticated learners", () => {
    getLearnerStorageOwner();
    setLearnerItem("pulsateach-note-lesson", "guest note");
    setLearnerStorageOwner("learner-a");
    expect(getLearnerItem("pulsateach-note-lesson")).toBe("guest note");
    setLearnerItem("pulsateach-note-lesson", "learner a note");

    setLearnerStorageOwner("learner-b");
    expect(getLearnerItem("pulsateach-note-lesson")).toBeNull();
    setLearnerItem("pulsateach-note-lesson", "learner b note");

    setLearnerStorageOwner("learner-a");
    expect(getLearnerItem("pulsateach-note-lesson")).toBe("learner a note");
  });

  test("clears only the selected learner scope", () => {
    setLearnerStorageOwner("learner-a");
    setLearnerItem("pulsateach-learning-progress", "a");
    setLearnerStorageOwner("learner-b");
    setLearnerItem("pulsateach-learning-progress", "b");
    clearLearnerStorage("learner-b");
    expect(getLearnerItem("pulsateach-learning-progress")).toBeNull();
    expect(localStorage.getItem(learnerStorageKey("pulsateach-learning-progress", "learner-a"))).toBe("a");
  });

  test("merges signed-out progress into an existing account", () => {
    setLearnerStorageOwner("learner-a");
    setLearnerItem("pulsateach-learning-progress", JSON.stringify({ xp: 100, completed: { account: { xp: 100 } }, activity: [] }));
    setLearnerStorageOwner("guest-session");
    setLearnerItem("pulsateach-learning-progress", JSON.stringify({ xp: 25, completed: { guest: { xp: 25 } }, activity: [] }));
    setLearnerStorageOwner("learner-a");
    expect(JSON.parse(getLearnerItem("pulsateach-learning-progress"))).toMatchObject({
      xp: 100,
      completed: { account: { xp: 100 }, guest: { xp: 25 } }
    });
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
