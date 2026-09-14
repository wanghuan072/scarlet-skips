import analyzerRulesJson from "@/data/analyzer/rules.json";
import challengesJson from "@/data/challenges/challenges.json";
import interactionsJson from "@/data/interactions/interactions.json";
import badgesJson from "@/data/passport/badges.json";
import type { AnalyzerRule, Challenge, PassportBadge, UpgradeInteraction } from "@/types/lab";

export const challenges = challengesJson as Challenge[];
export const interactions = interactionsJson as UpgradeInteraction[];
export const analyzerRules = analyzerRulesJson as AnalyzerRule[];
export const passportBadges = badgesJson as PassportBadge[];

export function getChallenge(id: string) {
  return challenges.find((challenge) => challenge.id === id);
}

export function getInteraction(first: string, second: string) {
  return interactions.find((interaction) =>
    (interaction.upgradeA === first && interaction.upgradeB === second) ||
    (interaction.upgradeA === second && interaction.upgradeB === first));
}
