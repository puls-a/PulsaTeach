export function resolveLocaleValue(value, locale = "fr") {
  if (Array.isArray(value)) return value.map((item) => resolveLocaleValue(item, locale));
  if (!value || typeof value !== "object") return value;

  if (Object.hasOwn(value, "fr") || Object.hasOwn(value, "en")) {
    const localized = value[locale] ?? value.fr ?? value.en;
    return resolveLocaleValue(localized, locale);
  }

  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveLocaleValue(item, locale)]));
}
