import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { getBuild, getRelatedUpgrades } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/content/content.module.css";

const phases = [
  { label: "Early run", title: "Make room for a long jump", icon: "shoe" as const, items: ["Take Jump Height and Luck when the run is safe.", "Stay around two to four ropes while the build is young.", "Reinforce what you have and leave fire for later."] },
  { label: "Mid run", title: "Make the fuel loop repeat", icon: "rocket" as const, items: ["Add Rocket Fuel after height is already doing useful work.", "You want several loops—and eventually another upgrade—inside one jump.", "Watch for the fuel refill and make it work twice before taking more risk."] },
  { label: "Late run", title: "Turn spare safety into score", icon: "fire" as const, items: ["Add rope count and speed after the air loop feels dependable.", "Take fire only when losing a rope is easy to recover from.", "Keep adding fuel because later upgrades take longer to reach."] },
];

export default function HighScorePage() {
  const build = getBuild("high-score-build")!;
  const core = getRelatedUpgrades(build.coreUpgrades);
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"High Score Guide",href:"/high-score"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"High Score Guide"}]}/></div>
      <header className={styles.featureHero}>
        <Image src="/images/official/screenshot-2.jpg" alt="Official Scarlet Skips gameplay showing Scarlet above a flaming rope with a fire multiplier" fill priority sizes="100vw"/>
        <div className={styles.heroShade}/><div className={`container ${styles.heroContent}`}><div className={styles.heroBadges}><SourceBadge status="Player Report"/><VersionBadge version="1.0.1"/></div><p className={styles.eyebrow}>BUILD THE AIRTIME FIRST</p><h1>How to get a much higher score</h1><p>The useful version of the community strategy is simple: height and Luck first, Rocket Fuel when it can reach the next upgrade, then ropes, speed and fire after the run can survive them.</p><Link href="/builds#planner">Track this score build <Icon name="arrow" size={18}/></Link></div>
      </header>
      <div className={`container ${styles.articleLayout}`}>
        <article className={styles.article}>
          <section className={styles.statStrip}><div><small>ONE PLAYER&apos;S RUN</small><strong>~200,000</strong><span>a useful example, not a world record</span></div><div><small>THE ENGINE</small><strong>Stay airborne</strong><span>height + Luck + fuel</span></div><div><small>THE PAYOFF</small><strong>More ropes + fire</strong><span>only after the loop is safe</span></div></section>
          <section><div className={styles.sectionTitle}><span><Icon name="cards" size={23}/></span><div><p className={styles.kicker}>START HERE</p><h2>The cards that get the run moving</h2></div></div><div className={styles.miniUpgradeGrid}>{core.map((upgrade,index) => <Link key={upgrade.slug} href={`/upgrades/${upgrade.slug}`} style={{"--card-color":upgrade.color} as CSSProperties}><small>Pick {index + 1}</small><span><Icon name={upgrade.icon} size={27}/></span><strong>{upgrade.shortName}</strong><p>{upgrade.effect}</p></Link>)}</div></section>
          <section><div className={styles.sectionTitle}><span><Icon name="route" size={23}/></span><div><p className={styles.kicker}>DO IT IN THIS ORDER</p><h2>Build the score in three parts</h2></div></div><div className={styles.phaseCards}>{phases.map((phase,index) => <article key={phase.label}><span className={styles.phaseNumber}>0{index + 1}</span><span className={styles.phaseIcon}><Icon name={phase.icon} size={27}/></span><p className={styles.kicker}>{phase.label}</p><h3>{phase.title}</h3><ul>{phase.items.map((item) => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul></article>)}</div></section>
          <section className={styles.explainer}><div><p className={styles.kicker}>THE IMPORTANT TRICK</p><h2>Why Rocket Fuel can keep a run going</h2><p>A Steam Community player reports that an upgrade refills the Rocket Fuel gauge. If height and Luck get you to another upgrade before the fuel runs out, the next refill buys another climb.</p><p>Do not assume the loop is ready after one lucky jump. Keep a safe landing until you have watched the refill happen and crossed the gap twice.</p></div><Image src="/images/official/screenshot-5.jpg" alt="Rocket Shoes active during a Scarlet Skips run" width={640} height={360}/></section>
          <section><div className={styles.sectionTitle}><span><Icon name="gauge" size={23}/></span><div><p className={styles.kicker}>ARE YOU READY TO SCALE?</p><h2>Look for these signs, not a magic number</h2></div></div><ol className={styles.routeSteps}><li><span>01</span><div><h3>One jump clears several rope passes</h3><p>A player mentioned about twelve loops, but your real goal is enough progress to get close to another level-up.</p></div></li><li><span>02</span><div><h3>Upgrades start appearing in the air</h3><p>That means height and Luck are finally feeding each other instead of depending on every landing.</p></div></li><li><span>03</span><div><h3>The fuel gauge refills</h3><p>Watch it when the upgrade resolves. If the gauge does not refill, plan to land instead of forcing the loop.</p></div></li><li><span>04</span><div><h3>You can repeat it</h3><p>Make the bridge work twice before adding more ropes, more speed or fire.</p></div></li></ol></section>
          <section><div className={styles.sectionTitle}><span><Icon name="x" size={23}/></span><div><p className={styles.kicker}>THE RUN-KILLERS</p><h2>What usually ruins a score attempt?</h2></div></div><ul className={styles.calloutList}><li><Icon name="x" size={17}/><span><strong>Taking fire too early.</strong> More points do not help if the next landing is unreadable.</span></li><li><Icon name="x" size={17}/><span><strong>Adding ropes before they are protected.</strong> More ropes create more progress, but also more ways for the setup to fall apart.</span></li><li><Icon name="x" size={17}/><span><strong>Buying fuel without enough height.</strong> A longer gauge is wasted if the jump still cannot reach another upgrade.</span></li><li><Icon name="x" size={17}/><span><strong>Holding until the tank is empty.</strong> Save enough control to land unless the next refill is already close.</span></li><li><Icon name="x" size={17}/><span><strong>Forgetting that later levels take longer.</strong> Keep increasing the fuel margin as the run grows.</span></li></ul></section>
        </article>
        <aside className={styles.stickyAside}><section><p className={styles.kicker}>KEEP THIS BESIDE THE GAME</p><h2>The pick order</h2><ol><li><span>1</span>Jump Height</li><li><span>2</span>Increase Luck</li><li><span>3</span>Rocket Fuel</li><li><span>4</span>More ropes and speed</li><li><span>5</span>Fire when safe</li></ol><Link href="/builds#planner">Track the build <Icon name="arrow" size={16}/></Link></section><section><p className={styles.kicker}>MID-RUN HELP</p><nav><Link href="/builds#planner"><Icon name="cards" size={18}/>Compare this three-card draw</Link><Link href="/upgrades"><Icon name="trophy" size={18}/>Check a card&apos;s real effect</Link><Link href="/guides/tips"><Icon name="book" size={18}/>Fix a shaky run</Link></nav></section></aside>
      </div>
    </main>
  );
}
