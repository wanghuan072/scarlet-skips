import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AppFooter } from "@/components/layout/AppFooter";
import { primaryNavigation, siteNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { guides, updates, upgrades } from "@/lib/data/content";
import sitemap from "@/app/sitemap";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

describe("fixed page SEO", () => {
  it("covers each fixed route with distinct, useful copy", () => {
    const paths = ["/", ...primaryNavigation.map(({ href }) => href), "/game-info", ...siteNavigation.map(({ href }) => href), "/search"];
    expect(Object.keys(pageTdk).sort()).toEqual([...new Set(paths)].sort());
    expect(new Set(Object.values(pageTdk).map(({ title }) => title)).size).toBe(Object.keys(pageTdk).length);
    for (const [path, copy] of Object.entries(pageTdk)) {
      expect(copy.title).toContain("Scarlet Skips");
      expect(copy.description).toContain("Scarlet Skips");
      expect(copy.title.length, path).toBeGreaterThanOrEqual(35);
      expect(copy.description.length, path).toBeGreaterThanOrEqual(120);
    }
  });

  it("indexes production pages and uses the shared absolute image", () => {
    const metadata = createMetadata({ ...pageTdk["/"], path: "/" });
    expect((metadata.robots as { index: boolean }).index).toBe(true);
    expect(siteConfig.url).toBe("https://scarletskips.org");
    expect(siteConfig.email).toBe("wyong@scarletskips.org");
    expect(metadata.alternates?.canonical).toBe(siteConfig.url + "/");
    expect(JSON.stringify(metadata.openGraph)).toContain(siteConfig.url + "/images/og-image.png");
    expect(JSON.stringify(metadata.openGraph)).toContain(String(siteConfig.ogImageWidth));
    const search = createMetadata({ ...pageTdk["/search"], path: "/search", noIndex: true });
    expect((search.robots as { follow: boolean }).follow).toBe(false);
  });

  it("includes detail records while omitting invented fixed-page dates", () => {
    const entries = sitemap();
    const byUrl = new Map(entries.map((entry) => [entry.url, entry]));
    expect(byUrl.has(siteConfig.url + "/search")).toBe(false);
    expect(byUrl.get(siteConfig.url + "/privacy")?.lastModified).toBeUndefined();
    for (const guide of guides) expect(byUrl.get(`${siteConfig.url}/guides/${guide.slug}`)?.lastModified).toBe(guide.updatedDate);
    for (const upgrade of upgrades) expect(byUrl.get(`${siteConfig.url}/upgrades/${upgrade.slug}`)?.lastModified).toBe(upgrade.updatedDate);
    for (const update of updates) expect(byUrl.get(`${siteConfig.url}/updates/${update.slug}`)?.lastModified).toBe(update.updatedDate);
    expect(entries).toEqual(sitemap());
  });

  it("uses the same primary navigation in the footer, plus five legal links", () => {
    const html = renderToStaticMarkup(<AppFooter />);
    for (const item of [...primaryNavigation, ...siteNavigation]) expect(html).toContain(`href="${item.href}"`);
    expect(siteNavigation).toHaveLength(5);
    expect(html).toContain(`Copyright © ${new Date().getUTCFullYear()}`);
    expect(html).toContain(`mailto:${siteConfig.email}`);
    expect(html).not.toContain("nofollow");
  });
});
