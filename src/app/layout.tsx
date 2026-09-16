import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { siteConfig } from "@/config/site";
import { pageTdk } from "@/seo/tdk";
import { game } from "@/lib/data/content";
import { getSearchIndex } from "@/lib/data/search-index";
import "@/style/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: pageTdk["/"].title,
  description: pageTdk["/"].description,
  robots: { index: siteConfig.indexable, follow: true },
  applicationName: siteConfig.name,
  keywords: ["Scarlet Skips", "Scarlet Skips guide", "Scarlet Skips character", "Scarlet Skips upgrades", "Scarlet Skips builds", "Scarlet Skips ending"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  category: "games",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6fbff", colorScheme: "light" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><AppHeader version={game.currentVersion} searchIndex={getSearchIndex()}/>{children}<AppFooter/></body></html>;
}
