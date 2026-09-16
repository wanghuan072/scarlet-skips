export type UpgradeArtVariant = {
  bounceLevel?: number;
  rocketShoes?: boolean;
  fastFall?: number;
};

const CARD_DIR = "/images/official/upgrade-cards";
const ART_VERSION = "ss3";

const NATIVE_LARGE = new Set([
  "fast-fall.png",
  "faster-fall.png",
  "bounce-tricks.png",
  "bounce-tricks-x2.png",
  "bounce-tricks-x3.png",
  "bounce-tricks-inf.png",
  "air-tricks.png",
  "charge-jump.png",
]);

const SHOT_SIZE: Record<string, { width: number; height: number }> = {
  "add-jump-rope.png": { width: 354, height: 518 },
  "increase-luck.png": { width: 386, height: 572 },
  "reinforce-jump-rope.png": { width: 354, height: 518 },
};

function cardFile(src: string | null) {
  return src?.split("/").pop()?.split("?")[0] ?? "";
}

export function upgradeCardSize(src: string | null) {
  const file = cardFile(src);
  if (SHOT_SIZE[file]) return SHOT_SIZE[file];
  return NATIVE_LARGE.has(file) ? { width: 2816, height: 4096 } : { width: 704, height: 1024 };
}

const BASE_ART: Record<string, string> = {
  "increase-jump-height": "increase-jump-height.png",
  "increase-luck": "increase-luck.png",
  "upgrade-rocket-fuel": "add-rocket-shoes.png",
  "add-jump-rope": "add-jump-rope.png",
  "reinforce-jump-rope": "reinforce-jump-rope.png",
  "increase-jump-rope-speed": "increase-jump-rope-speed.png",
  "ignite-jump-rope": "ignite-jump-rope.png",
  "extinguish-jump-rope": "extinguish-jump-rope.png",
  "fast-fall": "fast-fall.png",
  "bounce-tricks": "bounce-tricks.png",
  "air-tricks": "air-tricks.png",
  "charge-jump": "charge-jump.png",
  "super-rocket-shoes": "super-rocket-shoes.png",
};

export function upgradeCardSrc(slug: string, variant?: UpgradeArtVariant) {
  if (slug === "upgrade-rocket-fuel" && variant?.rocketShoes) {
    return cardUrl("upgrade-rocket-fuel.png");
  }
  if (slug === "fast-fall" && (variant?.fastFall ?? 0) >= 1) {
    return cardUrl("faster-fall.png");
  }
  if (slug === "bounce-tricks") {
    const level = variant?.bounceLevel ?? 0;
    const file =
      level >= 3 ? "bounce-tricks-inf.png"
      : level === 2 ? "bounce-tricks-x3.png"
      : level === 1 ? "bounce-tricks-x2.png"
      : "bounce-tricks.png";
    return cardUrl(file);
  }
  const file = BASE_ART[slug];
  return file ? cardUrl(file) : null;
}

function cardUrl(file: string) {
  return `${CARD_DIR}/${file}?v=${ART_VERSION}`;
}
