import Link from "next/link";
import { primaryNavigation, resourceNavigation, siteNavigation } from "@/config/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { game } from "@/lib/data/content";
import styles from "@/style/layout/site-shell.module.css";

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerMain}`}>
        <div className={styles.footerBrand}><BrandMark/><p>Jump higher. Discover more.</p></div>
        <div className={styles.footerNavGroup}><strong>Explore</strong><nav className={styles.footerExplore} aria-label="Explore">{primaryNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div>
        <div className={styles.footerNavGroup}><strong>Resources</strong><nav className={styles.footerSite} aria-label="Resources">{resourceNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div>
        <div className={styles.footerNavGroup}><strong>Site</strong><nav className={styles.footerSite} aria-label="Site information">{siteNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div>
        <div className={styles.footerVersion}><strong>v{game.currentVersion}</strong><span>Checked {game.updatedDate}</span></div>
      </div>
      <div className={styles.footerBottom}><div className="container"><span>© 2026 Scarlet Skips Guide · Independent fan site</span><span>Scarlet Skips © 2026 YerkDiff · Developer/publisher: Yerk Games</span></div></div>
    </footer>
  );
}
