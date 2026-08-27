const userIdKey = "pulsateach-user-id";
const ownerSeparator = ":owner:";
const learnerExactKeys = new Set([
  "pulsateach-course-drafts",
  "pulsateach-game-progress",
  "pulsateach-glossary-favorites",
  "pulsateach-glossary-history",
  "pulsateach-learning-bookmarks",
  "pulsateach-learning-progress",
  "pulsateach-studio-preferences"
]);
const learnerKeyPrefixes = ["pulsateach-code-", "pulsateach-note-", "pulsateach-project-thread-", "pulsateach-quiz-draft-"];
export const learnerStorageOwnerEvent = "pulsateach-storage-owner-changed";

export function getLearnerStorageOwner() {
  const existing = localStorage.getItem(userIdKey);
  if (existing) {
    migrateLegacyItems(existing);
    return existing;
  }
  const owner = createGuestOwner();
  localStorage.setItem(userIdKey, owner);
  migrateLegacyItems(owner);
  return owner;
}

export function resetLearnerStorageOwner(force = false) {
  const existing = localStorage.getItem(userIdKey);
  if (!force && existing?.startsWith("guest-")) {
    migrateLegacyItems(existing);
    return existing;
  }
  return setLearnerStorageOwner(createGuestOwner());
}

export function setLearnerStorageOwner(owner) {
  const nextOwner = String(owner || "").trim();
  if (!nextOwner) throw new Error("A learner storage owner is required.");
  const previousOwner = localStorage.getItem(userIdKey);
  if (previousOwner === nextOwner) {
    migrateLegacyItems(nextOwner);
    return nextOwner;
  }
  if (previousOwner) migrateLegacyItems(previousOwner);
  localStorage.setItem(userIdKey, nextOwner);
  if (!previousOwner) migrateLegacyItems(nextOwner);
  if (previousOwner?.startsWith("guest-") && !nextOwner.startsWith("guest-")) transferGuestItems(previousOwner, nextOwner);
  window.dispatchEvent(new CustomEvent(learnerStorageOwnerEvent, { detail: nextOwner }));
  return nextOwner;
}

export function learnerStorageKey(key, owner = getLearnerStorageOwner()) {
  return `${key}${ownerSeparator}${encodeURIComponent(owner)}`;
}

export function getLearnerItem(key) {
  return localStorage.getItem(learnerStorageKey(key));
}

export function setLearnerItem(key, value) {
  localStorage.setItem(learnerStorageKey(key), value);
}

export function removeLearnerItem(key) {
  localStorage.removeItem(learnerStorageKey(key));
  localStorage.removeItem(key);
}

export function clearLearnerStorage(owner = getLearnerStorageOwner()) {
  const suffix = `${ownerSeparator}${encodeURIComponent(owner)}`;
  for (const key of Object.keys(localStorage)) {
    if (key.endsWith(suffix)) localStorage.removeItem(key);
    else if (isLearnerKey(key)) localStorage.removeItem(key);
  }
}

function createGuestOwner() {
  return `guest-${crypto.randomUUID?.() || Date.now()}`;
}

function isLearnerKey(key) {
  return !key.includes(ownerSeparator)
    && (learnerExactKeys.has(key) || learnerKeyPrefixes.some((prefix) => key.startsWith(prefix)));
}

function migrateLegacyItems(owner) {
  for (const key of Object.keys(localStorage)) {
    if (!isLearnerKey(key)) continue;
    const targetKey = learnerStorageKey(key, owner);
    if (localStorage.getItem(targetKey) === null) localStorage.setItem(targetKey, localStorage.getItem(key));
    localStorage.removeItem(key);
  }
}

function transferGuestItems(guestOwner, nextOwner) {
  const guestSuffix = `${ownerSeparator}${encodeURIComponent(guestOwner)}`;
  for (const key of Object.keys(localStorage)) {
    if (!key.endsWith(guestSuffix)) continue;
    const baseKey = key.slice(0, -guestSuffix.length);
    const targetKey = learnerStorageKey(baseKey, nextOwner);
    const guestValue = localStorage.getItem(key);
    const accountValue = localStorage.getItem(targetKey);
    localStorage.setItem(targetKey, accountValue === null ? guestValue : mergeGuestValue(baseKey, accountValue, guestValue));
    localStorage.removeItem(key);
  }
}

function mergeGuestValue(key, accountValue, guestValue) {
  if (key === "pulsateach-studio-preferences") return accountValue;
  if (key === "pulsateach-learning-progress") {
    const account = parseJson(accountValue, {});
    const guest = parseJson(guestValue, {});
    return JSON.stringify({
      ...account,
      ...guest,
      xp: Math.max(Number(account.xp) || 0, Number(guest.xp) || 0),
      completed: { ...(account.completed || {}), ...(guest.completed || {}) },
      activity: uniqueActivity([...(guest.activity || []), ...(account.activity || [])]),
      streak: {
        ...(account.streak || {}),
        ...(guest.streak || {}),
        count: Math.max(Number(account.streak?.count) || 0, Number(guest.streak?.count) || 0),
        longest: Math.max(Number(account.streak?.longest) || 0, Number(guest.streak?.longest) || 0),
        totalActiveDays: Math.max(Number(account.streak?.totalActiveDays) || 0, Number(guest.streak?.totalActiveDays) || 0),
        recentDates: [...new Set([...(account.streak?.recentDates || []), ...(guest.streak?.recentDates || [])])].sort().slice(-30)
      },
      review: { ...(account.review || {}), ...(guest.review || {}), items: { ...(account.review?.items || {}), ...(guest.review?.items || {}) } },
      quizEvidence: { ...(account.quizEvidence || {}), ...(guest.quizEvidence || {}) }
    });
  }
  if (["pulsateach-course-drafts", "pulsateach-glossary-favorites", "pulsateach-glossary-history", "pulsateach-learning-bookmarks"].includes(key)) {
    const account = parseJson(accountValue, []);
    const guest = parseJson(guestValue, []);
    if (!Array.isArray(account) || !Array.isArray(guest)) return guestValue;
    return JSON.stringify([...guest, ...account].filter((item, index, items) => items.findIndex((candidate) => itemIdentity(candidate) === itemIdentity(item)) === index));
  }
  return guestValue;
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
}

function uniqueActivity(items) {
  return items.filter((item, index) => items.findIndex((candidate) => candidate?.id === item?.id && candidate?.at === item?.at) === index).slice(0, 100);
}

function itemIdentity(item) {
  return typeof item === "object" && item ? item.id || JSON.stringify(item) : String(item);
}
