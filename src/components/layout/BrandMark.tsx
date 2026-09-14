import Link from "next/link";
import styles from "@/style/layout/site-shell.module.css";

export function BrandMark() {
  return (
    <Link className={styles.brand} href="/" aria-label="Scarlet Skips Lab home">
      <svg aria-hidden="true" viewBox="0 0 42 48" width="31" height="36">
        <path className={styles.brandRope} d="M7 38C-1 27 2 11 13 7M35 38c8-11 5-27-6-31"/>
        <circle className={styles.brandFigure} cx="22" cy="7" r="4.5"/>
        <path className={styles.brandFigure} d="M17 13c3-3 9-3 11 1l2 9-6 5-8-5z"/>
        <path className={styles.brandBody} d="m18 19-7 9m15-8 8 7M19 27l-4 13m9-13 5 13"/>
        <circle className={styles.brandHandle} cx="9" cy="30" r="2.5"/><circle className={styles.brandHandle} cx="35" cy="29" r="2.5"/>
      </svg>
      <span><strong>Scarlet</strong> <b>Skips</b></span>
    </Link>
  );
}
