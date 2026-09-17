import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { siteConfig } from "@/config/site";
import { updates } from "@/lib/data/content";
import type { UpdateEntry } from "@/types/content";
import styles from "@/style/page/content/content.module.css";

const kindLabel = { hotfix: "Official hotfix", launch: "Steam launch" } as const;

export default function UpdateDetailPage({ entry }: { entry: UpdateEntry }) {
  const index = updates.findIndex((item) => item.slug === entry.slug);
  const newer = index > 0 ? updates[index - 1] : null;
  const older = index >= 0 && index < updates.length - 1 ? updates[index + 1] : null;
  const steamNews = entry.kind === "hotfix"
    ? "https://store.steampowered.com/news/app/4513480/view/675130991105280354"
    : "https://store.steampowered.com/app/4513480/Scarlet_Skips/";

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Updates", href: "/updates" }, { label: `Version ${entry.version}`, href: `/updates/${entry.slug}` }])}/>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: entry.title, description: entry.summary, datePublished: new Date(entry.date).toISOString().slice(0, 10), dateModified: entry.updatedDate, mainEntityOfPage: new URL(`/updates/${entry.slug}`, siteConfig.url).toString() }}/>
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Updates", href: "/updates" }, { label: `Version ${entry.version}` }]}/></div>
      <PageHero
        eyebrow={`${kindLabel[entry.kind]} · ${entry.date}`}
        titlePrefix="Scarlet Skips"
        title={entry.kind === "hotfix" ? "Hotfix 1.0.1" : "Steam launch"}
        description={entry.summary}
        image={entry.kind === "hotfix" ? "/images/official/screenshot-5.jpg" : "/images/official/screenshot-1.jpg"}
        imageAlt={entry.kind === "hotfix" ? "Official Scarlet Skips gameplay showing the Rocket Shoes state" : "Official Scarlet Skips gameplay showing Scarlet skipping in the park"}
        imageCaption={entry.kind === "hotfix" ? "Rocket Shoes are named in the hotfix. The screenshot is official Steam art, not a bug report." : "Launch-week park. The store page is the public 1.0.0 record."}
        facts={[
          { label: "Version", value: `v${entry.version}` },
          { label: "Date", value: entry.kind === "hotfix" ? "Sep 8" : "Sep 3" },
        ]}
        actions={[
          { href: steamNews, label: entry.kind === "hotfix" ? "Steam news post" : "Steam store page", external: true },
          { href: "/updates", label: "All updates", variant: "ghost" },
        ]}
      />
      <div className={`container ${styles.singleArticle}`}>
        <article className={styles.article}>
          <section>
            <div className={styles.sectionTitle}>
              <span><Icon name="spark" size={23}/></span>
              <div><p className={styles.kicker}>{entry.kind === "hotfix" ? "YERKDIFF’S POST" : "STORE LISTING"}</p><h2>{entry.kind === "hotfix" ? "What YerkDiff's hotfix post says" : "What the Steam store page says"}</h2></div>
            </div>
            <blockquote className={styles.officialQuote}>
              {entry.officialLines.map((line) => <p key={line}>{line}</p>)}
            </blockquote>
          </section>
          <section>
            <div className={styles.sectionTitle}>
              <span><Icon name="check" size={23}/></span>
              <div><p className={styles.kicker}>FOR A RUN</p><h2>What that means in practice</h2></div>
            </div>
            <ul className={styles.patchList}>{entry.changes.map((change) => <li key={change}><Icon name="check" size={18}/>{change}</li>)}</ul>
          </section>
          <div className={styles.impactGrid}>
            <section><span><Icon name="flask" size={22}/></span><h2>Do I need to change my build?</h2><p>{entry.buildImpact}</p></section>
            <section><span><Icon name="book" size={22}/></span><h2>Which advice should I re-check?</h2><p>{entry.guideImpact}</p></section>
          </div>
          {entry.related.length ? (
            <section>
              <div className={styles.sectionTitle}>
                <span><Icon name="route" size={23}/></span>
                <div><p className={styles.kicker}>OPEN NEXT</p><h2>Pages this record touches</h2></div>
              </div>
              <div className={styles.updateRelated}>
                {entry.related.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <strong>{item.label}</strong>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
          <section className={styles.versionNotice}>
            <Icon name="info" size={22}/>
            <div>
              <h2>What is still unpublished</h2>
              <p>
                {entry.kind === "hotfix"
                  ? "The post does not list card values, the old bug, every extra QOL change, or a 1.0.2 follow-up. If a score or Moon route depends on Rocket Shoes or putting fire out, test it on 1.0.1, then compare the "
                  : "There is no launch patch-notes post in the Steam news feed. Store copy is not a changelog. Five days later, "}
                {entry.kind === "hotfix" ? <Link href="/guides/tips">tips page</Link> : <Link href="/updates/1-0-1">hotfix 1.0.1</Link>}
                {entry.kind === "hotfix" ? " against the new build." : " named the first gameplay bugs."}
              </p>
            </div>
          </section>
          <nav className={styles.bottomNav}>
            {older ? <Link href={`/updates/${older.slug}`}><Icon name="arrow" size={16}/>{older.title}</Link> : <Link href="/updates"><Icon name="arrow" size={16}/>All updates</Link>}
            {newer ? <Link href={`/updates/${newer.slug}`}>{newer.title}<Icon name="arrow" size={16}/></Link> : <Link href="/upgrades">Card guides <Icon name="arrow" size={16}/></Link>}
          </nav>
        </article>
      </div>
    </main>
  );
}
