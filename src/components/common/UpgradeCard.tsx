import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { SourceBadge } from "@/components/common/Badges";
import styles from "@/style/common/cards.module.css";
import type { Upgrade } from "@/types/content";

export function UpgradeCard({ upgrade, compact = false, tile = false }: { upgrade: Upgrade; compact?: boolean; tile?: boolean }) {
  return (
    <Link className={`${styles.upgradeCard} ${compact ? styles.compact : ""} ${tile ? styles.tile : ""}`} data-tone={upgrade.color} href={`/upgrades/${upgrade.slug}`}>
      <span className={styles.upgradeIcon}><Icon name={upgrade.icon} size={compact ? 24 : tile ? 42 : 34} /></span>
      <span className={styles.cardBody}>
        <strong>{upgrade.shortName}</strong>
        {!compact && !tile && <span>{upgrade.effect}</span>}
        <small>{upgrade.category}</small>
      </span>
      {!compact && !tile && <SourceBadge status={upgrade.sourceStatus} />}
      {!tile && <Icon name="arrow" size={18} className={styles.cardArrow} />}
    </Link>
  );
}
