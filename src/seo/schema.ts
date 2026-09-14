import { siteConfig } from "@/config/site";
import { game } from "@/lib/data/content";

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: game.name,
  description:
    "A one-button roguelike score-attack game about skipping rope, stacking upgrades and jumping higher.",
  gamePlatform: "Windows PC",
  genre: game.genres,
  datePublished: "2026-09-03",
  author: { "@type": "Organization", name: game.developer },
  publisher: { "@type": "Organization", name: game.publisher },
  image: `${siteConfig.url}/images/official/screenshot-1.jpg`,
  url: siteConfig.steamUrl,
};

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteConfig.url).toString(),
    })),
  };
}
