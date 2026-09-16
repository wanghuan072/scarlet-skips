import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { guides, updates, upgrades } from "@/lib/data/content";
import { pageTdk } from "@/seo/tdk";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = Object.keys(pageTdk).filter((path) => path !== "/search");
  const dynamic = [...upgrades.map(({slug})=>`/upgrades/${slug}`),...guides.map(({slug})=>`/guides/${slug}`),...updates.map(({slug})=>`/updates/${slug}`)];
  const modified = new Map<string, string>([
    ...upgrades.map((item) => [`/upgrades/${item.slug}`, item.updatedDate] as const),
    ...guides.map((item) => [`/guides/${item.slug}`, item.updatedDate] as const),
    ...updates.map((item) => [`/updates/${item.slug}`, item.updatedDate] as const),
  ]);
  return [...fixed, ...dynamic].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    ...(modified.has(path) ? { lastModified: modified.get(path) } : {}),
  }));
}
