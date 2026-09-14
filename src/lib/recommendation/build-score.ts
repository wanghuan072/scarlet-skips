import type { Upgrade } from "@/types/content";

export type GoalId = "beginner" | "ending" | "high-score" | "airtime" | "fun";

export const goals: { id: GoalId; label: string; description: string }[] = [
  { id: "ending", label: "Reach the Ending", description: "Control the rope set and build a reliable finish route." },
  { id: "high-score", label: "High Score", description: "Build an airtime engine, then scale rope volume and fire." },
  { id: "beginner", label: "Learn the Game", description: "Prioritize clear effects and forgiving timing." },
  { id: "airtime", label: "Stay Airborne", description: "Stack height, progression and Rocket Fuel." },
  { id: "fun", label: "Try Something Wild", description: "Lean into ropes, speed and fire once stable." },
];

export function scoreUpgrade(
  upgrade: Upgrade,
  goal: GoalId,
  stacks: Record<string, number> = {},
) {
  const base = upgrade.goalWeights[goal] ?? 0;
  const synergyBoost = upgrade.synergies.reduce(
    (sum, slug) => sum + (stacks[slug] ? 1.5 : 0),
    0,
  );
  const repeatPenalty = Math.max(0, (stacks[upgrade.slug] ?? 0) - 2) * 0.35;
  return base + synergyBoost - repeatPenalty;
}

export function rankUpgrades(
  choices: Upgrade[],
  goal: GoalId,
  stacks: Record<string, number> = {},
) {
  return [...choices]
    .map((upgrade) => ({
      upgrade,
      score: scoreUpgrade(upgrade, goal, stacks),
      reasons: [
        `${upgrade.goalWeights[goal] ?? 0}/5 fit for this goal`,
        ...(upgrade.synergies.some((slug) => stacks[slug])
          ? ["Matches an upgrade already in your build"]
          : []),
        `${upgrade.bestTiming} game preference`,
      ],
    }))
    .sort((a, b) => b.score - a.score);
}
