import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { guides } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/guides/guides.module.css";

const categories = ["Getting Started", "Strategy", "Completion"];

const categoryCopy: Record<string, { title: string; text: string }> = {
  "Getting Started": { title: "New to the game?", text: "Learn the button, the rope and the first few picks without worrying about a big score." },
  Strategy: { title: "Trying to make a run work?", text: "Fix shaky landings, understand your cards and turn a decent start into a real build." },
  Completion: { title: "Looking for the ending or achievement?", text: "Get the direct answer first, then decide how many spoilers you want." },
};

const guideCopy: Record<string, string> = {
  "beginner-guide": "A calm first-run plan: what to watch, when to jump and which upgrades are easiest to learn with.",
  "how-to-play": "The controls, upgrade screen, score loop and what changes when Scarlet starts staying airborne.",
  tips: "Practical fixes for rope overload, awkward landings, weak card choices and runs that stop making sense.",
  achievement: "The very short route to Off to a Great Start, plus what to try if Steam does not unlock it.",
  secrets: "Rocket Fuel, the Moon ending, odd card names and the things players still have not proved.",
};

export default function GuidesPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Guides",href:"/guides"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Guides"}]}/></div>
      <header className={`container ${styles.hero}`}>
        <div className={styles.heroImage}><Image src="/images/official/screenshot-4.jpg" alt="Official Scarlet Skips gameplay showing Scarlet clearing an active rope" fill priority sizes="(max-width: 768px) 100vw, 42vw"/></div>
        <div><span className={styles.eyebrow}>START WITH YOUR CURRENT PROBLEM</span><h1>What are you trying to figure out?</h1><p>You do not need to read the whole site. Pick the part of your run that feels wrong and start there.</p></div>
      </header>
      <section className={`container ${styles.guideSections}`}>
        {categories.map((category) => <section key={category}><div className={styles.categoryHead}><span><Icon name={category === "Getting Started" ? "controller" : category === "Strategy" ? "target" : "award"} size={27}/></span><div><h2>{categoryCopy[category].title}</h2><p>{categoryCopy[category].text}</p></div></div><div className={styles.guideGrid}>{guides.filter((guide) => guide.category === category).map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`}><div className={styles.cardImage}><Image src={guide.image} alt={guide.imageAlt} fill sizes="(max-width: 768px) 100vw, 32vw"/></div><div><span>{guide.category}</span><h3>{guide.shortName}</h3><p>{guideCopy[guide.slug] ?? guide.description}</p><strong>Open this guide <Icon name="arrow" size={16}/></strong></div></Link>)}</div></section>)}
      </section>
      <section className={`container ${styles.guideSections}`}><section><div className={styles.categoryHead}><span><Icon name="trophy" size={27}/></span><div><h2>Trying to push the score?</h2><p>Build the airtime engine before turning ropes and fire into late-run pressure.</p></div></div><div className={styles.guideGrid}><Link href="/high-score"><div className={styles.cardImage}><Image src="/images/official/screenshot-2.jpg" alt="Official Scarlet Skips screenshot showing a burning rope and fire multiplier" fill sizes="(max-width: 768px) 100vw, 32vw"/></div><div><span>Strategy</span><h3>High score route</h3><p>What the roughly 200,000-point player route teaches—and which parts are observations, not a world record or official formula.</p><strong>Open this guide <Icon name="arrow" size={16}/></strong></div></Link></div></section></section>
    </main>
  );
}
