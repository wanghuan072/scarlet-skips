import type { Challenge } from "@/types/lab";

export function getUtcDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function hashKey(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getDailyChallenge(items: Challenge[], date = new Date()) {
  const eligible = items.filter((item) => item.dailyEligible);
  if (!eligible.length) return items[0];
  const key = `${getUtcDateKey(date)}:${eligible[0]?.gameVersion ?? "current"}`;
  return eligible[hashKey(key) % eligible.length];
}

export function filterChallenges(items: Challenge[], filters: { difficulty?: string; goal?: string; style?: string }) {
  const { difficulty = "Any", goal = "Any", style = "Any" } = filters;
  const filtered = items.filter((item) =>
    (difficulty === "Any" || item.difficulty === difficulty) &&
    (goal === "Any" || item.goal === goal) &&
    (style === "Any" || item.tags.includes(style.toLowerCase())));
  return filtered;
}
