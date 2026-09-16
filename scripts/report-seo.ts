import { pageTdk } from "../src/seo/tdk.js";
import guides from "../src/data/guides/guides.json";
import upgrades from "../src/data/upgrades/upgrades.json";
import extraUpgrades from "../src/data/upgrades/extra-upgrades.json";
import updates from "../src/data/updates/updates.json";

const entries = [
  ...Object.entries(pageTdk),
  ...guides.map((item) => [`/guides/${item.slug}`, item.seo] as const),
  ...[...upgrades, ...extraUpgrades].map((item) => [`/upgrades/${item.slug}`, item.seo] as const),
  ...updates.map((item) => [`/updates/${item.slug}`, item.seo] as const),
];

for (const [path, seo] of entries) {
  const titleLength = [...seo.title].length;
  const descriptionLength = [...seo.description].length;
  const outside = titleLength < 40 || titleLength > 60 || descriptionLength < 140 || descriptionLength > 160;
  console.log(`${outside ? "REVIEW" : "OK    "} ${path.padEnd(36)} title ${String(titleLength).padStart(2)}  description ${descriptionLength}`);
}
console.log("Length is an editorial target, not a search-engine requirement. Review exceptions for clarity; do not pad copy.");
