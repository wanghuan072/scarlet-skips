import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { game } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/run-lab/run-lab.module.css";

const tools = [
  { icon: "flask" as const, title: "Build Planner", text: "Choose a goal, add current stacks and find your build's strengths, gaps and next picks.", href: "/run-lab/build-planner", label: "PLAN A BUILD" },
  { icon: "cards" as const, title: "Upgrade Picker", text: "Enter the current three-card offer and compare it against your run goal.", href: "/run-lab/upgrade-picker", label: "COMPARE THREE CARDS" },
  { icon: "route" as const, title: "Ending Route", text: "Work through a spoiler-light player route with progress saved in your browser.", href: "/run-lab/ending-route", label: "TRACK THE ROUTE" },
  { icon: "trophy" as const, title: "Personal Records", text: "Keep proof-linked scores locally without pretending there is an official leaderboard.", href: "/run-lab/records", label: "SAVE A RECORD" },
];

export default function RunLabPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Run Lab",href:"/run-lab"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Run Lab"}]}/></div>
      <header className={styles.labHero}>
        <Image src="/images/official/screenshot-3.jpg" alt="Scarlet Skips upgrade cards ready for a Run Lab decision" fill priority sizes="100vw"/>
        <div className={styles.labShade}/>
        <div className={`container ${styles.labHeroInner}`}><span className={styles.heroFlask}><Icon name="flask" size={45}/></span><small>TOOLS FOR THE NEXT PICK</small><h1>Scarlet Skips Run Lab</h1><p>Turn random upgrade choices into a deliberate plan. Every tool runs in your browser, uses fixed transparent rules and keeps unknown game values out of the math.</p><div className={styles.heroFacts}><span><Icon name="shield" size={17}/>Data {game.currentVersion}</span><span><Icon name="check" size={17}/>No account needed</span><span><Icon name="gauge" size={17}/>Local progress</span></div></div>
      </header>
      <section className={`container ${styles.toolCards}`}>
        {tools.map((tool,index) => <Link key={tool.href} href={tool.href}><div className={styles.toolCardTop}><span>{String(index + 1).padStart(2,"0")}</span><Icon name={tool.icon} size={34}/></div><h2>{tool.title}</h2><p>{tool.text}</p><strong>{tool.label}<Icon name="arrow" size={17}/></strong></Link>)}
      </section>
      <section className={`container ${styles.method}`}><div><Icon name="shield" size={30}/><h2>Transparent by design</h2><p>The planners use goal-fit weights and documented synergies, not an AI answer or an invented tier score. Community discoveries remain labeled as player reports.</p></div><div><Icon name="gauge" size={30}/><h2>Version-aware</h2><p>The current rule set is marked for 1.0.1. Any later patch mentioning Rocket Shoes, Luck, fire or rope durability should trigger a full retest.</p></div><div><Icon name="heart" size={30}/><h2>Private by default</h2><p>Checklist progress and personal records use localStorage. Nothing is uploaded, and clearing browser data removes it.</p></div></section>
    </main>
  );
}
