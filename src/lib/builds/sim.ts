import { regularUpgrades } from "@/lib/data/content";
import type { IconName, Upgrade } from "@/types/content";

/**
 * Cooked DT_Upgrades (STR_Upgrades):
 * AppearsAfterLevel, Rarity (draw weight), DisappearAfterUse.
 * Rarity 1.0 for almost every regular row; Reinforce is 0.5.
 * Specials at 9999 stay out of UI_UpgradesMenu.
 *
 * Named Scarlet / jumprope fields this sim actually follows:
 * IncrementJumpCounter on each rope rotation, GetJumpsNeededToLevelUp,
 * InitialJumpsNeededToLevelUp, ExponentialJumpsNeededToLevelUp,
 * ExponentialLevelUpMultiplier, CalculateLuck + RandomBoolWithWeight,
 * per-rope Ignited / Reinforced / Negative, IgniteMultiplier,
 * JumpHeightLevel, FuelUpgradeIncrement, ChargeJumpHeightMultiplier,
 * BounceTricksUpgradeLevel (card art x2 / x3 / Inf).
 *
 * Score is loops × ignite multiplier (1 + burning ropes).
 * Hang/loop counts use the named systems with working constants below.
 * Exact centimetres and points-per-skip are not in the cooked table.
 */

export const RARITY: Record<string, number> = {
  "increase-jump-height": 1,
  "increase-luck": 1,
  "upgrade-rocket-fuel": 1,
  "add-jump-rope": 1,
  "reinforce-jump-rope": 0.5,
  "increase-jump-rope-speed": 1,
  "ignite-jump-rope": 1,
  "extinguish-jump-rope": 1,
  "fast-fall": 1,
  "bounce-tricks": 1,
  "air-tricks": 1,
  "charge-jump": 1,
  "super-rocket-shoes": 1,
};

export const ONCE_CARDS = new Set([
  "charge-jump",
  "air-tricks",
  "super-rocket-shoes",
]);

export const INITIAL_JUMPS_NEEDED = 10;
export const LEVEL_GROWTH = 1.25;
export const LUCK_WEIGHT_PER_STACK = 0.1;

export type RopeFlag = "plain" | "reinforced" | "ignited" | "negative";

export type Rope = {
  id: number;
  speed: number;
  ignited: boolean;
  reinforced: boolean;
  negative: boolean;
};

export type SimState = {
  level: number;
  jumpProgress: number;
  timesJumped: number;
  score: number;
  luck: number;
  jumpLevel: number;
  fuel: number;
  maxFuel: number;
  rocketShoes: boolean;
  superRocket: boolean;
  chargeJump: boolean;
  airTricks: boolean;
  fastFall: number;
  bounceLevel: number;
  ropes: Rope[];
  picks: string[];
  gone: string[];
};

export type SkipResult = {
  state: SimState;
  loops: number;
  lucky: number;
  fuelBurned: number;
  leveled: boolean;
  scoreGained: number;
};

export type ApplyResult = {
  state: SimState;
  change: string;
  detail: string;
  deltas: StatDelta[];
};

export function freshState(): SimState {
  return {
    level: 1,
    jumpProgress: 0,
    timesJumped: 0,
    score: 0,
    luck: 0,
    jumpLevel: 0,
    fuel: 0,
    maxFuel: 0,
    rocketShoes: false,
    superRocket: false,
    chargeJump: false,
    airTricks: false,
    fastFall: 0,
    bounceLevel: 0,
    ropes: [{ id: 1, speed: 0, ignited: false, reinforced: false, negative: false }],
    picks: [],
    gone: [],
  };
}

export function jumpsNeeded(level: number) {
  return Math.max(4, Math.round(INITIAL_JUMPS_NEEDED * LEVEL_GROWTH ** (level - 1)));
}

export function igniteMultiplier(ropes: Rope[]) {
  const lit = ropes.filter((rope) => rope.ignited).length;
  return 1 + lit;
}

export function airtime(state: SimState) {
  let hang = 1 + state.jumpLevel;
  if (state.chargeJump) hang += 1;
  if (state.airTricks) hang += 1;
  hang += Math.min(3, state.bounceLevel);
  if (state.bounceLevel >= 4) hang += 1;
  if (state.fastFall === 1) hang = Math.max(1, hang - 1);
  if (state.fastFall >= 2) hang = Math.max(1, hang - 2);
  return hang;
}

function rocketHang(state: SimState) {
  return state.rocketShoes && state.fuel > 0 ? state.maxFuel : 0;
}

function loopsOnRope(state: SimState, rope: Rope, hang: number, extraHang: number) {
  const loops = hang + extraHang + rope.speed;
  return Math.max(1, rope.negative ? loops - 1 : loops);
}

export function expectedLoops(state: SimState) {
  const hang = airtime(state);
  const extra = rocketHang(state);
  return state.ropes.reduce((sum, rope) => sum + loopsOnRope(state, rope, hang, extra), 0);
}

export function luckyChance(luck: number) {
  return Math.round(Math.min(0.7, luck * LUCK_WEIGHT_PER_STACK) * 100);
}

export type StatSnap = {
  jump: number;
  luck: number;
  lucky: number;
  fuel: string;
  ropes: number;
  speed: number;
  shields: number;
  ignite: number;
  bounce: string;
  loops: number;
  charge: string;
  air: string;
  fall: string;
};

export function snapshot(state: SimState): StatSnap {
  const speed = state.ropes.reduce((sum, rope) => sum + rope.speed, 0);
  return {
    jump: state.jumpLevel,
    luck: state.luck,
    lucky: luckyChance(state.luck),
    fuel: state.rocketShoes ? `${state.fuel}/${state.maxFuel}` : "Off",
    ropes: state.ropes.length,
    speed,
    shields: state.ropes.filter((rope) => rope.reinforced).length,
    ignite: igniteMultiplier(state.ropes),
    bounce: bounceLabel(state.bounceLevel),
    loops: expectedLoops(state),
    charge: state.chargeJump ? "On" : "Off",
    air: state.airTricks ? "On" : "Off",
    fall: state.fastFall >= 2 ? "Faster" : state.fastFall === 1 ? "On" : "Off",
  };
}

export type StatDelta = { key: keyof StatSnap; label: string; from: string; to: string };

const STAT_LABEL: Record<keyof StatSnap, string> = {
  jump: "Jump",
  luck: "Luck",
  lucky: "LUCKY",
  fuel: "Fuel",
  ropes: "Ropes",
  speed: "Speed",
  shields: "Shields",
  ignite: "Ignite",
  bounce: "Bounce",
  loops: "Loops/skip",
  charge: "Charge",
  air: "Air tricks",
  fall: "Fast fall",
};

export function diffSnap(before: StatSnap, after: StatSnap): StatDelta[] {
  const keys = Object.keys(STAT_LABEL) as (keyof StatSnap)[];
  return keys.flatMap((key) => {
    if (before[key] === after[key]) return [];
    const from = key === "ignite" ? `×${before[key]}` : key === "lucky" ? `${before[key]}%` : String(before[key]);
    const to = key === "ignite" ? `×${after[key]}` : key === "lucky" ? `${after[key]}%` : String(after[key]);
    return [{ key, label: STAT_LABEL[key], from, to }];
  });
}

function luckyHit(luck: number, random: () => number) {
  if (luck <= 0) return false;
  return random() < Math.min(0.7, luck * LUCK_WEIGHT_PER_STACK);
}

export function skipOnce(state: SimState, random: () => number = Math.random): SkipResult {
  const hang = airtime(state);
  const fuelBurned = state.rocketShoes && state.fuel > 0 ? 1 : 0;
  const extraHang = fuelBurned ? rocketHang(state) : 0;
  let loops = 0;
  let lucky = 0;
  let scoreGained = 0;
  const multiplier = igniteMultiplier(state.ropes);

  for (const rope of state.ropes) {
    const turns = loopsOnRope(state, rope, hang, extraHang);
    loops += turns;
    const ropeScore = turns * multiplier * (rope.negative ? 0.5 : 1);
    scoreGained += Math.round(ropeScore);
    for (let i = 0; i < turns; i += 1) {
      if (luckyHit(state.luck, random)) {
        lucky += 1;
        loops += 1;
        scoreGained += Math.round(multiplier * (rope.negative ? 0.5 : 1));
      }
    }
  }

  const needed = jumpsNeeded(state.level);
  const jumpProgress = state.jumpProgress + loops;
  const next: SimState = {
    ...state,
    ropes: state.ropes.map((rope) => ({ ...rope })),
    jumpProgress,
    timesJumped: state.timesJumped + 1,
    score: state.score + scoreGained,
    fuel: state.fuel - fuelBurned,
  };

  return {
    state: next,
    loops,
    lucky,
    fuelBurned,
    leveled: jumpProgress >= needed,
    scoreGained,
  };
}

export type SkipBatchResult = SkipResult & { jumps: number };

export function advanceSkipBatch(state: SimState, maxSkips = 40, random: () => number = Math.random): SkipBatchResult {
  if (!Number.isSafeInteger(maxSkips) || maxSkips < 1) throw new RangeError("maxSkips must be a positive safe integer");
  let current = state;
  let loops = 0;
  let lucky = 0;
  let fuelBurned = 0;
  let scoreGained = 0;
  let leveled = false;
  let jumps = 0;
  while (!leveled && jumps < maxSkips) {
    const result = skipOnce(current, random);
    current = result.state;
    loops += result.loops;
    lucky += result.lucky;
    fuelBurned += result.fuelBurned;
    scoreGained += result.scoreGained;
    leveled = result.leveled;
    jumps += 1;
  }
  return { state: current, loops, lucky, fuelBurned, scoreGained, leveled, jumps };
}

function nextRopeId(ropes: Rope[]) {
  return (ropes.at(-1)?.id ?? 0) + 1;
}

function chooseRope(ropes: Rope[], pred: (rope: Rope) => boolean) {
  return ropes.findIndex(pred);
}

export function offerTitle(upgrade: Upgrade, state: SimState) {
  if (upgrade.slug === "upgrade-rocket-fuel") {
    return state.rocketShoes ? "Upgrade Rocket Fuel" : "Add Rocket Shoes";
  }
  if (upgrade.slug === "fast-fall") {
    return state.fastFall >= 1 ? "Faster Fall" : "Let Go to Fast Fall";
  }
  if (upgrade.slug === "bounce-tricks") {
    if (state.bounceLevel >= 3) return "Bounce Tricks Inf";
    if (state.bounceLevel === 2) return "Bounce Tricks ×3";
    if (state.bounceLevel === 1) return "Bounce Tricks ×2";
    return "Bounce Tricks";
  }
  return upgrade.gameTitle ?? upgrade.name;
}

export function offerDetail(upgrade: Upgrade, state: SimState): { icon: IconName; detail: string; change: string } {
  const change = applyUpgrade(state, upgrade.slug).change;

  switch (upgrade.slug) {
    case "increase-jump-height":
      return { icon: "shoe", detail: "Jump Level up. Each stack adds one loop to every rope on the next skip.", change };
    case "increase-luck":
      return { icon: "clover", detail: "Each finished loop can flash LUCKY and count an extra one toward the next card.", change };
    case "upgrade-rocket-fuel":
      return state.rocketShoes
        ? { icon: "rocket", detail: "Bigger tank. Fuel refills when a card lands. A skip with fuel left hangs longer.", change }
        : { icon: "rocket", detail: "Rocket Shoes on. Later copies of this card become Upgrade Rocket Fuel.", change };
    case "add-jump-rope":
      return { icon: "rope", detail: "Another rope spinning. More loops toward the next card, and more to clear.", change };
    case "reinforce-jump-rope":
      return { icon: "shield", detail: "Puts Reinforced on one rope. Half as common as the other cards.", change };
    case "increase-jump-rope-speed":
      return { icon: "speed", detail: "The slowest rope gains Speed +1, so that rope finishes one extra loop per skip.", change };
    case "ignite-jump-rope":
      return { icon: "fire", detail: "Lights one rope. Score multiplier is 1 plus every burning rope.", change };
    case "extinguish-jump-rope":
      return { icon: "minus", detail: "Puts the fire out on one burning rope.", change };
    case "fast-fall":
      return { icon: "fall", detail: "Shorter hang. Each skip clears fewer loops, then we are ready again.", change };
    case "bounce-tricks":
      return { icon: "spark", detail: "Stronger landing bounce. The card art goes ×2, ×3, then Inf.", change };
    case "air-tricks":
      return { icon: "spark", detail: "Press in the air for extra hang. This card then leaves the pool.", change };
    case "charge-jump":
      return { icon: "shoe", detail: "Hold to charge. A charged skip adds one extra loop of hang. One-time card.", change };
    case "super-rocket-shoes":
      return { icon: "rocket", detail: "They're Rocket And Super. Taking it ends this climb.", change };
    default:
      return { icon: upgrade.icon, detail: upgrade.effect, change };
  }
}

export function bounceLabel(level: number) {
  if (level <= 0) return "Off";
  if (level === 1) return "×1";
  if (level === 2) return "×2";
  if (level === 3) return "×3";
  return "Inf";
}

export function applyUpgrade(state: SimState, slug: string): ApplyResult {
  const before = snapshot(state);
  const ropes = state.ropes.map((rope) => ({ ...rope }));
  const next: SimState = {
    ...state,
    ropes,
    picks: [...state.picks, slug],
    gone: [...state.gone],
  };
  let change = "";
  let detail = "";

  if (ONCE_CARDS.has(slug)) next.gone.push(slug);

  switch (slug) {
    case "increase-jump-height":
      next.jumpLevel += 1;
      change = `Jump Level ${next.jumpLevel}`;
      detail = "Hang time went up. The next skip should clear more loops.";
      break;
    case "increase-luck":
      next.luck += 1;
      change = `Luck ${next.luck}`;
      detail = "LUCKY can now fire more often on finished rotations.";
      break;
    case "upgrade-rocket-fuel":
      if (!next.rocketShoes) {
        next.rocketShoes = true;
        next.maxFuel = 1;
        next.fuel = 1;
        change = "Rocket Shoes on";
        detail = "Fuel gauge is live. We spend 1 fuel on a skip if any is left.";
      } else {
        next.maxFuel += 1;
        next.fuel = next.maxFuel;
        change = `Max Fuel ${next.maxFuel}`;
        detail = "Tank grew, then refilled — the same refill we get on a level-up.";
      }
      break;
    case "add-jump-rope": {
      ropes.push({
        id: nextRopeId(ropes),
        speed: 0,
        ignited: false,
        reinforced: false,
        negative: false,
      });
      change = `Rope ${ropes.length}`;
      detail = "One more rope filling the jump bar.";
      break;
    }
    case "reinforce-jump-rope": {
      const index = chooseRope(ropes, (rope) => !rope.reinforced && !rope.negative);
      const target = index >= 0 ? index : chooseRope(ropes, (rope) => !rope.reinforced);
      if (target >= 0) {
        ropes[target].reinforced = true;
        change = `Rope ${ropes[target].id} reinforced`;
        detail = "That rope is marked Reinforced.";
      } else {
        change = "Every rope already reinforced";
        detail = "No unprotected rope left to mark.";
      }
      break;
    }
    case "increase-jump-rope-speed": {
      const slowest = ropes.reduce((best, rope, index) => (rope.speed < ropes[best].speed ? index : best), 0);
      ropes[slowest].speed += 1;
      change = `Rope ${ropes[slowest].id} speed ${ropes[slowest].speed}`;
      detail = "That rope will finish more loops in the same hang.";
      break;
    }
    case "ignite-jump-rope": {
      const index = chooseRope(ropes, (rope) => !rope.ignited);
      if (index >= 0) {
        ropes[index].ignited = true;
        change = `Rope ${ropes[index].id} ignited · ×${igniteMultiplier(ropes)}`;
        detail = "Ignite multiplier is 1 plus the number of burning ropes.";
      } else {
        change = "Every rope already burning";
        detail = "Add a rope if we still want more fire.";
      }
      break;
    }
    case "extinguish-jump-rope": {
      const index = chooseRope(ropes, (rope) => rope.ignited);
      if (index >= 0) {
        ropes[index].ignited = false;
        change = `Rope ${ropes[index].id} extinguished · ×${igniteMultiplier(ropes)}`;
        detail = "Fire is off on that rope. Multiplier dropped.";
      } else {
        change = "Nothing burning";
        detail = "Extinguish had no ignited rope to clear.";
      }
      break;
    }
    case "fast-fall":
      next.fastFall += 1;
      change = next.fastFall === 1 ? "Fast Fall on" : "Faster Fall";
      detail = "Hang is shorter. Each skip clears fewer loops, then we are ready again.";
      break;
    case "bounce-tricks":
      next.bounceLevel += 1;
      change = `Bounce ${bounceLabel(next.bounceLevel)}`;
      detail = "Landing bounce adds hang for the next skip.";
      break;
    case "air-tricks":
      next.airTricks = true;
      change = "Air Tricks on";
      detail = "Mid-air press is live. This card will not come back.";
      break;
    case "charge-jump":
      next.chargeJump = true;
      change = "Charge Jump on";
      detail = `Held skips add one extra loop of hang.`;
      break;
    case "super-rocket-shoes":
      next.superRocket = true;
      next.rocketShoes = true;
      next.fuel = Math.max(next.maxFuel, 2);
      next.maxFuel = Math.max(next.maxFuel, 2);
      change = "Super Rocket Shoes";
      detail = "Late pair is on. This simulated climb ends here.";
      break;
    default:
      change = slug;
      detail = "Applied.";
  }

  if (slug !== "upgrade-rocket-fuel" && next.rocketShoes) {
    next.fuel = next.maxFuel;
  }

  next.level += 1;
  next.jumpProgress = 0;
  const deltas = diffSnap(before, snapshot(next));
  const moved = deltas
    .filter((item) => item.key !== "lucky" || deltas.some((row) => row.key === "luck"))
    .map((item) => `${item.label} ${item.from}→${item.to}`);
  if (moved.length) change = moved.slice(0, 4).join(" · ");
  return { state: next, change, detail, deltas };
}

export function drawForLevel(state: SimState, random: () => number = Math.random): Upgrade[] {
  const pool = regularUpgrades.filter((upgrade) => {
    if ((upgrade.appearsAfterLevel ?? 99) > state.level) return false;
    if (state.gone.includes(upgrade.slug)) return false;
    if (upgrade.slug === "super-rocket-shoes" && !state.rocketShoes) return false;
    if (upgrade.slug === "bounce-tricks" && state.bounceLevel >= 4) return false;
    return true;
  });

  const weighted = pool.map((item) => ({ item, weight: RARITY[item.slug] ?? 1 }));
  return weightedSample(weighted, 3, random);
}

function weightedSample(pool: { item: Upgrade; weight: number }[], count: number, random: () => number) {
  const remaining = [...pool];
  const draw: Upgrade[] = [];
  while (draw.length < count && remaining.length) {
    const total = remaining.reduce((sum, row) => sum + row.weight, 0);
    let roll = random() * total;
    let index = remaining.findIndex((row) => {
      roll -= row.weight;
      return roll <= 0;
    });
    if (index < 0) index = remaining.length - 1;
    draw.push(remaining[index].item);
    remaining.splice(index, 1);
  }
  return draw;
}

export function ropeFlags(rope: Rope): RopeFlag[] {
  const flags: RopeFlag[] = [];
  if (rope.negative) flags.push("negative");
  if (rope.ignited) flags.push("ignited");
  if (rope.reinforced) flags.push("reinforced");
  if (!flags.length) flags.push("plain");
  return flags;
}

export function pressureLabel(state: SimState) {
  const heat = (state.ropes.length - 1) * 18
    + state.ropes.reduce((sum, rope) => sum + rope.speed * 12 + (rope.ignited ? 14 : 0) + (rope.negative ? 10 : 0), 0);
  if (heat < 28) return "Readable";
  if (heat < 64) return "Busy";
  return "Wild";
}
