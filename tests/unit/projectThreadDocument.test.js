import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { checkpointProjectThreadDocument, initializeProjectThreadDocument, loadProjectThreadDocument, projectThreadStorageKey, saveProjectThreadDocument } from "../../src/features/learn/projectThreadDocument.js";
import { getLearnerStorageOwner, setLearnerStorageOwner } from "../../src/learnerStorage.js";

describe("project thread documents", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createStorage());
    vi.stubGlobal("window", { dispatchEvent: vi.fn() });
    vi.stubGlobal("CustomEvent", class CustomEvent { constructor(type, options) { this.type = type; this.detail = options?.detail; } });
  });

  afterEach(() => vi.unstubAllGlobals());

  test("keeps one owner-scoped record per thread with independent localized documents", () => {
    initializeProjectThreadDocument("pulsaconf", "fr", "<h1>PulsaConf</h1>");
    saveProjectThreadDocument("pulsaconf", "fr", "<main>French project</main>");
    initializeProjectThreadDocument("pulsaconf", "en", "<h1>PulsaConf</h1>");

    const owner = getLearnerStorageOwner();
    const stored = JSON.parse(localStorage.getItem(`${projectThreadStorageKey("pulsaconf")}:owner:${encodeURIComponent(owner)}`));
    expect(Object.keys(stored.documents)).toEqual(["fr", "en"]);
    expect(loadProjectThreadDocument("pulsaconf", "fr")).toMatchObject({ code: "<main>French project</main>", version: 1 });
  });

  test("creates explicit versioned merge checkpoints and keeps learner ownership isolated", () => {
    setLearnerStorageOwner("learner-a");
    checkpointProjectThreadDocument("pulsaconf", "fr", "<main>v1</main>", "html-01");
    const checkpoint = checkpointProjectThreadDocument("pulsaconf", "fr", "<main>v2</main>", "html-02");
    expect(checkpoint).toMatchObject({ version: 3, code: "<main>v2</main>" });
    expect(checkpoint.checkpoints.map((item) => item.lessonId)).toEqual(["html-01", "html-02"]);

    setLearnerStorageOwner("learner-b");
    expect(loadProjectThreadDocument("pulsaconf", "fr")).toBeNull();
  });

  test("repeating the same merge preserves one version while a later edit creates a new checkpoint", () => {
    const first = checkpointProjectThreadDocument("pulsaconf", "fr", "<h1>Draft</h1>", "html-00");
    const repeated = checkpointProjectThreadDocument("pulsaconf", "fr", "<h1>Draft</h1>", "html-00");
    expect(repeated.version).toBe(first.version);
    expect(repeated.checkpoints).toHaveLength(1);
    saveProjectThreadDocument("pulsaconf", "fr", "<h1>Updated</h1>");
    const updated = checkpointProjectThreadDocument("pulsaconf", "fr", "<h1>Updated</h1>", "html-00");
    expect(updated.version).toBe(first.version + 1);
    expect(updated.checkpoints).toHaveLength(2);
  });
});

function createStorage() {
  const storage = {};
  Object.defineProperties(storage, {
    getItem: { value: (key) => Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null },
    setItem: { value: (key, value) => { storage[key] = String(value); } },
    removeItem: { value: (key) => { delete storage[key]; } }
  });
  return storage;
}
