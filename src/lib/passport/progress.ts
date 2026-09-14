import { challenges, passportBadges } from "@/lib/data/lab";
import type { LabState, PassportBadge } from "@/types/lab";

export function isBadgeUnlocked(badge: PassportBadge, state: LabState) {
  const completed = state.challengeProgress.filter((item) => item.status === "completed");
  if (badge.requirement === "challenge-1") return completed.length >= 1;
  if (badge.requirement === "challenge-3") return completed.filter((item) => item.challengeId.includes(":")).length >= 3;
  if (badge.requirement === "ending") return state.endingProgress.every(Boolean) || state.runs.some((run) => run.endingCompleted);
  if (badge.requirement === "score-10000") return state.runs.some((run) => run.score >= 10000);
  if (badge.requirement === "tools-3") return Object.keys(state.toolUsage).length >= 3;
  if (badge.requirement === "rope-challenge") {
    return completed.some((progress) => challenges.find((challenge) => challenge.id === progress.challengeId.split(":").at(-1))?.tags.includes("rope"));
  }
  return false;
}

export function getPassportSummary(state: LabState) {
  return {
    completedChallenges: state.challengeProgress.filter((item) => item.status === "completed").length,
    personalBest: Math.max(0, ...state.runs.map((run) => run.score)),
    endingComplete: state.endingProgress.every(Boolean) || state.runs.some((run) => run.endingCompleted),
    badges: passportBadges.filter((badge) => isBadgeUnlocked(badge, state)).length,
  };
}
