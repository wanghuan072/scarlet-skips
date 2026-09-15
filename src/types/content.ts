export type SourceStatus =
  | "Official"
  | "Community Verified"
  | "Player Report"
  | "Unconfirmed";

export type Timing = "Early" | "Mid" | "Late" | "Any";

export interface Source {
  id: string;
  label: string;
  type: "official" | "community" | "testing" | "video";
  url: string;
  dateChecked: string;
  note: string;
}

export interface GameData {
  name: string;
  developer: string;
  publisher: string;
  legalCopyright: string;
  releaseDate: string;
  releaseDateShort: string;
  currentVersion: string;
  versionDate: string;
  price: string;
  platform: string;
  interfaceLanguage: string;
  storage: string;
  minimumRequirements: SystemRequirements;
  recommendedRequirements: SystemRequirements;
  storeFeatures: string[];
  genres: string[];
  playerMode: string;
  upgradeCardCount: number;
  documentedCardCount: number;
  choicesPerLevel: number;
  achievementCount: number;
  achievementName: string;
  updatedDate: string;
  sourceIds: string[];
}

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  directX: string;
  storage: string;
}

export interface Upgrade {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  icon: IconName;
  color: string;
  category: string;
  description: string;
  effect: string;
  exactValues: string;
  stackable: string;
  bestTiming: Timing;
  verifiedVersion: string;
  updatedDate: string;
  sourceStatus: SourceStatus;
  sourceIds: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  goals: string[];
  tags: string[];
  goalWeights: Record<string, number>;
  synergies: string[];
  builds: string[];
  whatItDoes: string[];
  stackingNote: string;
  stages: Record<"early" | "mid" | "late", string>;
  decisionChecks?: string[];
  knownUnknowns?: string[];
  avoid: string[];
  tips: string[];
  seo: { title: string; description: string };
}

export interface Build {
  slug: string;
  name: string;
  shortName: string;
  goal: string;
  icon: IconName;
  difficulty: string;
  description: string;
  strength: string;
  weakness: string;
  verifiedVersion: string;
  sourceStatus: SourceStatus;
  coreUpgrades: string[];
  audience: string;
  phases: Record<"early" | "mid" | "late", string[]>;
  runSignals?: string[];
  fallbackRules?: string[];
  evidenceNote?: string;
  avoid: string[];
  mistakes: string[];
  alternatives: string[];
  sourceIds: string[];
  seo: { title: string; description: string };
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  updatedDate: string;
  sourceStatus: SourceStatus;
  sourceIds: string[];
  sections: GuideSection[];
  links: { label: string; href: string }[];
  seo: { title: string; description: string };
}

export interface UpdateEntry {
  slug: string;
  version: string;
  date: string;
  title: string;
  summary: string;
  changes: string[];
  buildImpact: string;
  guideImpact: string;
  sourceIds: string[];
  seo: { title: string; description: string };
}

export interface ModEntry {
  slug: string;
  name: string;
  author: string;
  kind: "Loader" | "Gameplay" | "Character";
  uploadedDate: string;
  fileSize: string;
  description: string;
  requirement: string;
  usage: string;
  sourceUrl: string;
  sourceStatus: "Author listed" | "Listing only";
  lastChecked: string;
}

export type IconName =
  | "arrow"
  | "award"
  | "book"
  | "calendar"
  | "cards"
  | "check"
  | "clover"
  | "controller"
  | "fire"
  | "flask"
  | "gauge"
  | "heart"
  | "home"
  | "info"
  | "menu"
  | "minus"
  | "plus"
  | "rocket"
  | "rope"
  | "route"
  | "search"
  | "shield"
  | "shoe"
  | "spark"
  | "speed"
  | "target"
  | "trophy"
  | "x";
