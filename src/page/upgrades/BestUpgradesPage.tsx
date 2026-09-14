import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { UpgradeCard } from "@/components/common/UpgradeCard";
import { game, upgrades } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import type { GoalId } from "@/lib/recommendation/build-score";
import styles from "@/style/page/upgrades/upgrades.module.css";

const groups: { goal: GoalId; title: string; icon: "route" | "trophy" | "controller" | "rocket"; text: string }[] = [
  { goal: "ending", title: "Reach the Ending", icon: "route", text: "Favor a controlled rope set, height, Luck and enough Rocket Fuel to manage the late sequence." },
  { goal: "high-score", title: "Push a High Score", icon: "trophy", text: "Build the height-and-fuel engine first; score pressure becomes useful only after it is stable." },
  { goal: "beginner", title: "Learn the Rhythm", icon: "controller", text: "Choose readable effects that widen the timing window and protect the current rope set." },
  { goal: "airtime", title: "Stay Airborne", icon: "rocket", text: "Height creates the window, Luck supports progression and Rocket Fuel extends the jump." },
];

export default function BestUpgradesPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Upgrades",href:"/upgrades"},{label:"Best by goal",href:"/upgrades/best-upgrades"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Upgrades",href:"/upgrades"},{label:"Best by goal"}]}/></div>
      <header className={`container ${styles.articleHero}`}>
        <span className={styles.iconBubble}><Icon name="target" size={35}/></span>
        <div><span className={styles.eyebrow}>GOAL-BASED GUIDE</span><h1>Best Scarlet Skips Upgrades by Goal</h1><p>The random three-card offer means no upgrade is universally best. Start with the outcome you want, then adapt the route to the cards you actually receive.</p><div className={styles.heroBadges}><SourceBadge status="Community Verified"/><VersionBadge version={game.currentVersion}/></div></div>
      </header>
      <section className={`container ${styles.goalGuide}`}>
        {groups.map((group) => {
          const ranked = [...upgrades].sort((a,b) => (b.goalWeights[group.goal] ?? 0) - (a.goalWeights[group.goal] ?? 0)).slice(0,3);
          return <article key={group.goal}><div className={styles.goalGuideHead}><span><Icon name={group.icon} size={27}/></span><div><h2>{group.title}</h2><p>{group.text}</p></div></div><div className={styles.miniUpgradeGrid}>{ranked.map((upgrade) => <UpgradeCard key={upgrade.slug} upgrade={upgrade} compact/>)}</div></article>;
        })}
      </section>
      <section className={`container ${styles.callout}`}><Icon name="info" size={25}/><div><h2>How to use this guide</h2><p>These rankings are strategy suggestions, not guaranteed optimal choices. Exact card values are not public, random offers change every route, and player control still matters. For a live three-card decision, use the <Link href="/run-lab/upgrade-picker">Upgrade Picker</Link>.</p></div></section>
    </main>
  );
}
