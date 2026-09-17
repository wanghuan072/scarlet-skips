import { fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { guides, upgrades } from "@/lib/data/content";
import { destinations } from "@/lib/data/destinations";
import GuideDetailPage from "@/page/guides/GuideDetailPage";
import GuidesPage from "@/page/guides/GuidesPage";
import CharacterPage from "@/page/character/CharacterPage";
import { SpoilerPanel } from "@/page/ending/components/SpoilerPanel";
import HomePage from "@/page/home/HomePage";
import UpgradesPage from "@/page/upgrades/UpgradesPage";
import UpgradeDetailPage from "@/page/upgrades/UpgradeDetailPage";
import { UpgradeArt } from "@/components/common/UpgradeArt";
import { siteConfig } from "@/config/site";

describe("player-question additions", () => {
  it("keeps every guide and adds destination-specific answers", () => {
    expect(guides).toHaveLength(6);
    const headings = (slug: string) => guides.find((guide) => guide.slug === slug)?.sections.map((section) => section.heading);
    expect(headings("how-to-play")).toContain("When an upgrade breaks your timing");
    expect(headings("high-score")).toContain("Compare personal bests without guessing");
    expect(headings("spectacle")).toContain("When the show stops being readable");
    expect(destinations.map((route) => route.kicker)).not.toContain("FASTEST ENDING");
    expect(destinations.map((route) => route.kicker)).not.toContain("HIGHEST SCORE");
  });

  it("uses real screenshots on the controls guide without restoring the removed quick links", () => {
    const hub = renderToStaticMarkup(<GuidesPage />);
    expect(hub).not.toContain("What happened in your run?");
    const howToPlay = guides.find((guide) => guide.slug === "how-to-play")!;
    expect(howToPlay.sections).toHaveLength(12);
    const detail = renderToStaticMarkup(<GuideDetailPage guide={howToPlay} />);
    expect(detail).toContain("IN-GAME SCREENSHOTS");
    expect(detail).toContain('id="section-5"');
    expect(detail).toContain("not three frames from one jump");
    for (const image of ["screenshot-1.jpg", "screenshot-4.jpg", "screenshot-7.jpg"]) expect(detail).toContain(image);
  });

  it("shows the named guide author and a month derived from each content date", () => {
    const hub = renderToStaticMarkup(<GuidesPage />);
    expect(hub).toContain(`Guides by <a href="/about#who-writes-the-guides">${siteConfig.guideAuthor}</a>`);
    expect(hub).toContain("Latest guide update");
    for (const guide of guides) {
      const html = renderToStaticMarkup(<GuideDetailPage guide={guide} />);
      const month = new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" })
        .format(new Date(`${guide.updatedDate}T00:00:00.000Z`));
      expect(html).toContain(`dateTime="${guide.updatedDate}"`);
      expect(html).toContain(`>${month}</time>`);
      expect(html).toContain(`"name":"${siteConfig.guideAuthor}"`);
    }
  });

  it("loads the ending player only after spoiler reveal and removes it when hidden", () => {
    render(<SpoilerPanel />);
    expect(screen.queryByTitle("Scarlet Skips ending gameplay footage on YouTube")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Reveal the Moon ending/i }));
    expect(screen.getByTitle("Scarlet Skips ending gameplay footage on YouTube").getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/FIMs9bPh8Lg");
    fireEvent.click(screen.getByRole("button", { name: /Hide ending details/i }));
    expect(screen.queryByTitle("Scarlet Skips ending gameplay footage on YouTube")).toBeNull();
  });

  it("places the new questions with their full answers", () => {
    const home = renderToStaticMarkup(<HomePage />);
    expect(home).toContain('href="/upgrades#card-count-title"');
    expect(home).toContain('href="/character#mature-content-title"');
    const cards = renderToStaticMarkup(<UpgradesPage />);
    expect(cards).toContain('id="card-count-title"');
    expect(cards).toContain("13 with a regular appear-after-level value");
    const character = renderToStaticMarkup(<CharacterPage />);
    expect(character).toContain('id="mature-content-title"');
    expect(character).toContain("suggestive themes");
    expect(character).toContain("Scarlet above the rope in an official gameplay screenshot");
  });

  it("names every upgrade in its H1 and gives card art a meaningful alt", () => {
    for (const upgrade of upgrades) {
      const html = renderToStaticMarkup(<UpgradeDetailPage upgrade={upgrade} />);
      expect(html).toContain("Scarlet Skips Upgrade");
      expect(html).toContain(upgrade.name);
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      const art = renderToStaticMarkup(<UpgradeArt slug={upgrade.slug} title={upgrade.gameTitle ?? upgrade.name} />);
      const image = new DOMParser().parseFromString(art, "text/html").querySelector("img");
      if (image) expect(image.getAttribute("alt")).toBe(`${upgrade.gameTitle ?? upgrade.name} card artwork in Scarlet Skips`);
      else expect(art).toContain(upgrade.gameTitle ?? upgrade.name);
      expect(art).not.toContain("sr-only");
    }
  });
});
