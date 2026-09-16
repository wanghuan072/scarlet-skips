import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { game, updates } from "@/lib/data/content";
import styles from "@/style/page/content/content.module.css";

export default function UpdatesPage() {
  const latest = updates[0];

  return (
    <main id="main-content">
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Updates" }]}/></div>
      <PageHero
        eyebrow="PATCH NOTES"
        titlePrefix="Scarlet Skips Updates"
        title="What changed for your run"
        description="Read the available patch notes and see which card and route advice may need another look after an update."
        image="/images/official/steam-header-2x.jpg"
        imageAlt="Scarlet Skips key art with the logo and Scarlet"
        imageCaption="Key art. The patch changes are listed below."
        facts={[
          { label: "Notes", value: String(updates.length) },
          { label: "Latest", value: latest ? `v${latest.version}` : "—" },
        ]}
      />
      <div className={`container ${styles.updateLayout}`}>
        <section className={styles.timeline} aria-labelledby="update-history">
          <h2 id="update-history" className="sr-only">Update history</h2>
          {updates.map((entry) => (
            <article key={entry.slug}>
              <div className={styles.timelineRail}><span/><i/></div>
              <div className={styles.updateCard}>
                <div className={styles.updateMeta}><span>v{entry.version}</span><time>{entry.date}</time></div>
                <h2>{entry.title}</h2>
                <p>{entry.summary}</p>
                <Link href={`/updates/${entry.slug}`}>What does this change for my run? <Icon name="arrow" size={17}/></Link>
              </div>
            </article>
          ))}
        </section>
        <aside className={styles.updateAside}>
          <section><Icon name="shield" size={27}/><h2>Guide baseline: v{game.currentVersion}</h2><p>Our card and route advice is written for this version. Hotfix 1.0.1 mentions Rocket Shoes and extinguished ropes, so re-check <Link href="/upgrades/upgrade-rocket-fuel">Rocket Fuel</Link> or <Link href="/upgrades/extinguish-jump-rope">Extinguish Jump Rope</Link> before relying on an older player route. The patch does not publish new card values.</p></section>
          <section><Icon name="info" size={27}/><h2>Keep the patch record current</h2><p>If a newer official announcement is missing, send us its link so we can re-check the affected guides.</p><Link href="/contact">Contact the site</Link></section>
        </aside>
      </div>
    </main>
  );
}
