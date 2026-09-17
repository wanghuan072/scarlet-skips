import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { game, updates } from "@/lib/data/content";
import styles from "@/style/page/content/content.module.css";

const kindLabel = { hotfix: "Hotfix", launch: "Launch" } as const;

export default function UpdatesPage() {
  const latest = updates[0];

  return (
    <main id="main-content">
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Updates" }]}/></div>
      <PageHero
        eyebrow="PATCH RECORD"
        titlePrefix="Scarlet Skips Updates"
        title="What Steam has actually posted"
        description="The Steam news feed for Scarlet Skips currently has one official post: hotfix 1.0.1. We also keep a launch record from the store page so you can date an older clip."
        image="/images/official/steam-header-2x.jpg"
        imageAlt="Scarlet Skips key art with the logo and Scarlet"
        imageCaption="Key art. The dated records below come from Steam."
        facts={[
          { label: "Steam news", value: "1 post" },
          { label: "Latest", value: latest ? `v${latest.version}` : "—" },
          { label: "Launch", value: "Sep 3" },
        ]}
        actions={[{ href: "https://store.steampowered.com/news/app/4513480/view/675130991105280354", label: "Open the 1.0.1 notes", external: true }]}
      />
      <div className={`container ${styles.updateLayout}`}>
        <div>
          <section className={styles.leadCard}>
            <p className={styles.kicker}>WHAT WE CHECKED</p>
            <h2>One hotfix. No later notes.</h2>
            <p>
              On September 17, 2026, Steam’s news API for app 4513480 returned a single item: <Link href="/updates/1-0-1">Patch Notes for Scarlet Skips 1.0.1</Link>, posted by YerkDiff on September 8. There is no 1.0.2 post, and no separate launch patch-notes post. If a newer official announcement appears, it belongs here before we change card advice.
            </p>
          </section>
          <section className={styles.timeline} aria-labelledby="update-history">
            <h2 id="update-history" className="sr-only">Update history</h2>
            {updates.map((entry) => (
              <article key={entry.slug}>
                <div className={styles.timelineRail}><span/><i/></div>
                <div className={styles.updateCard}>
                  <div className={styles.updateMeta}>
                    <span>v{entry.version}</span>
                    <b>{kindLabel[entry.kind]}</b>
                    <time>{entry.date}</time>
                  </div>
                  <h2>{entry.title}</h2>
                  <p>{entry.summary}</p>
                  <ul>
                    {entry.officialLines.slice(1, 4).map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <Link href={`/updates/${entry.slug}`}>What does this change for my run? <Icon name="arrow" size={17}/></Link>
                </div>
              </article>
            ))}
          </section>
        </div>
        <aside className={styles.updateAside}>
          <section>
            <Icon name="shield" size={27}/>
            <h2>Guide baseline: v{game.currentVersion}</h2>
            <p>Card and route pages are written for this version. Hotfix 1.0.1 names Rocket Shoes and Extinguished Ropes. Recheck <Link href="/upgrades/upgrade-rocket-fuel">Rocket Fuel</Link> or <Link href="/upgrades/extinguish-jump-rope">Extinguish Jump Rope</Link> before copying a launch-week clip. The patch does not publish card values.</p>
          </section>
          <section>
            <Icon name="rocket" size={27}/>
            <h2>Systems the hotfix names</h2>
            <p>Only these two gameplay names appear in the official 1.0.1 list. Everything else in that post is settings, background art, or unnamed QOL.</p>
            <nav>
              <Link href="/upgrades/upgrade-rocket-fuel">Rocket Shoes</Link>
              <Link href="/upgrades/extinguish-jump-rope">Extinguished Ropes</Link>
            </nav>
          </section>
          <section>
            <Icon name="info" size={27}/>
            <h2>Missing a newer post?</h2>
            <p>If Yerk Games publishes another Steam news item, send the link with the version number. We will not invent a patch from a rumor or a SteamDB depot with no notes.</p>
            <Link href="/contact">Contact the site</Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
