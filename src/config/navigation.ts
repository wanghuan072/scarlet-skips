import type { IconName } from "@/types/content";

export const primaryNavigation = [
  { label: "Home", href: "/", icon: "home" as IconName },
  { label: "Character", href: "/character", icon: "person" as IconName },
  { label: "Guides", href: "/guides", icon: "book" as IconName },
  { label: "Upgrades", href: "/upgrades", icon: "cards" as IconName },
  { label: "Builds", href: "/builds", icon: "controller" as IconName },
  { label: "Ending", href: "/ending", icon: "rocket" as IconName },
  { label: "Mods", href: "/mods", icon: "flask" as IconName },
  { label: "Updates", href: "/updates", icon: "spark" as IconName },
] as const;

export const resourceNavigation = [
  { label: "Game Info", href: "/game-info" },
  { label: "High Score Guide", href: "/guides/high-score" },
  { label: "Achievement Guide", href: "/guides/achievement" },
  { label: "Steam Page", href: "https://store.steampowered.com/app/4513480/Scarlet_Skips/" },
] as const;

export const siteNavigation = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Copyright", href: "/copyright" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;
