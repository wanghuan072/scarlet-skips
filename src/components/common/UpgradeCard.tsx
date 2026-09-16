import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { UpgradeArt } from "@/components/common/UpgradeArt";
import { SourceBadge } from "@/components/common/Badges";
import styles from "@/style/common/cards.module.css";
import type { Upgrade } from "@/types/content";

export function UpgradeCard({ upgrade, compact = false, tile = false }: { upgrade: Upgrade; compact?: boolean; tile?: boolean }) {
  return (
    <Link className={`${styles.upgradeCard} ${compact ? styles.compact : ""} ${tile ? styles.tile : ""}`} data-tone={upgrade.color} href={`/upgrades/${upgrade.slug}`}>
      <UpgradeArt
        slug={upgrade.slug}
        title={upgrade.gameTitle ?? upgrade.name}
        size={compact ? "thumb" : tile ? "tile" : "full"}
      />
      <span className={styles.cardBody}>
        {compact || tile ? <strong>{upgrade.shortName}</strong> : null}
        {!compact && !tile && <span>{upgrade.effect}</span>}
        <small>{upgrade.category}</small>
      </span>
      {!compact && !tile && <SourceBadge status={upgrade.sourceStatus} />}
      {compact ? <Icon name="arrow" size={18} className={styles.cardArrow} /> : null}
    </Link>
  );
}
