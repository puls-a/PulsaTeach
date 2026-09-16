export const gameMissionRewards = {
  "live-playground-hero-card": 25,
  "flexbox-arena-center": 20,
  "flexbox-arena-right-center": 30,
  "flexbox-arena-bottom-center": 30,
  "flexbox-arena-right-bottom": 40,
  "arrow-target-horizontal": 20,
  "arrow-target-vertical": 30,
  "arrow-target-diagonal": 40,
  "arrow-target-dead-zone": 50
};

export const gameMissionIds = {
  playground: ["live-playground-hero-card"],
  flexbox: ["flexbox-arena-center", "flexbox-arena-right-center", "flexbox-arena-bottom-center", "flexbox-arena-right-bottom"],
  javascript: ["arrow-target-horizontal", "arrow-target-vertical", "arrow-target-diagonal", "arrow-target-dead-zone"]
};

export const gameBadgeRequirements = {
  "first-preview": gameMissionIds.playground,
  "flexbox-clear": gameMissionIds.flexbox,
  "arrow-clear": gameMissionIds.javascript
};

export function normalizeGameProgress(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const sourceMissions = source.missions && typeof source.missions === "object" && !Array.isArray(source.missions) ? source.missions : {};
  const missions = {};
  for (const [missionId, reward] of Object.entries(gameMissionRewards)) {
    if (sourceMissions[missionId]) missions[missionId] = reward;
  }
  const badges = {};
  for (const [badgeId, requirements] of Object.entries(gameBadgeRequirements)) {
    if (requirements.every((missionId) => missions[missionId])) badges[badgeId] = true;
  }
  return {
    version: 1,
    xp: Object.values(missions).reduce((total, reward) => total + reward, 0),
    missions,
    badges
  };
}

export function mergeGameProgress(left, right) {
  const first = normalizeGameProgress(left);
  const second = normalizeGameProgress(right);
  return normalizeGameProgress({ missions: { ...first.missions, ...second.missions } });
}

export function hasGameProgress(value) {
  return Object.keys(normalizeGameProgress(value).missions).length > 0;
}
