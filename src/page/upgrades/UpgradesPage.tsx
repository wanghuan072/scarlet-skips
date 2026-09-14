import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
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
        <Image className={styles.heroImage} src="/images/editorial/upgrades-hero.webp" alt="Editorial illustration of Scarlet jumping among three upgrade cards" fill priority sizes="100vw"/>
        <div className={styles.heroShade}/>
        <div className={`container ${styles.heroCopy}`}>
          <span className={styles.eyebrow}>SCARLET SKIPS DATABASE</span>
          <h1><span className="sr-only">Scarlet Skips </span>Upgrades</h1>
          <p>Discover every verified upgrade, compare effects and find the best combinations for your run.</p>
          <div className={styles.heroBadges}><SourceBadge status="Official"/><VersionBadge version={game.currentVersion}/></div>
        </div>
      </section>
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Upgrades" }]}/></div>
      <section className={styles.noticeSection}>
        <div className={`container ${styles.dataNotice}`}><span><Icon name="shield" size={25}/></span><div><strong>{game.upgradeCardCount} cards are official. {game.documentedCardCount} names are currently verified here.</strong><p>The official store confirms a pool of ten. We list only names visible in official screenshots or corroborated footage, so three cards remain intentionally undocumented.</p></div></div>
      </section>
      <section className={`container ${styles.explorerSection}`}>
        <SectionHeading icon="cards" title="Upgrade Explorer" description="Filter by the part of the run each documented card changes." href="/upgrades/matrix" linkLabel="Compare two cards"/>
        <UpgradeExplorer upgrades={upgrades}/>
      </section>
      <section className={`container ${styles.interactionCallout}`}>
        <span><Icon name="flask" size={31}/></span>
        <div><strong>Two cards can solve one problem—or create two new ones.</strong><p>Explore six sourced upgrade pairings by timing, prerequisite and risk. Undocumented combinations stay marked as untested.</p></div>
        <Link href="/upgrades/matrix">Open Interaction Lab <Icon name="arrow" size={16}/></Link>
      </section>
      <section className={styles.goalBand}>
        <div className="container">
          <SectionHeading icon="target" title="Best upgrades by goal" description="Useful for a specific plan beats a universal tier list." href="/upgrades/best-upgrades" linkLabel="Open goal guide"/>
          <div className={styles.goalCards}>
            <Link href="/builds/ending-build"><Icon name="route" size={28}/><div><h3>Ending</h3><p>Control, reinforcement, height and Luck.</p></div><Icon name="arrow" size={18}/></Link>
            <Link href="/builds/high-score-build"><Icon name="trophy" size={28}/><div><h3>High score</h3><p>Airtime first, then rope volume and fire.</p></div><Icon name="arrow" size={18}/></Link>
            <Link href="/builds/beginner-build"><Icon name="controller" size={28}/><div><h3>Beginner</h3><p>Readable effects and forgiving timing.</p></div><Icon name="arrow" size={18}/></Link>
            <Link href="/builds/rocket-build"><Icon name="rocket" size={28}/><div><h3>Airtime</h3><p>Height, Luck and Rocket Fuel.</p></div><Icon name="arrow" size={18}/></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
