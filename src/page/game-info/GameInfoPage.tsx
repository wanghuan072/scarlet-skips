import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { SourcesList } from "@/components/common/SourcesList";
import { siteConfig } from "@/config/site";
import { game } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/game-info/game-info.module.css";
import type { SystemRequirements } from "@/types/content";

const requirementLabels: Array<[keyof SystemRequirements, string]> = [
  ["os", "Operating system"],
  ["processor", "Processor"],
  ["memory", "Memory"],
  ["graphics", "Graphics"],
  ["directX", "DirectX"],
  ["storage", "Storage"],
];

function RequirementsCard({
  title,
  requirements,
}: {
  title: string;
  requirements: SystemRequirements;
}) {
  return (
    <article className={styles.requirementsCard}>
      <h3>{title}</h3>
      <dl>
        {requirementLabels.map(([key, label]) => (
          <div key={key}><dt>{label}</dt><dd>{requirements[key]}</dd></div>
        ))}
      </dl>
    </article>
  );
}

export default function GameInfoPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Game Info", href: "/game-info" }])} />
      <div className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Game Info" }]} />
      </div>

      <PageHero
        eyebrow="BEFORE YOU PLAY"
        titlePrefix="Scarlet Skips Game Info"
        title="Controls and PC requirements"
        description="Check how the one-button jump works, what Steam lists for Windows and where to confirm the current regional price."
        image="/images/official/trailer-art.jpg"
        imageAlt="Scarlet holding a jump rope on the reveal art"
        imageCaption="Game artwork. Check the requirements below before buying."
        imagePosition="center top"
        actions={[{ href: siteConfig.steamUrl, label: "Check the current Steam page", external: true }]}
      />

      <div className={`container ${styles.content}`}>
        <section aria-labelledby="quick-facts-title">
          <div className={styles.sectionTitle}>
            <span><Icon name="info" size={25} /></span>
            <div><p>THE SHORT VERSION</p><h2 id="quick-facts-title">Scarlet Skips at a glance</h2></div>
          </div>
          <div className={styles.factGrid}>
            <article><Icon name="calendar" size={25} /><span>Release date</span><strong>{game.releaseDate}</strong></article>
            <article><Icon name="gauge" size={25} /><span>Guide baseline</span><strong>Version {game.currentVersion}</strong></article>
            <article><Icon name="controller" size={25} /><span>Platform</span><strong>{game.platform}</strong></article>
            <article><Icon name="cards" size={25} /><span>Upgrade pool</span><strong>{game.upgradeCardCount} on Steam</strong></article>
            <article><Icon name="trophy" size={25} /><span>Achievements</span><strong>{game.achievementCount}</strong></article>
            <article><Icon name="award" size={25} /><span>Developer / publisher</span><strong>{game.developer}</strong></article>
          </div>
        </section>

        <section aria-labelledby="requirements-title">
          <div className={styles.sectionTitle}>
            <span><Icon name="gauge" size={25} /></span>
            <div><p>WINDOWS PC</p><h2 id="requirements-title">System requirements</h2></div>
          </div>
          <div className={styles.requirementsGrid}>
            <RequirementsCard title="Minimum" requirements={game.minimumRequirements} />
            <RequirementsCard title="Recommended" requirements={game.recommendedRequirements} />
          </div>
        </section>

        <section className={styles.storeSection} aria-labelledby="store-title">
          <div>
            <div className={styles.sectionTitle}>
              <span><Icon name="controller" size={25} /></span>
              <div><p>STEAM LISTING</p><h2 id="store-title">Price and features</h2></div>
            </div>
            <p className={styles.storeCopy}>The US Steam price recorded on September 14 was <strong>{game.price}</strong>. Your local price or a sale may differ, so check Steam before buying. Steam advertises <strong>{game.upgradeCardCount} upgrade cards</strong>; the game-data table names <strong>{game.documentedCardCount}</strong> entries, three of which carry a special level marker and are listed separately here. For the controls, see <Link href="/guides/how-to-play">how to play</Link>. The listed achievement is <Link href="/guides/achievement">Off to a Great Start</Link>.</p>
            <div className={styles.featureList}>{game.storeFeatures.map((feature) => <span key={feature}><Icon name="check" size={16} />{feature}</span>)}</div>
          </div>
          <aside>
            <p>Already installed it?</p>
            <h3>Spend five minutes learning the rope before worrying about a build.</h3>
            <Link href="/guides/beginner-guide">Help with my first run <Icon name="arrow" size={17} /></Link>
          </aside>
        </section>

      </div>
      <SourcesList ids={game.sourceIds} />
    </main>
  );
}
