import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import LegalPage, { legalPages } from "@/page/legal/LegalPage";
import { siteConfig } from "@/config/site";

describe("legal pages", () => {
  it("keeps five distinct pages with useful sections and working in-page links", () => {
    expect(Object.keys(legalPages).sort()).toEqual(["about", "contact", "copyright", "privacy", "terms"]);
    for (const slug of Object.keys(legalPages)) {
      const page = legalPages[slug];
      const html = renderToStaticMarkup(<LegalPage slug={slug} />);
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
      expect(html).toContain(`<h1>${page.title}</h1>`);
      expect(html).toContain(`href="mailto:${siteConfig.email}"`);
      for (const section of page.sections) {
        const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        expect(html).toContain(`id="${id}"`);
        expect(html).toContain(`href="#${id}"`);
      }
    }
  });

  it("describes implemented behavior without inventing a team or a game formula", () => {
    const about = renderToStaticMarkup(<LegalPage slug="about" />);
    expect(about).toContain("teaching model");
    expect(about).toContain(siteConfig.guideAuthor);
    expect(about).toContain('id="who-writes-the-guides"');
    expect(about).not.toContain("founded in early 2026");
    const privacy = renderToStaticMarkup(<LegalPage slug="privacy" />);
    expect(privacy).toContain("current page&#x27;s memory");
    expect(privacy).toContain("youtube-nocookie.com");
    expect(privacy).toContain("hosting request records");
    expect(privacy).toContain("Google Analytics 4");
    expect(privacy).toContain("G-3X3KCESZZJ");
    expect(privacy).not.toContain("does not add a site-operated analytics");
  });
});
