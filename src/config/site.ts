export const siteConfig = {
  name: "Scarlet Skips Hub",
  shortName: "Scarlet Skips",
  description:
    "Learn the jump, compare upgrade cards, plan a Moon or score run, and check what changed in Scarlet Skips.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scarlet-skips-gamma.vercel.app",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  steamUrl: "https://store.steampowered.com/app/4513480/Scarlet_Skips/",
  email: "wyong@scarletskips.test",
  ogImage: "/images/og-image.png",
} as const;
