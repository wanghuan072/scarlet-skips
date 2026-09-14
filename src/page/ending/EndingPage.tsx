import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { SourceBox } from "@/components/common/SourceBox";
import { getBuild, getRelatedUpgrades, getSources } from "@/lib/data/content";
import { SpoilerPanel } from "@/page/ending/components/SpoilerPanel";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/content/content.module.css";

const steps = [
  ["Use the first levels for progression", "For roughly the first five levels, the cited route uses Luck, rope count or speed to accelerate growth—but stops before the pattern becomes unmanageable."],
  ["Let surplus ropes go", "Instead of protecting every early rope, the player intentionally allows the set to shrink until the pattern is easier to control."],
  ["Reinforce before the height push", "Protect the smaller active set first. This keeps rope maintenance from interrupting repeated Jump Height choices."],
  ["Build height and Luck", "Stack Increase Jump Height and Increase Luck. One successful run reported about 50,000 height, but no official source identifies a required number."],
  ["Add fuel for control and faster levels", "Take Upgrade Rocket Fuel once longer airtime can reach several loops or another upgrade; confirm the gauge behavior on version 1.0.1."],
  ["Keep the ending route clean", "Avoid Ignite Jump Rope on the documented player route. Fire belongs more naturally in score-focused runs."],
  ["Watch for the reported trigger", "The community guide identifies the Super Rocket Shoes state as the signal that the ending sequence can begin."],
];

export default function EndingPage() {
  const endingBuild = getBuild("ending-build")!;
  const core = getRelatedUpgrades(endingBuild.coreUpgrades);
  const sources = getSources(endingBuild.sourceIds);

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Ending Guide",href:"/ending"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Ending Guide"}]}/></div>
      <header className={styles.featureHero}>
        <Image src="/images/editorial/ending-hero.webp" alt="Editorial illustration of Scarlet using Rocket Shoes to ascend toward the Moon" fill priority sizes="100vw"/>
        <div className={styles.heroShade}/>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadges}><SourceBadge status="Player Report"/><VersionBadge version="1.0.1"/></div>
          <p className={styles.eyebrow}>SPOILER-LIGHT COMPLETION GUIDE</p>
          <h1>Scarlet Skips Ending Guide</h1>
          <p>Follow the documented community route, understand which thresholds are only player observations and reveal the video-corroborated Moon ending only when you want the spoiler.</p>
          <Link href="/run-lab/ending-route">Open route tracker <Icon name="arrow" size={18}/></Link>
        </div>
      </header>
      <div className={`container ${styles.articleLayout}`}>
        <article className={styles.article}>
          <section className={styles.leadCard}>
            <span><Icon name="shield" size={28}/></span>
            <div><p className={styles.kicker}>SAFE TO READ</p><h2>The ending route without the reveal</h2><p>Community evidence and long-form gameplay confirm that Scarlet Skips has a complete ending. Yerk Games has not published an official walkthrough or numeric threshold, so the route order remains a practical player report even though the final sequence itself is visible on video.</p></div>
          </section>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="cards" size={23}/></span><div><p className={styles.kicker}>RECOMMENDED CORE</p><h2>Build for control, not fire</h2></div></div>
            <div className={styles.miniUpgradeGrid}>{core.map((upgrade, index) => <Link key={upgrade.slug} href={`/upgrades/${upgrade.slug}`} style={{"--card-color": upgrade.color} as CSSProperties}><small>Priority {index + 1}</small><span><Icon name={upgrade.icon} size={27}/></span><strong>{upgrade.shortName}</strong><p>{upgrade.effect}</p></Link>)}</div>
          </section>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="route" size={23}/></span><div><p className={styles.kicker}>STEP BY STEP</p><h2>Player-reported ending route</h2></div></div>
            <ol className={styles.routeSteps}>{steps.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </section>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="shield" size={23}/></span><div><p className={styles.kicker}>EVIDENCE CHECK</p><h2>What to trust in this route</h2></div></div>
            <div className={styles.phaseCards}>
              <article><span className={styles.phaseNumber}>01</span><span className={styles.phaseIcon}><Icon name="check" size={27}/></span><p className={styles.kicker}>CORROBORATED</p><h3>An ending exists</h3><p>Long-form footage shows the final ascent, Moon scene and credits.</p></article>
              <article><span className={styles.phaseNumber}>02</span><span className={styles.phaseIcon}><Icon name="route" size={27}/></span><p className={styles.kicker}>PLAYER ROUTE</p><h3>Card order</h3><p>Rope reduction, reinforcement, height, Luck and fuel come from a successful Steam guide.</p></article>
              <article><span className={styles.phaseNumber}>03</span><span className={styles.phaseIcon}><Icon name="info" size={27}/></span><p className={styles.kicker}>NOT A REQUIREMENT</p><h3>50,000 height</h3><p>The number describes one author&apos;s run; no official threshold is published.</p></article>
            </div>
          </section>
          <SpoilerPanel/>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="x" size={23}/></span><div><p className={styles.kicker}>RUN SAVERS</p><h2>Common ending-route mistakes</h2></div></div>
            <ul className={styles.calloutList}><li><Icon name="x" size={17}/><span><strong>Following a high-score script.</strong> An ending attempt does not need early fire or maximum rope pressure.</span></li><li><Icon name="x" size={17}/><span><strong>Protecting every rope forever.</strong> The published route intentionally simplifies the set before reinforcing it.</span></li><li><Icon name="x" size={17}/><span><strong>Taking height before stabilizing.</strong> The route reinforces the smaller set before farming height so rope loss does not interrupt the push.</span></li><li><Icon name="x" size={17}/><span><strong>Trusting an exact height target.</strong> Community numbers are observations, not official thresholds.</span></li><li><Icon name="x" size={17}/><span><strong>Ignoring a vulnerable last rope.</strong> If a single unprotected rope remains, add or reinforce rather than gambling the entire route.</span></li></ul>
          </section>
          <SourceBox sources={sources} version="1.0.1"/>
        </article>
        <aside className={styles.stickyAside}>
          <section><p className={styles.kicker}>QUICK ROUTE</p><h2>Ending checklist</h2><ul><li><Icon name="check" size={16}/>Manageable early pressure</li><li><Icon name="check" size={16}/>Smaller reinforced rope set</li><li><Icon name="check" size={16}/>Height + Luck foundation</li><li><Icon name="check" size={16}/>Rocket Fuel late</li><li><Icon name="x" size={16}/>No fire on cited route</li></ul><Link href="/builds/ending-build">View full ending build <Icon name="arrow" size={16}/></Link></section>
          <section><p className={styles.kicker}>NEXT TOOLS</p><nav><Link href="/run-lab/ending-route"><Icon name="route" size={18}/>Ending Route Tracker</Link><Link href="/run-lab/build-planner"><Icon name="flask" size={18}/>Build Planner</Link><Link href="/guides/secrets"><Icon name="spark" size={18}/>Secrets &amp; Mechanics</Link></nav></section>
        </aside>
      </div>
    </main>
  );
}
