import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/cards.module.css";
import type { Build } from "@/types/content";

export function BuildCard({ build }: { build: Build }) {
  const destination = build.slug === "ending-build"
    ? "/ending"
    : build.slug === "high-score-build"
      ? "/high-score"
      : build.slug === "beginner-build"
        ? "/guides/beginner-guide"
        : build.slug === "rocket-build"
          ? "/upgrades/upgrade-rocket-fuel"
          : "/upgrades/ignite-jump-rope";
  return (
    <article className={styles.buildCard}>
      <div className={styles.buildCardTop}>
        <span className={styles.buildIcon}><Icon name={build.icon} size={28} /></span>
        <div><p>{build.goal}</p><h2>{build.shortName}</h2></div>
      </div>
      <p>{build.description}</p>
      <dl className={styles.buildFacts}>
        <div><dt>Works well when</dt><dd>{build.strength}</dd></div>
        <div><dt>Watch out for</dt><dd>{build.weakness}</dd></div>
      </dl>
      <Link className={styles.cardButton} href={destination}>Read the route notes <Icon name="arrow" size={17}/></Link>
    </article>
  );
}
