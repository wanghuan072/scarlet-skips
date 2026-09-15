import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { UpgradeCard } from "@/components/common/UpgradeCard";
import { getRelatedUpgrades, upgrades } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/upgrades/upgrade-detail.module.css";

export default function UpgradeDetailPage({ upgrade }: { upgrade: Upgrade }) {
  const related = getRelatedUpgrades(upgrade.synergies);
  const currentIndex = upgrades.findIndex((item) => item.slug === upgrade.slug);
  const previous = upgrades[(currentIndex - 1 + upgrades.length) % upgrades.length];
  const next = upgrades[(currentIndex + 1) % upgrades.length];
  const crumbs = [{label:"Home",href:"/"},{label:"Upgrades",href:"/upgrades"},{label:upgrade.name,href:`/upgrades/${upgrade.slug}`}];
  const decisionChecks = upgrade.decisionChecks ?? upgrade.tips;

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema(crumbs)}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Upgrades",href:"/upgrades"},{label:upgrade.name}]}/></div>

      <header className={`container ${styles.upgradeHero}`}>
        <div className={styles.identity}><span className={styles.upgradeIcon} data-tone={upgrade.color}><Icon name={upgrade.icon} size={46}/></span><div><p>{upgrade.category} CARD</p><h1>{upgrade.name}</h1><span>{upgrade.description}</span></div></div>
        <div className={styles.effectCard}>
          <p>WHAT THIS CARD DOES</p><strong>{upgrade.effect}</strong><span>{upgrade.exactValues}</span>
          <div><SourceBadge status={upgrade.sourceStatus}/><VersionBadge version={upgrade.verifiedVersion}/></div>
        </div>
      </header>

      <div className={`container ${styles.detailGrid}`}>
        <article className={styles.mainColumn}>
          <section className={styles.answerPanel} id="what-it-does">
            <div className={styles.sectionHeading}><span><Icon name="target" size={24}/></span><div><p>THE PLAYER ANSWER</p><h2>What do I get when I take it?</h2></div></div>
            <p className={styles.answerLead}>{upgrade.whatItDoes[0]}</p>
            <ul>{upgrade.whatItDoes.slice(1).map((item) => <li key={item}><Icon name="check" size={17}/>{item}</li>)}</ul>
          </section>

          <section className={styles.statSection} id="stacks">
            <div className={styles.sectionHeading}><span><Icon name="cards" size={24}/></span><div><p>LEVELS AND STACKS</p><h2>What does each extra pick add?</h2></div></div>
            <div className={styles.statCards}>
              <article><span>PER PICK / STACK</span><strong>{upgrade.exactValues}</strong><p>Only published or visibly confirmed values belong here. A missing formula stays marked as unknown.</p></article>
              <article><span>CAN IT STACK?</span><strong>{upgrade.stackable}</strong><p>{upgrade.stackingNote}</p></article>
              <article><span>BEST WINDOW</span><strong>{upgrade.bestTiming} run</strong><p>{decisionChecks[0]}</p></article>
            </div>
          </section>

          <section className={styles.contentSection} id="when-to-pick">
            <div className={styles.sectionHeading}><span><Icon name="gauge" size={24}/></span><div><p>WHEN TO TAKE IT</p><h2>Does it help this part of your run?</h2></div></div>
            <div className={styles.stageGrid}>
              <article><span>EARLY</span><h3>First few levels</h3><p>{upgrade.stages.early}</p></article>
              <article><span>MID</span><h3>Once the run settles</h3><p>{upgrade.stages.mid}</p></article>
              <article><span>LATE</span><h3>Long-run scaling</h3><p>{upgrade.stages.late}</p></article>
            </div>
          </section>

          <section className={styles.contentSection} id="pairs">
            <div className={styles.sectionHeading}><span><Icon name="spark" size={24}/></span><div><p>GOOD PAIRS</p><h2>What should I take with it?</h2></div></div>
            <p className={styles.sectionIntro}>These are the cards that give this upgrade a clearer job in the same run.</p>
            <div className={styles.synergyGrid}>{related.map((item) => <UpgradeCard key={item.slug} upgrade={item} compact/>)}</div>
          </section>

          <section className={styles.contentSection} id="skip">
            <div className={styles.skipPanel}><div className={styles.sectionHeading}><span><Icon name="x" size={24}/></span><div><p>DO NOT AUTO-PICK</p><h2>When should I leave it?</h2></div></div><ul>{upgrade.avoid.map((item) => <li key={item}><Icon name="x" size={17}/>{item}</li>)}</ul></div>
          </section>

          <figure className={styles.gameplayFigure}><div><Image src={upgrade.image} alt={upgrade.imageAlt} fill sizes="(max-width: 768px) 100vw, 820px"/></div><figcaption>{upgrade.imageCaption}</figcaption></figure>

          {upgrade.knownUnknowns && <details className={styles.evidenceDetails}>
            <summary><span><Icon name="shield" size={21}/>What is confirmed, and what is still unknown?</span><Icon name="plus" size={18}/></summary>
            <div><ul>{upgrade.knownUnknowns.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </details>}

          <nav className={styles.bottomNav} aria-label="Previous and next upgrades">
            <Link href={`/upgrades/${previous.slug}`}><span>Previous</span><strong>← {previous.shortName}</strong></Link>
            <Link href="/upgrades"><span>All cards</span><strong>Back to upgrades</strong></Link>
            <Link href={`/upgrades/${next.slug}`}><span>Next</span><strong>{next.shortName} →</strong></Link>
          </nav>
        </article>

        <aside className={styles.sidebar}>
          <section className={styles.pickNow}><p>GOT THIS IN A DRAW?</p><strong>{upgrade.name}</strong><span>Open the simulator and see how this card changes a full run.</span><Link href="/builds#simulator">Try it in a run <Icon name="arrow" size={16}/></Link></section>
          <nav aria-label="On this page"><span>ON THIS PAGE</span><a href="#what-it-does">What it does</a><a href="#stacks">Levels and stacks</a><a href="#when-to-pick">When to take it</a><a href="#pairs">Good pairs</a><a href="#skip">When to skip it</a></nav>
          <section className={styles.remember}><h2><Icon name="spark" size={20}/>Quick reminder</h2><ul>{upgrade.tips.slice(0,3).map((tip) => <li key={tip}><Icon name="check" size={16}/>{tip}</li>)}</ul></section>
        </aside>
      </div>
    </main>
  );
}
