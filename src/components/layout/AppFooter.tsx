import Link from "next/link";
import { primaryNavigation, siteNavigation } from "@/config/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { siteConfig } from "@/config/site";
import styles from "@/style/layout/site-shell.module.css";

export function AppFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerMain}`}>
        <div className={styles.footerBrand}><BrandMark/><p>Learn the jump, compare cards, find a route for your next run, and see what changed in Scarlet Skips.</p></div>
        <div className={styles.footerNavGroup}><strong>Navigate</strong><nav className={styles.footerExplore} aria-label="Navigate">{primaryNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div>
        <div className={styles.footerNavGroup}><strong>Legal</strong><nav className={styles.footerSite} aria-label="Legal and site information">{siteNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div>
      </div>
      <div className={styles.footerBottom}><div className="container"><span>Copyright © {new Date().getUTCFullYear()} {siteConfig.name}. All rights reserved.</span><span>Independent fan site. Not affiliated with Yerk Games, YerkDiff, Valve or the official Scarlet Skips website.</span></div></div>
    </footer>
  );
}
