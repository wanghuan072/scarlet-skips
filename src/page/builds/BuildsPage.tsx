import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { BuildCard } from "@/components/common/BuildCard";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { builds, game } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/builds/builds.module.css";

export default function BuildsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Builds",href:"/builds"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Builds"}]}/></div>
      <header className={`container ${styles.hero}`}>
        <div><span className={styles.eyebrow}>GOAL-BASED ROUTES</span><h1>Scarlet Skips Builds</h1><p>Choose a build based on what you want to achieve, then adapt it to the three random upgrade cards the game actually offers.</p><div className={styles.badges}><SourceBadge status="Community Verified"/><VersionBadge version={game.currentVersion}/></div></div>
        <div className={styles.heroImage}><Image src="/images/editorial/builds-hero.webp" alt="Editorial illustration of Scarlet comparing three build-defining upgrade cards" fill priority sizes="(max-width: 768px) 100vw, 45vw"/><span><Icon name="target" size={30}/> Goal first. Cards second.</span></div>
      </header>
      <section className={`container ${styles.introStrip}`}><Icon name="cards" size={26}/><p><strong>No fixed draw order.</strong> Every level-up offers three random cards. Build pages describe priorities and pivots, not a guaranteed shopping list.</p><Link href="/run-lab/build-planner">Open Build Planner <Icon name="arrow" size={17}/></Link></section>
      <section className={`container ${styles.buildSection}`}>
        <div className={styles.sectionHead}><div><span>BUILD LIBRARY</span><h2>Pick the destination</h2><p>Each route states its evidence level, version and main failure point.</p></div><Link href="/builds/best-build">How to choose <Icon name="arrow" size={16}/></Link></div>
        <div className={styles.buildGrid}>{builds.filter((build) => build.slug !== "best-build").map((build) => <BuildCard key={build.slug} build={build}/>)}</div>
      </section>
      <section className={styles.compareBand}>
        <div className={`container ${styles.compareGrid}`}>
          <div><span className={styles.eyebrow}>ONE DECISION AT A TIME</span><h2>Turn random cards into a plan</h2><p>Add what you already have, choose a goal and let the Run Lab identify strengths, gaps and useful next picks.</p></div>
          <Link href="/run-lab/build-planner"><span><Icon name="flask" size={29}/></span><div><strong>Build Planner</strong><small>Analyze current stacks</small></div><Icon name="arrow" size={19}/></Link>
          <Link href="/run-lab/upgrade-picker"><span><Icon name="cards" size={29}/></span><div><strong>Upgrade Picker</strong><small>Rank the live three-card offer</small></div><Icon name="arrow" size={19}/></Link>
        </div>
      </section>
    </main>
  );
}
