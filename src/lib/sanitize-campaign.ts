export const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export function sanitizeCampaign(search: URLSearchParams) {
  const result = new URLSearchParams();
  for (const key of campaignKeys) {
    const value = search.get(key);
    if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) result.set(key, value);
  }
  return result;
}
