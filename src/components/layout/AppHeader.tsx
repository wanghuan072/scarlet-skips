"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavigation } from "@/config/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { SearchBox } from "@/components/navigation/SearchBox";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/layout/site-shell.module.css";

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <BrandMark />
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {primaryNavigation.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className={styles.headerSearch}><SearchBox /></div>
        <button className={styles.menuButton} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <Icon name={open ? "x" : "menu"} size={25}/>
        </button>
      </div>
      {open && (
        <div className={styles.mobilePanel}>
          <div className="container">
            <SearchBox />
            <nav aria-label="Mobile navigation">
              {primaryNavigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<Icon name="arrow" size={17}/></Link>)}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
