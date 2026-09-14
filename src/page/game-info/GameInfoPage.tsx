import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge } from "@/components/common/Badges";
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

      <header className={styles.hero}>
        <Image
          src="/images/official/screenshot-4.jpg"
          alt="Official Scarlet Skips gameplay screenshot"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroContent}`}>
          <SourceBadge status="Official" />
          <p>OFFICIAL STORE FACTS</p>
          <h1>Scarlet Skips Game Info</h1>
          <p>Release date, price reference, platform support and PC requirements—kept separate from community strategy claims.</p>
          <a href={siteConfig.steamUrl} target="_blank" rel="noreferrer">View on Steam <Icon name="arrow" size={18} /></a>
        </div>
      </header>

      <div className={`container ${styles.content}`}>
        <section aria-labelledby="quick-facts-title">
          <div className={styles.sectionTitle}>
            <span><Icon name="info" size={25} /></span>
            <div><p>AT A GLANCE</p><h2 id="quick-facts-title">Quick facts</h2></div>
          </div>
          <div className={styles.factGrid}>
            <article><Icon name="calendar" size={25} /><span>Release date</span><strong>{game.releaseDate}</strong></article>
            <article><Icon name="gauge" size={25} /><span>Guide baseline</span><strong>Version {game.currentVersion}</strong></article>
            <article><Icon name="controller" size={25} /><span>Platform</span><strong>{game.platform}</strong></article>
            <article><Icon name="cards" size={25} /><span>Upgrade pool</span><strong>{game.upgradeCardCount} cards</strong></article>
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
            <p className={styles.storeCopy}>The checked US store price is <strong>{game.price}</strong>. Regional pricing, discounts and review totals can change, so Steam remains the source of truth before purchase.</p>
            <div className={styles.featureList}>{game.storeFeatures.map((feature) => <span key={feature}><Icon name="check" size={16} />{feature}</span>)}</div>
          </div>
          <aside>
            <p>New to Scarlet Skips?</p>
            <h3>Learn the rhythm before planning the build.</h3>
            <Link href="/guides/beginner-guide">Open the beginner guide <Icon name="arrow" size={17} /></Link>
          </aside>
        </section>

      </div>
    </main>
  );
}
