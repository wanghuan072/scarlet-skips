"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/config/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { SearchBox } from "@/components/navigation/SearchBox";
import { Icon } from "@/components/common/Icon";
import type { SearchSuggestion } from "@/lib/data/search-index";
import styles from "@/style/layout/site-shell.module.css";

const headerNavigation = primaryNavigation;

export function AppHeader({ version, searchIndex }: { version: string; searchIndex: SearchSuggestion[] }) {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menu, setMenu] = useState({ pathname, open: false });
  const open = menu.pathname === pathname && menu.open;
  const closeMenu = () => setMenu({ pathname, open: false });
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const onBuilds = pathname.startsWith("/builds");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu({ pathname, open: false });
        menuButtonRef.current?.focus();
      }
    };
    const media = window.matchMedia("(max-width: 1024px)");
    const onViewport = () => {
      if (!media.matches) setMenu({ pathname, open: false });
    };
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLAnchorElement>("#site-menu nav a")?.focus();
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onViewport);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onViewport);
    };
  }, [open, pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.rope} aria-hidden="true" />
      <div className={`container ${styles.headerInner}`}>
        <BrandMark />
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {headerNavigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              <Icon name={item.icon} size={15} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerTools}>
          <div className={styles.headerSearch}>
            <SearchBox index={searchIndex} />
          </div>
          <Link className={styles.versionChip} href="/updates" title="Current guide baseline">
            v{version}
          </Link>
          <Link className={styles.playCta} href="/builds#simulator" data-current={onBuilds ? "true" : undefined}>
            {onBuilds ? "Jump in" : "Play a run"}
            <Icon name="controller" size={16} />
          </Link>
          <button
            className={styles.menuButton}
            ref={menuButtonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setMenu({ pathname, open: !open })}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {open ? (
        <div className={styles.mobilePanel} id="site-menu">
          <div className="container">
            <p className={styles.mobileEyebrow}>Jump to</p>
            <nav aria-label="Mobile navigation">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={closeMenu}
                >
                  <span className={styles.navIcon}><Icon name={item.icon} size={20} /></span>
                  {item.label}
                  <Icon name="arrow" size={16} />
                </Link>
              ))}
            </nav>
            <SearchBox index={searchIndex} inputId="mobile-site-search" />
            <Link className={styles.mobilePlay} href="/builds#simulator" onClick={closeMenu}>
              Play a run
              <Icon name="controller" size={18} />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
