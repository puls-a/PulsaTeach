export const consentStorageKey = "pulsateach-privacy-consent";
export const consentEventName = "pulsateach-open-privacy-settings";

export function readPrivacyConsent() {
  try {
    return JSON.parse(localStorage.getItem(consentStorageKey));
  } catch {
    return null;
  }
}

export function savePrivacyConsent(optionalAnalytics) {
  const consent = {
    necessary: true,
    optionalAnalytics: Boolean(optionalAnalytics),
    updatedAt: new Date().toISOString(),
    version: 1
  };
  localStorage.setItem(consentStorageKey, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("pulsateach-consent-changed", { detail: consent }));
  return consent;
}

export function openPrivacySettings() {
  window.dispatchEvent(new Event(consentEventName));
}
