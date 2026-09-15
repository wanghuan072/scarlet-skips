import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { UpgradeExplorer } from "@/page/upgrades/components/UpgradeExplorer";
import { game, upgrades } from "@/lib/data/content";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/upgrades/upgrades.module.css";

export default function UpgradesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Documented Scarlet Skips upgrade cards",
    numberOfItems: upgrades.length,
    itemListElement: upgrades.map((upgrade, index) => ({ "@type": "ListItem", position: index + 1, name: upgrade.name, url: `${siteConfig.url}/upgrades/${upgrade.slug}` })),
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Upgrades", href: "/upgrades" }])}/>
      <JsonLd data={itemList}/>
      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/official/screenshot-3.jpg" alt="Official Scarlet Skips upgrade screen showing Reinforce Jump Rope, Increase Luck and Add Jump Rope" fill priority sizes="100vw"/>
        <div className={styles.heroShade}/>
        <div className={`container ${styles.heroCopy}`}>
          <span className={styles.eyebrow}>THREE CARDS. ONE PICK.</span>
          <h1><span className="sr-only">Scarlet Skips upgrades: </span>What should you choose?</h1>
          <p>Find the card on your screen, see what it changes and decide whether it helps the run you have right now.</p>
        </div>
      </section>
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Upgrades" }]}/></div>
      <section className={styles.noticeSection}>
        <div className={`container ${styles.dataNotice}`}><span><Icon name="shield" size={25}/></span><div><strong>The game has {game.upgradeCardCount} cards; {game.documentedCardCount} names are confirmed here.</strong><p>We would rather leave two slots blank than make up names or stats the game never published.</p></div></div>
      </section>
      <section className={`container ${styles.explorerSection}`}>
        <SectionHeading icon="cards" title="Find the card on your screen" description="Each card starts with the same player questions: what it changes, whether it stacks, when to take it and what to pair it with." href="/builds#simulator" linkLabel="Try a full run"/>
        <UpgradeExplorer upgrades={upgrades}/>
      </section>
      <section className={`container ${styles.interactionCallout}`}>
        <span><Icon name="flask" size={31}/></span>
        <div><strong>Two good cards can still be wrong for this level.</strong><p>Enter the exact three-card draw and compare it with your goal, current stage, active ropes and earlier picks.</p></div>
        <Link href="/builds#simulator">Open the run simulator <Icon name="arrow" size={16}/></Link>
      </section>
      <section className={styles.goalBand}>
        <div className="container">
          <SectionHeading icon="target" title="The best pick depends on the run" description="These are route directions, not fixed shopping lists—the three-card draw still decides the next question." href="/builds#simulator" linkLabel="Start a run"/>
          <div className={styles.goalCards}>
            <Link href="/ending"><Icon name="route" size={28}/><div><h3>Ending</h3><p>Control, reinforcement, height and Luck.</p></div><Icon name="arrow" size={18}/></Link>
            <Link href="/high-score"><Icon name="trophy" size={28}/><div><h3>High score</h3><p>Airtime first, then rope volume and fire.</p></div><Icon name="arrow" size={18}/></Link>
            <Link href="/guides/beginner-guide"><Icon name="controller" size={28}/><div><h3>Beginner</h3><p>Readable effects and forgiving timing.</p></div><Icon name="arrow" size={18}/></Link>
            <Link href="/builds#simulator"><Icon name="rocket" size={28}/><div><h3>Run simulator</h3><p>Jump, choose cards and climb to the Moon.</p></div><Icon name="arrow" size={18}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
