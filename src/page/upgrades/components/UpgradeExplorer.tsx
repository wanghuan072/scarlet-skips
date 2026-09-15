"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/upgrades/upgrades.module.css";

export function UpgradeExplorer({ upgrades }: { upgrades: Upgrade[] }) {
  const categories = ["All", ...Array.from(new Set(upgrades.map((upgrade) => upgrade.category)))];
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => category === "All" ? upgrades : upgrades.filter((upgrade) => upgrade.category === category), [category, upgrades]);

  return (
    <div>
      <div className={styles.filterRow} role="group" aria-label="Filter upgrades by category">
        {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className={styles.resultCount} aria-live="polite">{filtered.length} cards · choose one to see the stack-by-stack guide</p>
      <div className={styles.explorerGrid}>
        {filtered.map((upgrade) => <Link className={styles.upgradeTile} key={upgrade.slug} href={`/upgrades/${upgrade.slug}`} data-tone={upgrade.color}>
          <span className={styles.tileIcon}><Icon name={upgrade.icon} size={30}/></span>
          <span className={styles.tileTop}><small>{upgrade.category}</small><strong>{upgrade.shortName}</strong></span>
          <span className={styles.tileEffect}>{upgrade.effect}</span>
          <span className={styles.tileFacts}><span><b>Best time</b>{upgrade.bestTiming}</span><span><b>Stacks</b>{upgrade.stackable.startsWith("Yes") ? "Yes" : "Situational"}</span></span>
          <span className={styles.tileLink}>See what each stack does <Icon name="arrow" size={16}/></span>
        </Link>)}
      </div>
    </div>
  );
}
