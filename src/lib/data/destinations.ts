import type { IconName, Upgrade } from "@/types/content";

export type RunDestination = "moon" | "score" | "spectacle";

export type DestinationHint = {
  kind: "take" | "mid" | "skip";
  text: string;
};

export const destinations: Array<{
  id: RunDestination;
  kicker: string;
  title: string;
  text: string;
  sim: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  tone: "blue" | "orange" | "pink";
  icon: IconName;
  cores: string[];
  take: string;
  skip: string;
}> = [
  {
    id: "moon",
    kicker: "FASTEST ENDING",
    title: "Get to the Moon",
    text: "Keep the ropes readable, stack height and Luck, add fuel later, and wait for Super Rocket Shoes. Fire and extra ropes slow this climb down.",
    sim: "In the run, skip Ignite. Take Jump Height, Luck and Fuel. Super Rocket Shoes is the late beat.",
    href: "/ending",
    cta: "How we reach the Moon",
    image: "/images/official/screenshot-5.jpg",
    imageAlt: "Scarlet airborne with Rocket Shoes",
    tone: "blue",
    icon: "rocket",
    cores: ["increase-jump-height", "increase-luck", "reinforce-jump-rope", "upgrade-rocket-fuel"],
    take: "Helps the Moon climb",
    skip: "Skip this on a Moon run",
  },
  {
    id: "score",
    kicker: "HIGHEST SCORE",
    title: "Stay up, then pile on",
    text: "Height and Luck first. Rocket Fuel when a jump can reach the next card. Ropes, speed and fire only after that loop already works.",
    sim: "Build the airtime engine before lighting ropes. Fire is the payoff, not the opening.",
    href: "/guides/high-score",
    cta: "Open the score guide",
    image: "/images/official/screenshot-2.jpg",
    imageAlt: "Scarlet above a flaming rope",
    tone: "orange",
    icon: "trophy",
    cores: ["increase-jump-height", "increase-luck", "upgrade-rocket-fuel", "ignite-jump-rope"],
    take: "Helps the score engine",
    skip: "Wrong beat for a score run",
  },
  {
    id: "spectacle",
    kicker: "WILDEST SCREEN",
    title: "Make it loud",
    text: "More ropes, fire, speed and tricks. This is the run that looks like the store shots — not the one that reaches the Moon cleanly.",
    sim: "Reinforce before you add another rope. Light them when losing one is easy to replace.",
    href: "/guides/spectacle",
    cta: "Open the spectacle guide",
    image: "/images/official/screenshot-6.jpg",
    imageAlt: "A jump rope breaking into segments",
    tone: "pink",
    icon: "fire",
    cores: ["add-jump-rope", "reinforce-jump-rope", "ignite-jump-rope", "increase-jump-rope-speed"],
    take: "Makes the screen wilder",
    skip: "Keeps the screen quiet",
  },
];

const WEIGHT_KEY: Record<RunDestination, string> = {
  moon: "ending",
  score: "high-score",
  spectacle: "fun",
};

export function getDestination(id: string | null | undefined) {
  return destinations.find((item) => item.id === id) ?? null;
}

export function destinationHint(upgrade: Upgrade, dest: RunDestination | null): DestinationHint | null {
  if (!dest) return null;
  const route = destinations.find((item) => item.id === dest);
  if (!route) return null;
  const weight = upgrade.goalWeights[WEIGHT_KEY[dest]] ?? 0;
  if (weight >= 4) return { kind: "take", text: route.take };
  if (weight <= 1) return { kind: "skip", text: route.skip };
  return { kind: "mid", text: "Only if this rope needs it" };
}

export function buildSearchHref(slug: string) {
  if (slug === "ending-build") return "/builds#moon";
  if (slug === "high-score-build" || slug === "rocket-build") return "/builds#score";
  if (slug === "multi-rope-build") return "/builds#spectacle";
  if (slug === "beginner-build") return "/guides/beginner-guide";
  return "/builds#simulator";
}
