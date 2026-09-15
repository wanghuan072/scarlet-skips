import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { RunBuilder } from "@/page/builds/components/RunBuilder";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/builds/builds.module.css";

const routeLinks = [
  { title: "I want to reach the Moon", text: "Use the spoiler-light ending route when completion matters more than the multiplier.", href: "/ending", icon: "route" as const },
  { title: "I want a bigger score", text: "Learn when height, Luck and Rocket Fuel are ready for more ropes and fire.", href: "/high-score", icon: "trophy" as const },
  { title: "I am still learning", text: "Start with a repeatable jump and leave the noisy upgrades for later.", href: "/guides/beginner-guide", icon: "controller" as const },
];

export default function BuildsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Builds", href: "/builds" }])}/>
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Builds" }]}/></div>

      <header className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>PLAY A FULL RUN, ONE UPGRADE AT A TIME</span>
          <h1>How far can your jump rope run climb?</h1>
          <p>Jump rope circles to earn a level-up, choose one of the three cards, then see the ropes, score and altitude change before your next jump.</p>
          <Link href="#simulator">Start the run simulator <Icon name="arrow" size={18}/></Link>
        </div>
        <figure className={styles.heroImage}>
          <Image src="/images/official/screenshot-3.jpg" alt="Official Scarlet Skips level-up screen showing three upgrade cards" fill priority sizes="(max-width: 760px) 100vw, 48vw"/>
          <figcaption>Level-up cards are the heart of every simulated run.</figcaption>
        </figure>
      </header>

      <ol className={`container ${styles.howItWorks}`} aria-label="How the run simulator works">
        <li><span>1</span><div><strong>Clear rope circles</strong><p>Fill the level-up meter.</p></div></li>
        <li><span>2</span><div><strong>Choose one card</strong><p>Three upgrades appear each level.</p></div></li>
        <li><span>3</span><div><strong>Climb to the Moon</strong><p>Your choice changes the next run.</p></div></li>
      </ol>

      <div className="container"><RunBuilder/></div>

      <section className={`container ${styles.explainer}`}>
          <div className={styles.explainerIntro}><span>HOW THE SIMULATION WORKS</span><h2>A playable run, with honest simulated numbers.</h2><p>Yerk Games confirms ten stackable upgrade cards and three random choices per level, but does not publish its full formulas. This simulator makes its own circle, altitude and score rules visible so you can explore trade-offs without treating them as official values.</p></div>
        <div className={styles.explainerGrid}>
          <article><span><Icon name="check" size={24}/></span><h3>What changes in a run</h3><ul><li>Circles required for the next level</li><li>Altitude gained after each card</li><li>Active ropes, fire and score</li><li>Pressure from a busier rope set</li></ul></article>
          <article><span><Icon name="info" size={24}/></span><h3>What remains simulated</h3><ul><li>Circle and altitude numbers</li><li>Fuel and durability formulas</li><li>Exact random card odds</li><li>The real game&apos;s timing and physics</li></ul></article>
        </div>
      </section>

      <section className={styles.routeBand}>
        <div className="container">
          <div className={styles.routeHead}><span>NEED THE WHOLE STRATEGY?</span><h2>Open the route that matches the result you want.</h2></div>
          <div className={styles.routeGrid}>{routeLinks.map((route) => <Link key={route.href} href={route.href}><span><Icon name={route.icon} size={27}/></span><div><h3>{route.title}</h3><p>{route.text}</p></div><Icon name="arrow" size={18}/></Link>)}</div>
        </div>
      </section>
    </main>
  );
}
