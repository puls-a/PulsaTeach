export function updateLocaleObject(source = {}, locale, patch) {
  return { ...source, [locale]: { ...(source[locale] || {}), ...patch } };
}

export function formatChoices(choices = []) {
  return choices.map((choice) => `${choice.id} | ${choice.label?.fr || ""} | ${choice.label?.en || ""}`).join("\n");
}

export function parseChoices(value) {
  return value.split("\n").map((line) => {
    const [id, fr, en] = line.split("|").map((item) => item.trim());
    return { id, label: { fr: fr || id, en: en || fr || id } };
  }).filter((choice) => choice.id);
}

export function formatAnswer(answer) {
  if (Array.isArray(answer)) return answer.join(", ");
  if (answer && typeof answer === "object") return JSON.stringify(answer);
  return String(answer ?? "");
}

export function parseAnswer(value, type) {
  if (type === "multiple" || type === "ordering") return value.split(",").map((item) => item.trim()).filter(Boolean);
  if (type === "matching") {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  }
  return value.trim();
}

export function moveItem(items, id, direction) {
  const index = items.findIndex((item) => item.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
