import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { builds, guides, updates, upgrades } from "@/lib/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["","/upgrades","/upgrades/best-upgrades","/builds","/guides","/run-lab","/run-lab/build-planner","/run-lab/upgrade-picker","/run-lab/ending-route","/run-lab/records","/ending","/high-score","/updates","/about","/contact","/privacy","/terms","/copyright"];
  const dynamic = [...upgrades.map(({slug})=>`/upgrades/${slug}`),...builds.map(({slug})=>`/builds/${slug}`),...guides.map(({slug})=>`/guides/${slug}`),...updates.map(({slug})=>`/updates/${slug}`)];
  return [...fixed,...dynamic].map((path)=>({url:new URL(path || "/",siteConfig.url).toString(),lastModified:new Date("2026-09-14"),changeFrequency:path.startsWith("/updates")?"weekly":"monthly",priority:path==="" ? 1 : path.split("/").length===2 ? 0.8 : 0.7}));
}
