import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { game, guides } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/guides/guides.module.css";

const categories = ["Getting Started", "Strategy", "Completion"];

export default function GuidesPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Guides",href:"/guides"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Guides"}]}/></div>
      <header className={`container ${styles.hero}`}>
        <div className={styles.heroImage}><Image src="/images/editorial/guides-hero.webp" alt="Editorial illustration of Scarlet practicing a controlled jump-rope rhythm" fill priority sizes="(max-width: 768px) 100vw, 42vw"/></div>
        <div><span className={styles.eyebrow}>PLAYER FIELD MANUAL</span><h1>Scarlet Skips Guides</h1><p>Start with the one-button rhythm, then move into upgrade decisions, score routes, completion and launch-week discoveries.</p><div className={styles.badges}><SourceBadge status="Official"/><VersionBadge version={game.currentVersion}/></div></div>
      </header>
      <section className={`container ${styles.guideSections}`}>
        {categories.map((category) => <section key={category}><div className={styles.categoryHead}><span><Icon name={category === "Getting Started" ? "controller" : category === "Strategy" ? "target" : "award"} size={27}/></span><div><h2>{category}</h2><p>{category === "Getting Started" ? "Controls, timing and your first reliable build." : category === "Strategy" ? "Upgrade choices and routes for a stronger run." : "The achievement, ending and hidden interactions."}</p></div></div><div className={styles.guideGrid}>{guides.filter((guide) => guide.category === category).map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`}><div className={styles.cardImage}><Image src={guide.image} alt={guide.imageAlt} fill sizes="(max-width: 768px) 100vw, 32vw"/></div><div><span>{guide.category}</span><h3>{guide.shortName}</h3><p>{guide.description}</p><strong>Read guide <Icon name="arrow" size={16}/></strong></div></Link>)}</div></section>)}
      </section>
    </main>
  );
}
