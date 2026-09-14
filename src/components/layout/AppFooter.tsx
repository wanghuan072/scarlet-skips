import Link from "next/link";
import { primaryNavigation, siteNavigation } from "@/config/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { game } from "@/lib/data/content";
import styles from "@/style/layout/site-shell.module.css";

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerMain}`}>
        <div className={styles.footerBrand}><BrandMark/><p>Jump higher. Discover more.</p></div>
        <nav className={styles.footerExplore} aria-label="Explore">{primaryNavigation.slice(0, 7).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        <nav className={styles.footerSite} aria-label="Site information">{siteNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        <div className={styles.footerVersion}><strong>v{game.currentVersion}</strong><span>Checked {game.updatedDate}</span></div>
      </div>
      <div className={styles.footerBottom}><div className="container"><span>© 2026 Scarlet Skips Lab · Independent fan guide</span><span>Scarlet Skips © 2026 YerkDiff · Developer/publisher: Yerk Games</span></div></div>
    </footer>
  );
}
