import Image from "next/image";
import { upgradeCardSize, upgradeCardSrc, type UpgradeArtVariant } from "@/lib/data/upgrade-art";
import styles from "@/style/common/upgrade-art.module.css";

const SIZES = {
  full: "(max-width: 900px) 92vw, 420px",
  tile: "(max-width: 768px) 46vw, 280px",
  thumb: "96px",
} as const;

export function UpgradeArt({
  slug,
  title,
  variant,
  size = "full",
}: {
  slug: string;
  title: string;
  variant?: UpgradeArtVariant;
  size?: "full" | "tile" | "thumb";
}) {
  const src = upgradeCardSrc(slug, variant);
  const native = upgradeCardSize(src);
  return (
    <span className={styles.art} data-size={size}>
      {src ? (
        <Image
          src={src}
          alt={`${title} card artwork in Scarlet Skips`}
          width={native.width}
          height={native.height}
          unoptimized
          sizes={SIZES[size]}
        />
      ) : (
        <span className={styles.missing}>{title}</span>
      )}
    </span>
  );
}
