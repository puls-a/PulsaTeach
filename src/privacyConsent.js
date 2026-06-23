export const consentEventName = "pulsateach-open-privacy-settings";

export function openPrivacySettings() {
  window.dispatchEvent(new Event(consentEventName));
}
