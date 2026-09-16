import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { updates } from "@/lib/data/content";
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
                <ul>{entry.changes.slice(0, 3).map((change) => <li key={change}><Icon name="check" size={16}/>{change}</li>)}</ul>
                <Link href={`/updates/${entry.slug}`}>What does this change for my run? <Icon name="arrow" size={17}/></Link>
              </div>
            </article>
          ))}
        </section>
        <aside className={styles.updateAside}>
          <section><Icon name="shield" size={27}/><h2>Why the version matters</h2><p>Patch 1.0.1 mentions Rocket Shoes and extinguished ropes. If an older route depends on either one, check the current behavior before following it; the <Link href="/guides/tips">tips page</Link> helps diagnose a changed run.</p></section>
          <section><Icon name="info" size={27}/><h2>Found a newer patch?</h2><p>Send us the official announcement and we will re-check the affected guides.</p><Link href="/contact">Contact the site</Link></section>
        </aside>
      </div>
    </main>
  );
}
