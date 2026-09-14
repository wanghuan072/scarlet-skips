import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { UpgradeCard } from "@/components/common/UpgradeCard";
import { getRelatedBuilds, getRelatedUpgrades, getSources, upgrades } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/upgrades/upgrade-detail.module.css";

export default function UpgradeDetailPage({ upgrade }: { upgrade: Upgrade }) {
  const related = getRelatedUpgrades(upgrade.synergies);
  const relatedBuilds = getRelatedBuilds(upgrade.builds);
  const sourceList = getSources(upgrade.sourceIds);
  const currentIndex = upgrades.findIndex((item) => item.slug === upgrade.slug);
  const previous = upgrades[(currentIndex - 1 + upgrades.length) % upgrades.length];
  const next = upgrades[(currentIndex + 1) % upgrades.length];
  const crumbs = [{label:"Home",href:"/"},{label:"Upgrades",href:"/upgrades"},{label:upgrade.name,href:`/upgrades/${upgrade.slug}`}];

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema(crumbs)}/>
      <section className={styles.banner}><Image src="/images/editorial/upgrades-hero.webp" alt="Editorial illustration of Scarlet and three upgrade choices" fill priority sizes="100vw"/><div className={`container ${styles.bannerCopy}`}><span>SCARLET SKIPS DATABASE</span><strong>Upgrades</strong><p>Discover every verified upgrade, compare effects and find the best combinations.</p></div></section>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Upgrades",href:"/upgrades"},{label:upgrade.name}]}/></div>
      <div className={`container ${styles.detailGrid}`}>
        <aside className={styles.leftRail} aria-label="Upgrade navigation">
          <div className={styles.leftSidebar}>
            <div className={styles.sidebarTitle}><Icon name="cards" size={22}/><h2>Upgrades</h2></div>
            <nav><Link href="/upgrades">All documented cards</Link>{upgrades.map((item) => <Link key={item.slug} href={`/upgrades/${item.slug}`} aria-current={item.slug === upgrade.slug ? "page" : undefined}><Icon name={item.icon} size={18}/>{item.shortName}</Link>)}<Link href="/upgrades/best-upgrades"><Icon name="target" size={18}/>Best by goal</Link></nav>
          </div>
          <Link className={styles.sidePromo} href="/upgrades"><Image src="/images/editorial/home-hero-v2.webp" alt="Editorial illustration of Scarlet skipping in the park" fill sizes="188px"/><span>More upgrades.<br/>More possibilities.</span></Link>
        </aside>

        <article className={styles.mainColumn}>
          <header className={styles.upgradeHeader}>
            <span className={styles.upgradeIcon} data-tone={upgrade.color}><Icon name={upgrade.icon} size={43}/></span>
            <div><h1>{upgrade.name}</h1><p>{upgrade.description}</p><div className={styles.headerBadges}><span className={styles.category}>{upgrade.category}</span><SourceBadge status={upgrade.sourceStatus}/><VersionBadge version={upgrade.verifiedVersion}/></div></div>
          </header>
          <figure className={styles.gameplayFigure}><div><Image src={upgrade.image} alt={upgrade.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 650px"/></div><figcaption>{upgrade.imageCaption}</figcaption></figure>

          <section className={styles.contentSection}><h2><Icon name="info" size={25}/>What it does</h2><p>{upgrade.effect}</p><ul>{upgrade.whatItDoes.map((item) => <li key={item}><Icon name="check" size={17}/>{item}</li>)}</ul></section>
          <section className={styles.contentSection}><h2><Icon name="cards" size={25}/>How it stacks</h2><div className={styles.tableWrap}><table><thead><tr><th>Pick state</th><th>Observed effect</th><th>What is verified</th></tr></thead><tbody><tr><td>First pick</td><td>{upgrade.effect}</td><td>{upgrade.exactValues}</td></tr><tr><td>Repeated picks</td><td>{upgrade.stackable}</td><td>Exact numeric scaling has not been officially documented.</td></tr></tbody></table></div><p className={styles.tableNote}>{upgrade.stackingNote}</p></section>
          {upgrade.decisionChecks && <section className={styles.contentSection}><h2><Icon name="target" size={25}/>Decision checklist</h2><p>Use the current run state—not a fixed tier list—to decide whether this card solves the next problem.</p><div className={styles.decisionGrid}>{upgrade.decisionChecks.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2,"0")}</span><p>{item}</p></article>)}</div></section>}
          <section className={styles.contentSection}><h2><Icon name="spark" size={25}/>Best synergies</h2><div className={styles.synergyGrid}>{related.map((item) => <UpgradeCard key={item.slug} upgrade={item} compact/>)}</div></section>
          <section className={styles.contentSection}><h2><Icon name="gauge" size={25}/>When to pick this upgrade</h2><div className={styles.stageGrid}><article><span>EARLY GAME</span><h3>Build the base</h3><p>{upgrade.stages.early}</p></article><article><span>MID GAME</span><h3>Shape the run</h3><p>{upgrade.stages.mid}</p></article><article><span>LATE GAME</span><h3>Protect the loop</h3><p>{upgrade.stages.late}</p></article></div></section>
          <section className={`${styles.contentSection} ${styles.avoidSection}`}><h2><Icon name="x" size={25}/>When to avoid it</h2><ul>{upgrade.avoid.map((item) => <li key={item}><Icon name="x" size={16}/>{item}</li>)}</ul></section>
          {upgrade.knownUnknowns && <section className={`${styles.contentSection} ${styles.evidenceSection}`}><h2><Icon name="shield" size={25}/>Evidence and open questions</h2><ul>{upgrade.knownUnknowns.map((item) => <li key={item}><Icon name="info" size={16}/>{item}</li>)}</ul></section>}
          <nav className={styles.bottomNav} aria-label="Previous and next upgrades"><Link href={`/upgrades/${previous.slug}`}><span>Previous</span><strong>← {previous.shortName}</strong></Link><Link href="/upgrades"><span>Database</span><strong>All upgrades</strong></Link><Link href={`/upgrades/${next.slug}`}><span>Next</span><strong>{next.shortName} →</strong></Link></nav>
        </article>

        <aside className={styles.rightSidebar}>
          <section><h2><Icon name="info" size={22}/>Upgrade info</h2><dl><div><dt>Type</dt><dd>{upgrade.category}</dd></div><div><dt>Status</dt><dd>{upgrade.sourceStatus}</dd></div><div><dt>Appears in</dt><dd>Level-up selection</dd></div><div><dt>Stackable</dt><dd>{upgrade.stackable.startsWith("Yes") ? "Yes" : "Observed"}</dd></div><div><dt>Best timing</dt><dd>{upgrade.bestTiming} game</dd></div><div><dt>Game version</dt><dd>{upgrade.verifiedVersion}</dd></div><div><dt>Source</dt><dd>{sourceList.some((source) => source.type === "official") ? "Official media + guides" : "Community guide"}</dd></div></dl></section>
          <section className={styles.tips}><h2><Icon name="spark" size={22}/>Quick tips</h2><ul>{upgrade.tips.map((tip) => <li key={tip}><Icon name="check" size={16}/>{tip}</li>)}</ul></section>
          <section><h2><Icon name="cards" size={22}/>Related upgrades</h2><div className={styles.relatedList}>{related.slice(0,4).map((item) => <UpgradeCard key={item.slug} upgrade={item} compact/>)}</div></section>
          <section><h2><Icon name="book" size={22}/>Related guides</h2><nav className={styles.guideLinks}>{relatedBuilds.map((build) => <Link key={build.slug} href={`/builds/${build.slug}`}><Icon name={build.icon} size={19}/><span><strong>{build.shortName}</strong><small>{build.goal}</small></span><Icon name="arrow" size={15}/></Link>)}<Link href="/lab/pick-my-upgrade"><Icon name="flask" size={19}/><span><strong>Pick My Upgrade</strong><small>Compare a live three-card choice</small></span><Icon name="arrow" size={15}/></Link></nav></section>
        </aside>
      </div>
    </main>
  );
}
