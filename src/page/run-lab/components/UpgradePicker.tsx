"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { goals, rankUpgrades, type GoalId } from "@/lib/recommendation/build-score";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/run-lab/run-lab.module.css";

export function UpgradePicker({ upgrades }: { upgrades: Upgrade[] }) {
  const [goal, setGoal] = useState<GoalId>("high-score");
  const [choices, setChoices] = useState([upgrades[0].slug, upgrades[1].slug, upgrades[2].slug]);
  const selected = choices.map((slug) => upgrades.find((upgrade) => upgrade.slug === slug)).filter((upgrade): upgrade is Upgrade => Boolean(upgrade));
  const ranked = rankUpgrades(selected, goal);

  function setChoice(index: number, slug: string) {
    setChoices((current) => current.map((value, currentIndex) => currentIndex === index ? slug : value));
  }

  return (
    <div className={styles.pickerLayout}>
      <section className={styles.pickerInput}>
        <h2>Set the decision</h2>
        <label><span>Current goal</span><select value={goal} onChange={(event) => setGoal(event.target.value as GoalId)}>{goals.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        {choices.map((choice, index) => <label key={index}><span>Option {String.fromCharCode(65 + index)}</span><select value={choice} onChange={(event) => setChoice(index, event.target.value)}>{upgrades.map((upgrade) => <option key={upgrade.slug} value={upgrade.slug}>{upgrade.name}</option>)}</select></label>)}
        {new Set(choices).size < 3 && <p className={styles.inlineWarning}><Icon name="info" size={16}/>Choose three different cards for a useful comparison.</p>}
      </section>
      <section className={styles.pickerResult} aria-live="polite">
        <div className={styles.resultTitle}><span><Icon name="target" size={27}/></span><div><small>RECOMMENDED PICK</small><h2>{ranked[0]?.upgrade.name}</h2><p>For: {goals.find((item) => item.id === goal)?.label}</p></div></div>
        <div className={styles.resultCards}>{ranked.map((item, index) => <article key={`${item.upgrade.slug}-${index}`} data-rank={index + 1}><span className={styles.rank}>{index === 0 ? "Best fit" : index === 1 ? "Second" : "Lower priority"}</span><div className={styles.resultUpgrade}><span><Icon name={item.upgrade.icon} size={28}/></span><div><h3>{item.upgrade.shortName}</h3><p>{item.upgrade.effect}</p></div></div><ul>{item.reasons.map((reason) => <li key={reason}><Icon name="check" size={15}/>{reason}</li>)}</ul></article>)}</div>
        <p className={styles.disclaimer}><Icon name="info" size={16}/>Recommendations are strategy suggestions rather than guaranteed optimal choices. Duplicate selections and undocumented numeric values are excluded from the logic.</p>
      </section>
    </div>
  );
}
