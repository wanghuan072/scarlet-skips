import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import game from "../src/data/game.json";
import upgrades from "../src/data/upgrades/upgrades.json";
import extraUpgrades from "../src/data/upgrades/extra-upgrades.json";
import builds from "../src/data/builds/builds.json";
import guides from "../src/data/guides/guides.json";
import updates from "../src/data/updates/updates.json";
import mods from "../src/data/mods/mods.json";
import sources from "../src/data/sources.json";
import { validateContent } from "./content-schema";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const issues = validateContent(
  { game, upgrades: [...upgrades, ...extraUpgrades], builds, guides, updates, mods, sources },
  (image) => existsSync(resolve(root, "public", image.slice(1))),
);
if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Content validated: ${upgrades.length + extraUpgrades.length} upgrades, ${guides.length} guides, ${sources.length} sources.`);
}
