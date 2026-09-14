"use client";

import { useMemo, useState } from "react";
import { UpgradeCard } from "@/components/common/UpgradeCard";
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
      <p className={styles.resultCount} aria-live="polite">Showing {filtered.length} documented card{filtered.length === 1 ? "" : "s"}</p>
      <div className={styles.explorerGrid}>{filtered.map((upgrade) => <UpgradeCard key={upgrade.slug} upgrade={upgrade}/>)}</div>
    </div>
  );
}
