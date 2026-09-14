import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { SourceBox } from "@/components/common/SourceBox";
import { UpgradeCard } from "@/components/common/UpgradeCard";
import { builds, getRelatedUpgrades, getSources } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import type { Build } from "@/types/content";
import styles from "@/style/page/builds/build-detail.module.css";

export default function BuildDetailPage({ build }: { build: Build }) {
  const core = getRelatedUpgrades(build.coreUpgrades);
  const sourceList = getSources(build.sourceIds);
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Builds",href:"/builds"},{label:build.shortName,href:`/builds/${build.slug}`}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Builds",href:"/builds"},{label:build.shortName}]}/></div>
      <header className={`container ${styles.hero}`}>
        <span className={styles.heroIcon}><Icon name={build.icon} size={43}/></span>
        <div><span className={styles.eyebrow}>SCARLET SKIPS BUILD</span><h1>{build.name}</h1><p>{build.description}</p><div className={styles.badges}><SourceBadge status={build.sourceStatus}/><VersionBadge version={build.verifiedVersion}/><span>{build.difficulty}</span></div></div>
      </header>
      <div className={`container ${styles.layout}`}>
        <article className={styles.content}>
          <section><h2><Icon name="target" size={25}/>Build overview</h2><div className={styles.overviewGrid}><div><span>Goal</span><strong>{build.goal}</strong></div><div><span>Strength</span><strong>{build.strength}</strong></div><div><span>Weakness</span><strong>{build.weakness}</strong></div></div></section>
          <section><h2><Icon name="controller" size={25}/>Who this build is for</h2><p>{build.audience}</p></section>
          <section><h2><Icon name="cards" size={25}/>Core upgrades</h2><div className={styles.upgradeGrid}>{core.map((upgrade, index) => <div key={upgrade.slug}><span>Priority {index + 1}</span><UpgradeCard upgrade={upgrade}/></div>)}</div><p className={styles.note}>This is a preference order, not a guaranteed route. Each level-up draws three random choices.</p></section>
          <section><h2><Icon name="route" size={25}/>Run phases</h2><div className={styles.phaseGrid}>{(["early","mid","late"] as const).map((phase) => <article key={phase}><span>{phase} game</span><h3>{phase === "early" ? "Build the base" : phase === "mid" ? "Connect the engine" : "Protect the result"}</h3><ul>{build.phases[phase].map((item) => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul></article>)}</div></section>
          {build.runSignals && <section><h2><Icon name="gauge" size={25}/>Run-state signals</h2><p>These are decision signals from the cited routes, not hidden numeric requirements.</p><div className={styles.signalGrid}>{build.runSignals.map((signal, index) => <article key={signal}><span>{String(index + 1).padStart(2,"0")}</span><p>{signal}</p></article>)}</div></section>}
          {build.fallbackRules && <section><h2><Icon name="arrow" size={25}/>If the cards do not cooperate</h2><ul className={styles.checkList}>{build.fallbackRules.map((item) => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul>{build.evidenceNote && <p className={styles.evidenceNote}><strong>Evidence note:</strong> {build.evidenceNote}</p>}</section>}
          <section><h2><Icon name="spark" size={25}/>Recommended synergies</h2><p>{core.map((upgrade) => upgrade.shortName).join(" + ")} forms the intended core. The exact order can change when a stabilizing card is more urgent than the highest theoretical priority.</p></section>
          <section className={styles.avoid}><h2><Icon name="x" size={25}/>What to avoid</h2><ul>{build.avoid.map((item) => <li key={item}><Icon name="x" size={16}/>{item}</li>)}</ul></section>
          <section><h2><Icon name="info" size={25}/>Common mistakes</h2><ul className={styles.checkList}>{build.mistakes.map((item) => <li key={item}><Icon name="info" size={16}/>{item}</li>)}</ul></section>
          <section><h2><Icon name="arrow" size={25}/>Alternative choices</h2><ul className={styles.checkList}>{build.alternatives.map((item) => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul></section>
          <SourceBox sources={sourceList} version={build.verifiedVersion}/>
        </article>
        <aside className={styles.sidebar}>
          <section><h2><Icon name="flask" size={21}/>Run Lab</h2><p>Load this goal into the planner, add your real stacks and see what the current run is missing.</p><Link href={`/run-lab/build-planner?goal=${build.slug.includes("ending") ? "ending" : build.slug.includes("high-score") ? "high-score" : build.slug.includes("beginner") ? "beginner" : build.slug.includes("rocket") ? "airtime" : "fun"}`}>Open planner <Icon name="arrow" size={16}/></Link></section>
          <section><h2><Icon name="cards" size={21}/>Core cards</h2><nav>{core.map((upgrade) => <Link key={upgrade.slug} href={`/upgrades/${upgrade.slug}`}><Icon name={upgrade.icon} size={18}/><span>{upgrade.shortName}</span><Icon name="arrow" size={14}/></Link>)}</nav></section>
          <section><h2><Icon name="book" size={21}/>Related guides</h2><nav><Link href="/guides/beginner-guide"><Icon name="controller" size={18}/><span>Beginner Guide</span><Icon name="arrow" size={14}/></Link><Link href="/ending"><Icon name="route" size={18}/><span>Ending Guide</span><Icon name="arrow" size={14}/></Link><Link href="/high-score"><Icon name="trophy" size={18}/><span>High Score Guide</span><Icon name="arrow" size={14}/></Link></nav></section>
          <section><h2><Icon name="target" size={21}/>Other builds</h2><nav>{builds.filter((item) => item.slug !== build.slug).slice(0,4).map((item) => <Link key={item.slug} href={`/builds/${item.slug}`}><Icon name={item.icon} size={18}/><span>{item.shortName}</span><Icon name="arrow" size={14}/></Link>)}</nav></section>
        </aside>
      </div>
    </main>
  );
}
