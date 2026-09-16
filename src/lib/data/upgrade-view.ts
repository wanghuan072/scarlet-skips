import { getBuild, getRelatedUpgrades, getUpgrade } from "@/lib/data/content";
import type {
  Upgrade,
  UpgradePerStack,
  UpgradeRoute,
  UpgradeStackTier,
  UpgradeSynergyNote,
} from "@/types/content";

const BUILD_ROUTES: Record<string, { href: string; label: string }> = {
  "beginner-build": { href: "/guides/beginner-guide", label: "Learning the jump" },
  "ending-build": { href: "/ending", label: "Moon / ending" },
  "high-score-build": { href: "/guides/high-score", label: "High score" },
  "rocket-build": { href: "/guides/high-score", label: "Rocket airtime" },
  "multi-rope-build": { href: "/guides/spectacle", label: "Spectacle" },
  "best-build": { href: "/builds#simulator", label: "Play a run" },
};

export function stackableLabel(upgrade: Upgrade) {
  if (upgrade.stackableShort) return upgrade.stackableShort;
  if (/^yes/i.test(upgrade.stackable)) return "Yes";
  if (/situational/i.test(upgrade.stackable)) return "Situational";
  if (/stack/i.test(upgrade.stackable)) return "Yes";
  return "See notes";
}

export function perStackLabel(upgrade: Upgrade) {
  if (upgrade.perStackShort) return upgrade.perStackShort;
  if (/unknown|no official|not officially|not published|no public/i.test(upgrade.exactValues)) {
    return "Not published";
  }
  return upgrade.exactValues;
}

export function playerSummary(upgrade: Upgrade) {
  return upgrade.playerSummary ?? upgrade.effect;
}

export function perStackRows(upgrade: Upgrade): UpgradePerStack {
  if (upgrade.perStack) return upgrade.perStack;
  const unknowns = upgrade.knownUnknowns ?? [];
  return {
    official: unknowns.find((line) => /^Official/i.test(line)) ?? upgrade.exactValues,
    observed: unknowns.find((line) => /Community observed/i.test(line)) ?? upgrade.stackingNote,
    unknown: unknowns.find((line) => /^Unknown/i.test(line)) ?? "No public per-pick number or cap.",
  };
}

export function synergyRows(upgrade: Upgrade): Array<UpgradeSynergyNote & { name: string; href: string }> {
  if (upgrade.synergyNotes?.length) {
    return upgrade.synergyNotes.flatMap((note) => {
      const target = getUpgrade(note.slug);
      return target ? [{ ...note, name: target.shortName, href: `/upgrades/${target.slug}` }] : [];
    });
  }
  return getRelatedUpgrades(upgrade.synergies).map((item) => ({
    slug: item.slug,
    why: item.effect,
    name: item.shortName,
    href: `/upgrades/${item.slug}`,
  }));
}

export function routeRows(upgrade: Upgrade): UpgradeRoute[] {
  if (upgrade.routeLinks?.length) return upgrade.routeLinks;
  return upgrade.builds.flatMap((slug) => {
    const mapped = BUILD_ROUTES[slug];
    const build = getBuild(slug);
    if (!mapped || !build) return [];
    return [{ href: mapped.href, label: mapped.label, note: build.goal }];
  });
}

export function appearLabel(upgrade: Upgrade) {
  if (upgrade.offerPool === "special" || upgrade.appearsAfterLevel == null) {
    return "Not in regular offer";
  }
  if (upgrade.appearsAfterLevel <= 1) return "From level 1";
  return `From level ${upgrade.appearsAfterLevel}`;
}

export function pairLabel(upgrade: Upgrade) {
  return synergyRows(upgrade)
    .slice(0, 2)
    .map((item) => item.name)
    .join(" · ");
}

export function stackTiers(upgrade: Upgrade): UpgradeStackTier[] {
  if (upgrade.stackTiers?.length) return upgrade.stackTiers;
  return [
    { label: "Early run", feel: upgrade.stages.early },
    { label: "Mid run", feel: upgrade.stages.mid },
    { label: "Late run", feel: upgrade.stages.late },
  ];
}
