import { z } from "zod";

const nonempty = z.string().min(1);
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const isoDate = z.iso.date();
const link = z.object({ href: nonempty, label: nonempty });
const seo = z.object({ title: nonempty, description: nonempty });
const sourceIds = z.array(id).min(1);
const sourceStatus = z.enum(["Official", "Community Verified", "Player Report", "Unconfirmed"]);
const icon = z.enum([
  "arrow", "award", "book", "calendar", "cards", "check", "clover", "controller",
  "fall", "fire", "flask", "gauge", "heart", "home", "info", "menu", "minus",
  "person", "plus", "rocket", "rope", "route", "search", "shield", "shoe",
  "spark", "speed", "target", "trophy", "x",
]);

const source = z.object({
  id, label: nonempty, type: z.enum(["official", "community", "testing", "video"]),
  url: z.url(), dateChecked: isoDate, note: nonempty,
});
const upgrade = z.object({
  id, slug: id, name: nonempty, shortName: nonempty, category: nonempty,
  tableRow: nonempty.optional(), gameTitle: nonempty.optional(), aliases: z.array(nonempty).optional(),
  icon, color: nonempty,
  description: nonempty, effect: nonempty, exactValues: nonempty, stackable: nonempty,
  playerSummary: nonempty.optional(), hudChange: nonempty.optional(),
  stackableShort: nonempty.optional(), perStackShort: nonempty.optional(),
  perStack: z.object({ official: nonempty, observed: nonempty, unknown: nonempty }).optional(),
  antiSynergies: z.array(nonempty).optional(),
  stackTiers: z.array(z.object({ label: nonempty, feel: nonempty })).optional(),
  bestTiming: z.enum(["Early", "Mid", "Late", "Any"]), verifiedVersion: nonempty,
  updatedDate: isoDate, sourceStatus, sourceIds, image: nonempty, imageAlt: nonempty, imageCaption: nonempty,
  seo, goals: z.array(nonempty), tags: z.array(nonempty),
  goalWeights: z.record(z.string(), z.number()), synergies: z.array(id), builds: z.array(id),
  whatItDoes: z.array(nonempty), stackingNote: nonempty,
  stages: z.object({ early: nonempty, mid: nonempty, late: nonempty }),
  decisionChecks: z.array(nonempty).optional(), knownUnknowns: z.array(nonempty).optional(),
  avoid: z.array(nonempty), tips: z.array(nonempty),
  offerPool: z.enum(["regular", "special"]).optional(),
  appearsAfterLevel: z.number().nullable().optional(),
  routeLinks: z.array(link.extend({ note: nonempty })).optional(),
  synergyNotes: z.array(z.object({ slug: id, why: nonempty })).optional(),
});
const build = z.object({
  slug: id, name: nonempty, shortName: nonempty, goal: nonempty, icon, description: nonempty,
  difficulty: nonempty, strength: nonempty, weakness: nonempty, verifiedVersion: nonempty,
  sourceStatus, sourceIds, coreUpgrades: z.array(id), audience: nonempty,
  phases: z.object({ early: z.array(nonempty), mid: z.array(nonempty), late: z.array(nonempty) }),
  runSignals: z.array(nonempty).optional(), fallbackRules: z.array(nonempty).optional(),
  evidenceNote: nonempty.optional(),
  avoid: z.array(nonempty), mistakes: z.array(nonempty), alternatives: z.array(nonempty), seo,
});
const guide = z.object({
  slug: id, name: nonempty, shortName: nonempty, category: nonempty, description: nonempty,
  image: nonempty, imageAlt: nonempty, updatedDate: isoDate, sourceStatus, sourceIds, seo,
  sections: z.array(z.object({ heading: nonempty, paragraphs: z.array(nonempty), bullets: z.array(nonempty).optional() })).min(1),
  links: z.array(link),
});
const update = z.object({
  slug: id, version: nonempty, kind: z.enum(["hotfix", "launch"]), date: nonempty, updatedDate: isoDate,
  title: nonempty, summary: nonempty, officialLines: z.array(nonempty).min(1),
  changes: z.array(nonempty), buildImpact: nonempty, guideImpact: nonempty,
  related: z.array(z.object({ href: nonempty, label: nonempty, text: nonempty })),
  sourceIds, seo,
});
const mod = z.object({
  slug: id, name: nonempty, author: nonempty, kind: z.enum(["Loader", "Gameplay", "Character"]),
  uploadedDate: nonempty, fileSize: nonempty, description: nonempty, requirement: nonempty,
  usage: nonempty, sourceUrl: z.url(), sourceStatus: z.enum(["Author listed", "Listing only"]),
  lastChecked: nonempty,
});
const game = z.object({
  name: nonempty, developer: nonempty, publisher: nonempty, currentVersion: nonempty,
  legalCopyright: nonempty, releaseDate: nonempty, releaseDateShort: nonempty,
  versionDate: nonempty, price: nonempty, platform: nonempty, interfaceLanguage: nonempty,
  storage: nonempty,
  minimumRequirements: z.object({
    os: nonempty, processor: nonempty, memory: nonempty, graphics: nonempty,
    directX: nonempty, storage: nonempty,
  }),
  recommendedRequirements: z.object({
    os: nonempty, processor: nonempty, memory: nonempty, graphics: nonempty,
    directX: nonempty, storage: nonempty,
  }),
  storeFeatures: z.array(nonempty), genres: z.array(nonempty), playerMode: nonempty,
  achievementCount: z.number().int().nonnegative(), achievementName: nonempty,
  updatedDate: nonempty, sourceIds, upgradeCardCount: z.number().int().positive(),
  documentedCardCount: z.number().int().positive(), tableRowCount: z.number().int().positive(),
  choicesPerLevel: z.number().int().positive(),
});

export const contentSchema = z.object({
  game, upgrades: z.array(upgrade), builds: z.array(build),
  guides: z.array(guide), updates: z.array(update), mods: z.array(mod), sources: z.array(source),
});
export type ContentInput = z.input<typeof contentSchema>;

export function validateContent(raw: unknown, assetExists: (path: string) => boolean): string[] {
  const parsed = contentSchema.safeParse(raw);
  if (!parsed.success) return parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
  const { game, upgrades, builds, guides, updates, mods, sources } = parsed.data;
  const problems: string[] = [];
  const unique = (kind: string, values: string[]) => {
    const seen = new Set<string>();
    for (const value of values) {
      if (seen.has(value)) problems.push(`duplicate ${kind}: ${value}`);
      seen.add(value);
    }
    return seen;
  };
  const upgradeIds = unique("upgrade slug", upgrades.map((item) => item.slug));
  const buildIds = unique("build slug", builds.map((item) => item.slug));
  const guideIds = unique("guide slug", guides.map((item) => item.slug));
  const updateIds = unique("update slug", updates.map((item) => item.slug));
  unique("mod slug", mods.map((item) => item.slug));
  const sourceIdSet = unique("source id", sources.map((item) => item.id));
  const routes = new Set([
    "/", "/builds", "/character", "/ending", "/game-info", "/guides", "/mods", "/search", "/updates",
    "/upgrades", "/about", "/contact", "/privacy", "/terms", "/copyright", "/sitemap.xml",
    ...[...upgradeIds].map((slug) => `/upgrades/${slug}`),
    ...[...guideIds].map((slug) => `/guides/${slug}`),
    ...[...updateIds].map((slug) => `/updates/${slug}`),
  ]);
  const checkSources = (label: string, ids: string[]) => ids.forEach((sourceId) => {
    if (!sourceIdSet.has(sourceId)) problems.push(`${label}: missing source ${sourceId}`);
  });
  const checkHref = (label: string, href: string) => {
    if (/^https?:\/\//.test(href)) return;
    if (!href.startsWith("/")) { problems.push(`${label}: invalid link ${href}`); return; }
    const route = href.split(/[?#]/)[0];
    if (!routes.has(route)) problems.push(`${label}: missing route ${href}`);
  };
  const checkAsset = (label: string, image: string) => {
    if (!/^\/images\/[a-zA-Z0-9/_-]+\.(?:png|jpe?g|webp|svg)$/.test(image) || !assetExists(image)) {
      problems.push(`${label}: missing or invalid image ${image}`);
    }
  };
  checkSources("game", game.sourceIds);
  for (const item of upgrades) {
    checkSources(item.slug, item.sourceIds);
    checkAsset(item.slug, item.image);
    for (const slug of [...item.synergies, ...(item.synergyNotes?.map((note) => note.slug) ?? [])]) {
      if (!upgradeIds.has(slug)) problems.push(`${item.slug}: missing synergy ${slug}`);
    }
    for (const slug of item.builds) if (!buildIds.has(slug)) problems.push(`${item.slug}: missing build ${slug}`);
    item.routeLinks?.forEach((route) => checkHref(item.slug, route.href));
  }
  for (const item of builds) {
    checkSources(item.slug, item.sourceIds);
    for (const slug of item.coreUpgrades) if (!upgradeIds.has(slug)) problems.push(`${item.slug}: missing core upgrade ${slug}`);
  }
  for (const item of guides) {
    checkSources(item.slug, item.sourceIds);
    checkAsset(item.slug, item.image);
    item.links.forEach((route) => checkHref(item.slug, route.href));
    for (const section of item.sections) for (const line of [...section.paragraphs, ...(section.bullets ?? [])]) {
      for (const match of line.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) checkHref(item.slug, match[1]);
    }
  }
  for (const item of updates) {
    checkSources(item.slug, item.sourceIds);
    item.related.forEach((route) => checkHref(item.slug, route.href));
  }
  return problems;
}
