import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { SourcesList } from "@/components/common/SourcesList";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { siteConfig } from "@/config/site";
import type { UpdateEntry } from "@/types/content";
import styles from "@/style/page/content/content.module.css";

export default function UpdateDetailPage({ entry }: { entry: UpdateEntry }) {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Updates", href: "/updates" }, { label: `Version ${entry.version}`, href: `/updates/${entry.slug}` }])}/>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: entry.title, description: entry.summary, datePublished: new Date(entry.date).toISOString().slice(0, 10), dateModified: entry.updatedDate, mainEntityOfPage: new URL(`/updates/${entry.slug}`, siteConfig.url).toString() }}/>
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Updates", href: "/updates" }, { label: `Version ${entry.version}` }]}/></div>
      <PageHero
        eyebrow={entry.date}
        title={entry.title}
        description={entry.summary}
        image="/images/official/screenshot-6.jpg"
        imageAlt="Official Scarlet Skips screenshot of a jump rope breaking into segments"
        imageCaption="Game screenshot. The listed changes come from the patch announcement."
        facts={[{ label: "Version", value: `v${entry.version}` }]}
        actions={[{ href: "/updates", label: "All updates" }]}
      />
      <div className={`container ${styles.singleArticle}`}>
        <article className={styles.article}>
          <section>
            <div className={styles.sectionTitle}>
              <span><Icon name="spark" size={23}/></span>
              <div><p className={styles.kicker}>THE PATCH IN PLAIN ENGLISH</p><h2>What changed?</h2></div>
            </div>
            <ul className={styles.patchList}>{entry.changes.map((change) => <li key={change}><Icon name="check" size={18}/>{change}</li>)}</ul>
          </section>
          <div className={styles.impactGrid}>
            <section><span><Icon name="flask" size={22}/></span><h2>Do I need to change my build?</h2><p>{entry.buildImpact}</p></section>
            <section><span><Icon name="book" size={22}/></span><h2>Which advice should I re-check?</h2><p>{entry.guideImpact}</p></section>
          </div>
          <section className={styles.versionNotice}>
            <Icon name="info" size={22}/>
            <div>
              <h2>What is still unknown?</h2>
              <p>The patch does not list card values, formulas or every edge case it fixed. If a strategy depends on Rocket Shoes or extinguished ropes, test it once before trusting an older run — then check the <Link href="/guides/tips">tips page</Link> against the new build.</p>
            </div>
          </section>
          <nav className={styles.bottomNav}>
            <Link href="/updates"><Icon name="arrow" size={16}/>Back to updates</Link>
            <Link href="/upgrades">Check the upgrade guides <Icon name="arrow" size={16}/></Link>
          </nav>
        </article>
      </div>
      <SourcesList ids={entry.sourceIds} />
    </main>
  );
}
