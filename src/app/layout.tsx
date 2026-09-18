/* eslint-disable @next/next/next-script-for-ga -- Keep the requested plain Google tag snippet without another package. */
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { siteConfig } from "@/config/site";
import { pageTdk } from "@/seo/tdk";
import { game } from "@/lib/data/content";
import { getSearchIndex } from "@/lib/data/search-index";
import "@/style/globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: pageTdk["/"].title,
  description: pageTdk["/"].description,
  robots: { index: siteConfig.indexable, follow: true },
  applicationName: siteConfig.name,
  keywords: ["Scarlet Skips", "Scarlet Skips guide", "Scarlet Skips character", "Scarlet Skips upgrades", "Scarlet Skips builds", "Scarlet Skips ending"],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  category: "games",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight }],
  },
  icons: {
    icon: [
      { url: "/images/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48 64x64" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f6fbff", colorScheme: "light" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}><head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-3X3KCESZZJ" />
    <script dangerouslySetInnerHTML={{ __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3X3KCESZZJ');
    ` }} />
  </head><body><a className="skip-link" href="#main-content">Skip to content</a><AppHeader version={game.currentVersion} searchIndex={getSearchIndex()}/>{children}<AppFooter/></body></html>;
}
