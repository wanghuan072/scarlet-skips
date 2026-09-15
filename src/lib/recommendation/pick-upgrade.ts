import type { Upgrade } from "@/types/content";
import type { RunGoal, RunStage } from "@/types/build";

export interface PickContext {
  goal: RunGoal;
  stage: RunStage;
  ropeCount: number;
  stacks: Record<string, number>;
}

export interface RankedPick {
  upgrade: Upgrade;
  reasons: string[];
  risk: string;
  changeCondition: string;
  confidence: "Strong fit" | "Contextual fit" | "Risky fit";
}

const goalWeightKey: Record<RunGoal, string> = {
  ending: "ending",
  "high-score": "high-score",
  survival: "beginner",
};

const pressureCards = new Set(["add-jump-rope", "increase-jump-rope-speed", "ignite-jump-rope"]);

const goalLabel: Record<RunGoal, string> = {
  ending: "an ending",
  "high-score": "a high-score",
  survival: "a survival",
};

function timingScore(upgrade: Upgrade, stage: RunStage) {
  if (upgrade.bestTiming === "Any") return 1;
  const expected = stage === "early" ? "Early" : stage === "mid" ? "Mid" : "Late";
  return upgrade.bestTiming === expected ? 2 : -1;
}

function rankOne(upgrade: Upgrade, context: PickContext): RankedPick & { score: number } {
  let score = (upgrade.goalWeights[goalWeightKey[context.goal]] ?? 0) * 2 + timingScore(upgrade, context.stage);
  const reasons: string[] = [];
  const owned = Object.entries(context.stacks).filter(([, count]) => count > 0).map(([slug]) => slug);
  const synergyHits = owned.filter((slug) => upgrade.synergies.includes(slug));

  if (synergyHits.length) {
    score += 3;
    reasons.push("Connects with an upgrade already in your run.");
  }
  if (upgrade.bestTiming === "Any" || upgrade.bestTiming.toLowerCase().startsWith(context.stage)) {
    reasons.push(`Its documented timing fits the ${context.stage}-run decision.`);
  }

  if (context.ropeCount >= 3 && pressureCards.has(upgrade.slug)) {
    score -= 4;
    reasons.push("Your rope set is already crowded, so this adds another timing variable.");
  }
  if (context.ropeCount >= 3 && upgrade.slug === "reinforce-jump-rope") {
    score += 4;
    reasons.push("Protection becomes more valuable with a larger active rope set.");
  }
  if (context.goal === "ending" && upgrade.slug === "ignite-jump-rope") score -= 6;
  if (context.goal === "survival" && pressureCards.has(upgrade.slug)) score -= 5;
  if (context.stage === "early" && pressureCards.has(upgrade.slug)) score -= 3;
  if (context.stage === "early" && ["increase-jump-height", "increase-luck", "reinforce-jump-rope"].includes(upgrade.slug)) score += 2;

  if (!reasons.length) reasons.push(upgrade.stages[context.stage]);
  reasons.push(`Supports ${goalLabel[context.goal]} run better than a universal tier list can.`);

  const risky = pressureCards.has(upgrade.slug) && (context.stage === "early" || context.ropeCount >= 3);
  return {
    upgrade,
    score,
    reasons: reasons.slice(0, 2),
    risk: risky ? "This pick changes rope pressure before the current setup is fully settled." : upgrade.avoid[0] ?? "Recheck the rhythm after the pick.",
    changeCondition: upgrade.slug === "upgrade-rocket-fuel"
      ? "Prefer another card if natural airtime is still too short to make fuel useful."
      : upgrade.slug === "reinforce-jump-rope"
        ? "Prefer movement if the rope set is small and landing clearance is the real problem."
        : `Change the decision if the next landing already fails the condition this card is meant to improve.`,
    confidence: risky ? "Risky fit" : score >= 10 ? "Strong fit" : "Contextual fit",
  };
}

export function rankUpgradeChoices(choices: Upgrade[], context: PickContext): RankedPick[] {
  return choices
    .map((upgrade) => rankOne(upgrade, context))
    .sort((a, b) => b.score - a.score)
    .map((result) => ({ upgrade: result.upgrade, reasons: result.reasons, risk: result.risk, changeCondition: result.changeCondition, confidence: result.confidence }));
}
