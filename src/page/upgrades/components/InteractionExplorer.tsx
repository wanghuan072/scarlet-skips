"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { upgrades } from "@/lib/data/content";
import { interactions } from "@/lib/data/lab";
import styles from "@/style/page/upgrades/interaction-matrix.module.css";

export function InteractionExplorer() {
  const [first, setFirst] = useState("increase-jump-height");
  const [second, setSecond] = useState("upgrade-rocket-fuel");
  const interaction = interactions.find((item) => (item.upgradeA === first && item.upgradeB === second) || (item.upgradeA === second && item.upgradeB === first));
  const firstUpgrade = upgrades.find((upgrade) => upgrade.slug === first)!;
  const secondUpgrade = upgrades.find((upgrade) => upgrade.slug === second)!;
  const duplicate = first === second;

  return <div className={styles.explorer}>
    <div className={styles.pairControls}>
      <span className={styles.kicker}>Pair explorer</span><h2>Put two cards on the bench</h2><p>Six common pairings are documented. Every other pair stays visibly untested.</p>
      <label><span>First upgrade</span><select value={first} onChange={(event) => setFirst(event.target.value)}>{upgrades.map((upgrade) => <option key={upgrade.slug} value={upgrade.slug}>{upgrade.name}</option>)}</select></label>
      <div className={styles.plus}><Icon name="plus" size={20}/></div>
      <label><span>Second upgrade</span><select value={second} onChange={(event) => setSecond(event.target.value)}>{upgrades.map((upgrade) => <option key={upgrade.slug} value={upgrade.slug}>{upgrade.name}</option>)}</select></label>
      <div className={styles.cardPair}><span><Icon name={firstUpgrade.icon} size={27}/>{firstUpgrade.shortName}</span><Icon name="plus" size={18}/><span><Icon name={secondUpgrade.icon} size={27}/>{secondUpgrade.shortName}</span></div>
    </div>
    <section className={styles.pairResult} aria-live="polite">
      {duplicate ? <div className={styles.unknown}><Icon name="info" size={32}/><h2>Choose two different cards</h2><p>Stacking one card is covered on its upgrade page; this bench compares interactions between different effects.</p></div> : interaction ? <>
        <div className={styles.resultTop}><span>{interaction.status}</span><span>{interaction.evidenceStatus}</span></div>
        <h2>{firstUpgrade.shortName} + {secondUpgrade.shortName}</h2>
        <p className={styles.purpose}>{interaction.purpose}</p>
        <p>{interaction.description}</p>
        <div className={styles.resultGrid}><div><span>Best fit</span><strong>{interaction.goal.join(" · ")}</strong></div><div><span>Timing</span><strong>{interaction.stage.map((stage) => stage[0].toUpperCase() + stage.slice(1)).join(" · ")}</strong></div></div>
        <div className={styles.prerequisites}><span>Before you commit</span><ul>{interaction.prerequisites.map((item) => <li key={item}><Icon name="check" size={15}/>{item}</li>)}</ul></div>
        <p className={styles.risk}><Icon name="info" size={18}/><span><strong>Risk:</strong> {interaction.risk}</span></p>
        <div className={styles.resultLinks}><Link href={`/upgrades/${first}`}>Open {firstUpgrade.shortName}</Link><Link href={`/upgrades/${second}`}>Open {secondUpgrade.shortName}</Link></div>
        <small>Evidence: {interaction.evidenceStatus} · checked for v{interaction.verifiedVersion}</small>
      </> : <div className={styles.unknown}><Icon name="flask" size={34}/><span>Untested pair</span><h2>No documented interaction yet</h2><p>That does not mean the pair is bad. It means the current sources do not support a confident description.</p><Link href="/lab/my-runs">Test it and keep a local note <Icon name="arrow" size={15}/></Link></div>}
    </section>
  </div>;
}
