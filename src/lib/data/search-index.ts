import { builds, guides, mods, updates, upgrades } from "@/lib/data/content";
import { buildSearchHref } from "@/lib/data/destinations";

export type SearchSuggestion = { title: string; subtitle: string; href: string; text: string };

// Built on the server: client components receive only the fields needed for suggestions.
export function getSearchIndex(): SearchSuggestion[] {
  return [
    ...upgrades.map((item) => ({ title: item.name, subtitle: "Upgrade", href: `/upgrades/${item.slug}`, text: `${item.name} ${item.shortName} ${item.effect} ${item.category} ${(item.aliases ?? []).join(" ")} ${item.tableRow ?? ""} ${item.gameTitle ?? ""}` })),
    ...builds.map((item) => ({ title: item.shortName, subtitle: "Build route", href: buildSearchHref(item.slug), text: `${item.name} ${item.goal} ${item.description}` })),
    ...guides.map((item) => ({ title: item.shortName, subtitle: "Guide", href: `/guides/${item.slug}`, text: `${item.name} ${item.description}` })),
    ...updates.map((item) => ({ title: item.title, subtitle: "Update", href: `/updates/${item.slug}`, text: `${item.title} ${item.summary}` })),
    ...mods.map((item) => ({ title: item.name, subtitle: "Mod", href: `/mods#${item.slug}`, text: `${item.name} ${item.author} ${item.kind} ${item.description}` })),
    { title: "Play a run", subtitle: "Builds", href: "/builds#simulator", text: "build run simulator skip pick climb upgrade cards level rope moon score spectacle" },
    { title: "Scarlet Skips Character", subtitle: "Character", href: "/character", text: "scarlet skips character scarlet jumper who is scarlet rocket shoes jump rope yerk" },
    { title: "Moon Ending Route", subtitle: "Ending", href: "/ending", text: "moon ending route super rocket shoes finish credits" },
    { title: "Scarlet Skips Game Info", subtitle: "Game info", href: "/game-info", text: "release date price pc system requirements platform steam controller" },
  ];
}
