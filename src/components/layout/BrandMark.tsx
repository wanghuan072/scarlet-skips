import Image from "next/image";
import Link from "next/link";
import styles from "@/style/layout/site-shell.module.css";

export function BrandMark({ size = "header" }: { size?: "header" | "footer" }) {
  const px = size === "footer" ? 56 : 40;
  return (
    <Link className={styles.brand} data-size={size} href="/" aria-label="Scarlet Skips Hub home">
      <Image
        src="/images/logo.png"
        alt=""
        width={px}
        height={px}
        className={styles.brandLogo}
        priority={size === "header"}
      />
      <span><strong>Scarlet</strong> <b>Skips</b> <em>Hub</em></span>
    </Link>
  );
}
