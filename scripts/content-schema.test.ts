import { describe, expect, it } from "vitest";
import game from "../src/data/game.json";
import upgrades from "../src/data/upgrades/upgrades.json";
import extraUpgrades from "../src/data/upgrades/extra-upgrades.json";
import builds from "../src/data/builds/builds.json";
import guides from "../src/data/guides/guides.json";
import updates from "../src/data/updates/updates.json";
import mods from "../src/data/mods/mods.json";
import sources from "../src/data/sources.json";
import { validateContent } from "./content-schema";

const content = { game, upgrades: [...upgrades, ...extraUpgrades], builds, guides, updates, mods, sources };
const assetExists = () => true;

describe("content validation", () => {
  it("accepts the site's current content", () => {
    expect(validateContent(content, assetExists)).toEqual([]);
  });

  it("rejects duplicate slugs and missing references", () => {
    const copy = structuredClone(content);
    copy.upgrades[1].slug = copy.upgrades[0].slug;
    copy.guides[0].sourceIds.push("not-a-source");
    const issues = validateContent(copy, assetExists);
    expect(issues.some((issue) => issue.includes("duplicate upgrade slug"))).toBe(true);
    expect(issues.some((issue) => issue.includes("missing source"))).toBe(true);
  });

  it("rejects a missing image, stale internal link or malformed date", () => {
    const copy = structuredClone(content);
    copy.guides[0].image = "/images/official/does-not-exist.jpg";
    copy.guides[0].links.push({ label: "Old", href: "/high-score" });
    const issues = validateContent(copy, (path) => path !== copy.guides[0].image);
    expect(issues.some((issue) => issue.includes("invalid image"))).toBe(true);
    expect(issues.some((issue) => issue.includes("missing route /high-score"))).toBe(true);
    copy.guides[0].updatedDate = "September 14, 2026";
    expect(validateContent(copy, assetExists).some((issue) => issue.includes("updatedDate"))).toBe(true);
  });

  it("requires nested game fields and the displayed upgrade artwork caption", () => {
    const copy = structuredClone(content);
    delete (copy.game as Partial<typeof game>).minimumRequirements;
    delete (copy.upgrades[0] as Partial<typeof upgrades[number]>).imageCaption;
    const issues = validateContent(copy, assetExists);
    expect(issues.some((issue) => issue.includes("minimumRequirements"))).toBe(true);
    expect(issues.some((issue) => issue.includes("imageCaption"))).toBe(true);
  });
});
