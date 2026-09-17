import Link from "next/link";
import type { CSSProperties } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { UpgradeArt } from "@/components/common/UpgradeArt";
import { PageHero } from "@/components/common/PageHero";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { getBuild, getRelatedUpgrades } from "@/lib/data/content";
import { SpoilerPanel } from "@/page/ending/components/SpoilerPanel";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/content/content.module.css";

const steps = [
  ["Use the opening to get levels quickly", "For the first few levels, take Luck and manageable rope or speed upgrades. Stop adding pressure before the pattern becomes hard to read."],
  ["Let extra ropes disappear", "You do not need to save every early rope. A smaller set is easier to control when the height climb begins."],
  ["Protect the ropes you keep", "Reinforce the smaller active set before you start taking Jump Height again and again."],
  ["Now lean into height and Luck", "Take Increase Jump Height and Increase Luck whenever the run is safe. One player mentioned about 50,000 height, but that is not a confirmed requirement."],
  ["Add Rocket Fuel once it buys real time", "Fuel matters when a long jump can already clear several loops or reach another upgrade. Watch the gauge and keep a safe landing available."],
  ["Leave fire alone on this route", "The documented ending run avoids Ignite Jump Rope. Fire is for a score run, not this climb."],
  ["Look for Super Rocket Shoes late", "The documented player route treats Super Rocket Shoes as a sign to try the final ascent. It is not a published, guaranteed win trigger."],
];

export default function EndingPage() {
  const endingBuild = getBuild("ending-build")!;
  const core = getRelatedUpgrades(endingBuild.coreUpgrades);

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Ending Guide",href:"/ending"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Ending Guide"}]}/></div>
      <PageHero
        eyebrow="MOON ROUTE · SPOILER-LIGHT"
        titlePrefix="Scarlet Skips Ending"
        title="A route to the Moon"
        description="A player-reported route keeps the rope pattern manageable before building height and fuel. See the card order and the parts that remain unconfirmed."
        image="/images/official/screenshot-5.jpg"
        imageAlt="Scarlet airborne with Rocket Shoes"
        imageCaption="Rocket Shoes. Height and fuel are the climb — this is not the Moon yet."
        lead={<><SourceBadge status="Player Report"/><VersionBadge version="1.0.1"/></>}
        actions={[{ href: "/builds#moon", label: "Plan my ending run" }]}
      />
      <div className={`container ${styles.articleLayout}`}>
        <article className={styles.article}>
          <section className={styles.leadCard}>
            <span><Icon name="shield" size={28}/></span>
            <div><p className={styles.kicker}>NO STORY SPOILERS YET</p><h2>Before you start</h2><p>A recorded run shows the ending, and a player guide describes one way to reach it. If the jump still feels new, <Link href="/guides/beginner-guide">learn it first</Link>. No official height threshold or guaranteed card order has been published.</p></div>
          </section>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="cards" size={23}/></span><div><p className={styles.kicker}>THE CARDS THAT MATTER</p><h2>Keep the build calm before you chase height</h2></div></div>
            <div className={styles.miniUpgradeGrid}>{core.map((upgrade, index) => <Link key={upgrade.slug} href={`/upgrades/${upgrade.slug}`} style={{"--card-color": upgrade.color} as CSSProperties}><small>Priority {index + 1}</small><UpgradeArt slug={upgrade.slug} title={upgrade.gameTitle ?? upgrade.name} size="tile" /><p>{upgrade.effect}</p></Link>)}</div>
          </section>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="route" size={23}/></span><div><p className={styles.kicker}>STEP BY STEP</p><h2>Play the run in this order</h2></div></div>
            <ol className={styles.routeSteps}>{steps.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </section>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="shield" size={23}/></span><div><p className={styles.kicker}>HOW CERTAIN IS THIS?</p><h2>What is solid, and what came from one run?</h2></div></div>
            <div className={styles.phaseCards}>
              <article><span className={styles.phaseNumber}>01</span><span className={styles.phaseIcon}><Icon name="check" size={27}/></span><p className={styles.kicker}>CORROBORATED</p><h3>An ending exists</h3><p>Long-form footage shows the final ascent, Moon scene and credits.</p></article>
              <article><span className={styles.phaseNumber}>02</span><span className={styles.phaseIcon}><Icon name="route" size={27}/></span><p className={styles.kicker}>PLAYER ROUTE</p><h3>Card order</h3><p>Rope reduction, reinforcement, height, Luck and fuel come from a successful Steam guide.</p></article>
              <article><span className={styles.phaseNumber}>03</span><span className={styles.phaseIcon}><Icon name="info" size={27}/></span><p className={styles.kicker}>NOT A REQUIREMENT</p><h3>50,000 height</h3><p>The number describes one author&apos;s run; no official threshold is published.</p></article>
            </div>
          </section>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="route" size={23}/></span><div><p className={styles.kicker}>WHEN THE DRAW GOES SIDEWAYS</p><h2>Keep an ending attempt alive without a perfect hand</h2></div></div>
            <p>Three random offers will not follow a seven-step checklist. If Luck or height does not appear, keep the rope pattern you can actually land and take protection when losing the last useful rope would end the attempt. Do not add fire or another rope just to force faster levels if the current pattern is already hard to read.</p>
            <p>If extra ropes or fire are already in the run, that does not prove the Moon is locked. The player route avoided those choices because a quieter climb was easier to control, not because an official rule bans them. Try to simplify at the next useful offer; if the landing has become unreliable, treat this run as practice and make the next one calmer.</p>
            <p>If Rocket Fuel empties before another upgrade, plan a landing rather than betting on a refill. No exact height threshold or guaranteed Super Rocket Shoes offer has been published. The <Link href="/upgrades">card list</Link> explains why the three offers cannot be scripted.</p>
          </section>
          <SpoilerPanel/>
          <section>
            <div className={styles.sectionTitle}><span><Icon name="x" size={23}/></span><div><p className={styles.kicker}>KEEP THE RUN ALIVE</p><h2>The mistakes that waste an ending attempt</h2></div></div>
            <ul className={styles.calloutList}><li><Icon name="x" size={17}/><span><strong>Following a high-score script.</strong> An ending attempt does not need early fire or maximum rope pressure. If the jump is falling apart, <Link href="/guides/tips">fix the rhythm</Link> before copying a <Link href="/guides/high-score">score route</Link>.</span></li><li><Icon name="x" size={17}/><span><strong>Protecting every rope forever.</strong> The published route intentionally simplifies the set before reinforcing it.</span></li><li><Icon name="x" size={17}/><span><strong>Taking height before stabilizing.</strong> The route reinforces the smaller set before farming height so rope loss does not interrupt the push.</span></li><li><Icon name="x" size={17}/><span><strong>Trusting an exact height target.</strong> Community numbers are observations, not official thresholds.</span></li><li><Icon name="x" size={17}/><span><strong>Ignoring a vulnerable last rope.</strong> If a single unprotected rope remains, add or reinforce rather than gambling the entire route.</span></li></ul>
          </section>
        </article>
        <aside className={styles.stickyAside}>
          <section><p className={styles.kicker}>KEEP THIS BESIDE THE GAME</p><h2>Ending checklist</h2><ul><li><Icon name="check" size={16}/>Get levels without overloading the ropes</li><li><Icon name="check" size={16}/>Keep a smaller reinforced set</li><li><Icon name="check" size={16}/>Stack height and Luck</li><li><Icon name="check" size={16}/>Add Rocket Fuel later</li><li><Icon name="x" size={16}/>Skip fire on this route</li></ul><Link href="/builds#moon">Play this in a run <Icon name="arrow" size={16}/></Link></section><section><p className={styles.kicker}>NEED A HAND?</p><nav><Link href="/builds#moon"><Icon name="route" size={18}/>Practice the ending cards</Link><Link href="/guides/tips"><Icon name="book" size={18}/>Fix a shaky run</Link><Link href="/upgrades"><Icon name="cards" size={18}/>Check an upgrade</Link></nav></section>
        </aside>
      </div>
    </main>
  );
}
