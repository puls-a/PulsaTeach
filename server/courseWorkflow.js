const transitionRules = {
  draft: {
    review: ["admin", "author"]
  },
  review: {
    changes_requested: ["admin", "reviewer"],
    approved: ["admin", "reviewer"]
  },
  changes_requested: {
    review: ["admin", "author"]
  },
  approved: {
    scheduled: ["admin", "reviewer"],
    published: ["admin", "reviewer"]
  },
  scheduled: {
    published: ["admin", "reviewer"],
    approved: ["admin", "reviewer"]
  },
  published: {
    archived: ["admin", "reviewer"]
  },
  archived: {
    draft: ["admin"]
  }
};

export const courseStatuses = Object.freeze([
  "draft",
  "review",
  "changes_requested",
  "approved",
  "scheduled",
  "published",
  "archived"
]);

export function authorizeCourseTransition(currentStatus, nextStatus, roles = []) {
  if (currentStatus === nextStatus) return { allowed: true, requiredRoles: [] };
  const requiredRoles = transitionRules[currentStatus]?.[nextStatus] || [];
  return {
    allowed: requiredRoles.some((role) => roles.includes(role)),
    requiredRoles
  };
}

export function createCourseVersion(course, actor, changeType, comment = "", now = new Date()) {
  return {
    id: `${course.id}:v${course.version}`,
    courseId: course.id,
    version: course.version,
    status: course.status,
    actor,
    changeType,
    comment: String(comment || "").trim(),
    snapshot: snapshotCourse(course),
    createdAt: now.toISOString()
  };
}

export function restoreCourseVersion(current, versionEntry, actor, comment = "", now = new Date()) {
  const restored = versionEntry.snapshot || {};
  return {
    ...current,
    title: structuredClone(restored.title),
    description: structuredClone(restored.description),
    level: restored.level,
    language: restored.language,
    curriculum: structuredClone(restored.curriculum),
    status: "draft",
    version: Number(current.version || 1) + 1,
    updatedAt: now.toISOString(),
    publishedAt: null,
    scheduledAt: null,
    archivedAt: null,
    workflowLog: appendWorkflowLog(current.workflowLog, {
      from: current.status,
      to: "draft",
      actor,
      comment: comment || `Rollback to version ${versionEntry.version}`,
      at: now.toISOString(),
      kind: "rollback",
      sourceVersion: versionEntry.version
    })
  };
}

export function appendWorkflowLog(log = [], event) {
  return [event, ...(Array.isArray(log) ? log : [])].slice(0, 200);
}

export function diffCourseVersions(leftEntry, rightEntry) {
  const changes = [];
  compareValues(leftEntry?.snapshot, rightEntry?.snapshot, "", changes);
  return {
    fromVersion: leftEntry?.version ?? null,
    toVersion: rightEntry?.version ?? null,
    changes
  };
}

function snapshotCourse(course) {
  return {
    slug: course.slug,
    title: structuredClone(course.title),
    description: structuredClone(course.description),
    level: course.level,
    language: course.language,
    curriculum: structuredClone(course.curriculum)
  };
}

function compareValues(left, right, path, changes) {
  if (Object.is(left, right)) return;
  if (Array.isArray(left) && Array.isArray(right)) {
    if (JSON.stringify(left) === JSON.stringify(right)) return;
    const length = Math.max(left.length, right.length);
    for (let index = 0; index < length; index += 1) {
      compareValues(left[index], right[index], `${path}[${index}]`, changes);
    }
    return;
  }
  if (!isComparableObject(left) || !isComparableObject(right)) {
    changes.push({ path: path || "$", before: left, after: right });
    return;
  }
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  for (const key of [...keys].sort()) {
    compareValues(left[key], right[key], path ? `${path}.${key}` : key, changes);
  }
}

function isComparableObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
