const ANALYTICS_SETTINGS_EVENT = "aido:analytics-settings";

export function openAnalyticsSettings() {
  window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT));
}
export function onAnalyticsSettingsOpen(callback: () => void) {
  window.addEventListener(ANALYTICS_SETTINGS_EVENT, callback);
  return () => window.removeEventListener(ANALYTICS_SETTINGS_EVENT, callback);
}
