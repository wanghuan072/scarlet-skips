import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import styles from "@/style/common/cards.module.css";
import type { Build } from "@/types/content";

export function BuildCard({ build }: { build: Build }) {
  return (
    <article className={styles.buildCard}>
      <div className={styles.buildCardTop}>
        <span className={styles.buildIcon}><Icon name={build.icon} size={28} /></span>
        <div><p>{build.goal}</p><h2>{build.shortName}</h2></div>
      </div>
      <p>{build.description}</p>
      <dl className={styles.buildFacts}>
        <div><dt>Difficulty</dt><dd>{build.difficulty}</dd></div>
        <div><dt>Strength</dt><dd>{build.strength}</dd></div>
        <div><dt>Weakness</dt><dd>{build.weakness}</dd></div>
      </dl>
      <div className={styles.buildBadges}><SourceBadge status={build.sourceStatus}/><VersionBadge version={build.verifiedVersion}/></div>
      <Link className={styles.cardButton} href={`/builds/${build.slug}`}>View build <Icon name="arrow" size={17}/></Link>
    </article>
  );
}
