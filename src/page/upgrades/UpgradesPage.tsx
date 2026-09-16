import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { UpgradeCompareTable } from "@/page/upgrades/components/UpgradeCompareTable";
import { regularUpgrades, specialUpgrades, upgrades } from "@/lib/data/content";
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
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Upgrades" }]}/></div>
      <PageHero
        eyebrow="PICK WITH A PURPOSE"
        titlePrefix="Scarlet Skips Upgrades"
        title="Choose the card your run needs"
        description="Compare what each card changes, when it can appear and when it helps. There are 13 regular entries here, plus three special game-data entries outside the usual offer."
        image="/images/official/screenshot-3.jpg"
        imageAlt="Scarlet Skips upgrade screen showing Reinforce Jump Rope, Increase Luck and Add Jump Rope"
        imageCaption="Three cards. One pick. That’s the whole pause."
        imagePosition="center 42%"
        facts={[
          { label: "Named here", value: String(upgrades.length) },
          { label: "On screen", value: "3" },
          { label: "Special", value: String(specialUpgrades.length) },
        ]}
      />
      <section className={`container ${styles.explorerSection}`}>
        <SectionHeading icon="cards" title="Regular upgrade cards" description="These rows have a real AppearsAfterLevel in the shipping table. Use this while the level-up screen is open." href="/builds#simulator" linkLabel="Practice a full run"/>
        <UpgradeCompareTable upgrades={regularUpgrades}/>
      </section>
      <section className={`container ${styles.explorerSection}`}>
        <SectionHeading icon="info" title="Cards outside the regular offer" description="The shipping table still names these cards, but stores AppearsAfterLevel 9999 — a usual Unreal sentinel for 'not on the regular curve.' Do not plan a run around them."/>
        <UpgradeCompareTable upgrades={specialUpgrades}/>
      </section>
      <section className={`container ${styles.routeNotes}`}>
        <article><p>IF YOU WANT THE MOON</p><h2>Choose cards for a readable Moon run</h2><span>Height, Luck, fuel and rope protection are the useful pieces. Fire is a score tool, not part of the documented ending route. If the pause still feels new, <Link href="/guides/beginner-guide">learn the jump</Link> before copying a card order.</span><Link href="/ending">Open the ending route</Link></article>
        <article><p>IF YOU WANT SCORE</p><h2>Build airtime before score pressure</h2><span>More ropes, speed and fire pay off after your jumps already generate enough time and levels to control them. Add pressure only after the fuel loop repeats.</span><Link href="/guides/high-score">Open the score guide</Link></article>
        <article><p>IF YOU WANT THE WILD SCREEN</p><h2>Pick ropes, fire and tricks for spectacle</h2><span>Extra ropes, fire, speed and tricks are the look. That is not the Moon climb. Play it as spectacle, or keep those cards late on a score run.</span><Link href="/guides/spectacle">Open the spectacle guide</Link></article>
      </section>
    </main>
  );
}
