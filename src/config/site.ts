export const siteConfig = {
  name: "Scarlet Skips Guide",
  shortName: "Scarlet Skips",
  description:
    "Scarlet Skips upgrades, beginner guides, goal-based builds, ending help, high-score strategies and transparent source labels.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scarletskips.guide",
  steamUrl: "https://store.steampowered.com/app/4513480/Scarlet_Skips/",
  email: "hello@scarletskips.guide",
  ogImage: "/images/editorial/home-hero-v2.webp",
} as const;
