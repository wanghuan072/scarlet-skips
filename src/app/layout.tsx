import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { siteConfig } from "@/config/site";
import "@/style/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Scarlet Skips Guide, Builds & Run Lab", template: "%s | Scarlet Skips Lab" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Scarlet Skips", "Scarlet Skips guide", "Scarlet Skips upgrades", "Scarlet Skips builds", "Scarlet Skips ending"],
  authors: [{ name: "Scarlet Skips Lab" }],
  creator: "Scarlet Skips Lab",
  category: "games",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6fbff", colorScheme: "light" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><AppHeader/>{children}<AppFooter/></body></html>;
}
