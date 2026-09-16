import Link from "next/link";
import styles from "@/style/layout/site-shell.module.css";

export function BrandMark() {
  return (
    <Link className={styles.brand} href="/" aria-label="Scarlet Skips Hub home">
      <svg aria-hidden="true" viewBox="0 0 42 48" width="31" height="36">
        <path className={styles.brandRope} d="M7 37C-2 25 4 9 18 7m17 30c9-12 3-28-8-30"/>
        <circle className={styles.brandFigure} cx="22" cy="11" r="4"/>
        <path className={styles.brandFigure} d="M18 17c3-2 7-2 10 0l2 9-8 5-7-6z"/>
        <path className={styles.brandBody} d="m17 21-8 8m20-8 6 8M20 30l-5 12m10-12 5 12"/>
        <circle className={styles.brandHandle} cx="8" cy="31" r="2.5"/><circle className={styles.brandHandle} cx="36" cy="31" r="2.5"/>
      </svg>
      <span><strong>Scarlet</strong> <b>Skips</b> <em>Hub</em></span>
    </Link>
  );
}
