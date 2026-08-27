import { getLearnerItem, setLearnerItem } from "../../learnerStorage.js";

const storagePrefix = "pulsateach-project-thread-";
const maxCheckpoints = 20;

export function projectThreadStorageKey(threadId) {
  return `${storagePrefix}${threadId}`;
}

export function loadProjectThreadDocument(threadId, locale) {
  const project = readProject(threadId);
  return project.documents?.[locale] || null;
}

export function initializeProjectThreadDocument(threadId, locale, starterCode) {
  const project = readProject(threadId);
  const existing = project.documents?.[locale];
  if (existing) return existing;

  const document = { code: starterCode || "", version: 1, updatedAt: new Date().toISOString(), checkpoints: [] };
  writeProject(threadId, { ...project, documents: { ...project.documents, [locale]: document } });
  return document;
}

export function saveProjectThreadDocument(threadId, locale, code) {
  const current = initializeProjectThreadDocument(threadId, locale, code);
  const document = { ...current, code, updatedAt: new Date().toISOString() };
  writeProject(threadId, { ...readProject(threadId), documents: { ...readProject(threadId).documents, [locale]: document } });
  return document;
}

export function checkpointProjectThreadDocument(threadId, locale, code, lessonId) {
  const current = saveProjectThreadDocument(threadId, locale, code);
  const document = {
    ...current,
    version: current.version + 1,
    checkpoints: [...current.checkpoints, { lessonId, version: current.version + 1, savedAt: new Date().toISOString() }].slice(-maxCheckpoints)
  };
  writeProject(threadId, { ...readProject(threadId), documents: { ...readProject(threadId).documents, [locale]: document } });
  return document;
}

function readProject(threadId) {
  try {
    const value = JSON.parse(getLearnerItem(projectThreadStorageKey(threadId)) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? { documents: {}, ...value } : { documents: {} };
  } catch {
    return { documents: {} };
  }
}

function writeProject(threadId, project) {
  setLearnerItem(projectThreadStorageKey(threadId), JSON.stringify(project));
}
