import buildsJson from "@/data/builds/builds.json";
import gameJson from "@/data/game.json";
import guidesJson from "@/data/guides/guides.json";
import modsJson from "@/data/mods/mods.json";
import sourcesJson from "@/data/sources.json";
import updatesJson from "@/data/updates/updates.json";
import extraUpgradesJson from "@/data/upgrades/extra-upgrades.json";
import upgradesJson from "@/data/upgrades/upgrades.json";
import type {
  Build,
  GameData,
  Guide,
  ModEntry,
  Source,
  UpdateEntry,
  Upgrade,
} from "@/types/content";

export const game = gameJson as GameData;
export const upgrades = [...(upgradesJson as Upgrade[]), ...(extraUpgradesJson as Upgrade[])];
export const regularUpgrades = upgrades.filter((upgrade) => upgrade.offerPool !== "special");
export const specialUpgrades = upgrades.filter((upgrade) => upgrade.offerPool === "special");
export const builds = buildsJson as Build[];
export const guides = guidesJson as Guide[];
export const mods = modsJson as ModEntry[];
export const updates = updatesJson as UpdateEntry[];
export const sources = sourcesJson as Source[];

export function getUpgrade(slug: string) {
  return upgrades.find((upgrade) => upgrade.slug === slug);
}

export function getBuild(slug: string) {
  return builds.find((build) => build.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getUpdate(slug: string) {
  return updates.find((entry) => entry.slug === slug);
}

export function getSources(ids: string[]) {
  return ids
    .map((id) => sources.find((source) => source.id === id))
    .filter((source): source is Source => Boolean(source));
}

export function getRelatedUpgrades(slugs: string[]) {
  return slugs
    .map((slug) => getUpgrade(slug))
    .filter((upgrade): upgrade is Upgrade => Boolean(upgrade));
}

export function getRelatedBuilds(slugs: string[]) {
  return slugs
    .map((slug) => getBuild(slug))
    .filter((build): build is Build => Boolean(build));
}
