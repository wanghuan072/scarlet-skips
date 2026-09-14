export type ChallengeDifficulty = "Easy" | "Normal" | "Hard" | "Chaos";
export type ChallengeGoal = "Score" | "Ending" | "Survival";
export type ChallengeStatus = "not-started" | "started" | "completed" | "failed";
export type RunStage = "early" | "mid" | "late";
export type RunGoal = "ending" | "high-score" | "survival" | "challenge" | "general";

export interface Challenge {
  id: string;
  name: string;
  type: string;
  difficulty: ChallengeDifficulty;
  goal: ChallengeGoal;
  target: string;
  description: string;
  rules: string[];
  bonusObjective: string;
  recommendedDirection: string;
  gameVersion: string;
  tags: string[];
  dailyEligible: boolean;
}

export interface UpgradeInteraction {
  id: string;
  upgradeA: string;
  upgradeB: string;
  status: "Strong synergy" | "Useful" | "Situational" | "Risky";
  goal: string[];
  stage: RunStage[];
  purpose: string;
  risk: string;
  description: string;
  prerequisites: string[];
  evidenceStatus: "Official" | "Community Verified" | "Player Report";
  sourceIds: string[];
  verifiedVersion: string;
}

export interface AnalyzerRule {
  id: string;
  problem: string;
  bottleneck: string;
  reason: string;
  recommended: string[];
  avoid: string[];
  recoveryPlan: string[];
}

export interface PassportBadge {
  id: string;
  name: string;
  description: string;
  requirement: string;
  icon: "award" | "calendar" | "route" | "trophy" | "rope" | "flask";
}

export interface ChallengeProgress {
  challengeId: string;
  status: ChallengeStatus;
  attempts: number;
  score?: number;
  updatedAt: string;
}

export interface SavedRun {
  id: string;
  runType: "Normal" | "Ending" | "Challenge";
  score: number;
  endingCompleted: boolean;
  build: string;
  upgrades: string[];
  challengeId?: string;
  gameVersion: string;
  date: string;
  proofUrl?: string;
  notes?: string;
}

export interface LabState {
  schemaVersion: 2;
  runs: SavedRun[];
  challengeProgress: ChallengeProgress[];
  endingProgress: boolean[];
  toolUsage: Record<string, number>;
}
