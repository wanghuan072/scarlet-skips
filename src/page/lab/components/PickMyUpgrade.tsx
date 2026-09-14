"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { upgrades } from "@/lib/data/content";
import { rankUpgradeChoices } from "@/lib/recommendation/pick-upgrade";
import { useLabState } from "@/lib/storage/lab-store";
import type { RunGoal, RunStage } from "@/types/lab";
import styles from "@/style/page/lab/lab-v2.module.css";

const goalOptions: { value: RunGoal; label: string }[] = [
  { value: "ending", label: "Reach the ending" },
  { value: "high-score", label: "Push score" },
  { value: "survival", label: "Stabilize the run" },
  { value: "challenge", label: "Complete a challenge" },
  { value: "general", label: "Build airtime" },
];

export function PickMyUpgrade({ compact = false }: { compact?: boolean }) {
  const [goal, setGoal] = useState<RunGoal>("ending");
  const [stage, setStage] = useState<RunStage>("mid");
  const [ropeCount, setRopeCount] = useState(2);
  const [advanced, setAdvanced] = useState(!compact);
  const [choiceSlugs, setChoiceSlugs] = useState([upgrades[0].slug, upgrades[1].slug, upgrades[2].slug]);
  const [stacks, setStacks] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { recordToolUse } = useLabState();
  const unique = new Set(choiceSlugs).size === choiceSlugs.length;
  const choices = choiceSlugs.map((slug) => upgrades.find((upgrade) => upgrade.slug === slug)).filter((item) => item !== undefined);
  const ranked = useMemo(() => rankUpgradeChoices(choices, { goal, stage, ropeCount, stacks }), [choices, goal, stage, ropeCount, stacks]);

  function decide() {
    if (!unique) return;
    setSubmitted(true);
    recordToolUse("pick-my-upgrade");
  }

  return (
    <div className={`${styles.picker} ${compact ? styles.compactPicker : ""}`}>
      <div className={styles.pickerIntro}>
        <span className={styles.kicker}><Icon name="cards" size={15}/> Three cards in. One clear decision out.</span>
        <h2>{compact ? "What did the game offer?" : "Pick My Upgrade"}</h2>
        <p>Compare the cards in front of you—not an imaginary perfect draw.</p>
      </div>
      <div className={styles.choiceGrid}>
        {choiceSlugs.map((slug, index) => <label key={index}><span>Choice {index + 1}</span><select value={slug} onChange={(event) => { const next = [...choiceSlugs]; next[index] = event.target.value; setChoiceSlugs(next); setSubmitted(false); }}>{upgrades.map((upgrade) => <option key={upgrade.slug} value={upgrade.slug}>{upgrade.name}</option>)}</select></label>)}
      </div>
      <div className={styles.contextRow}>
        <label><span>Your goal</span><select value={goal} onChange={(event) => { setGoal(event.target.value as RunGoal); setSubmitted(false); }}>{goalOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        {!compact && <button className={styles.advancedToggle} type="button" onClick={() => setAdvanced((value) => !value)} aria-expanded={advanced}>{advanced ? "Hide run context" : "Add run context"}<Icon name={advanced ? "minus" : "plus"} size={16}/></button>}
      </div>
      {advanced && <div className={styles.advancedPanel}>
        <label><span>Run stage</span><select value={stage} onChange={(event) => { setStage(event.target.value as RunStage); setSubmitted(false); }}><option value="early">Early</option><option value="mid">Mid</option><option value="late">Late</option></select></label>
        <label><span>Active ropes</span><input type="number" min="1" max="8" value={ropeCount} onChange={(event) => { setRopeCount(Math.max(1, Number(event.target.value))); setSubmitted(false); }}/></label>
        <fieldset><legend>Already in the run</legend><div className={styles.stackGrid}>{upgrades.map((upgrade) => <label key={upgrade.slug}><input type="checkbox" checked={(stacks[upgrade.slug] ?? 0) > 0} onChange={(event) => { setStacks((current) => ({ ...current, [upgrade.slug]: event.target.checked ? 1 : 0 })); setSubmitted(false); }}/><span>{upgrade.shortName}</span></label>)}</div></fieldset>
      </div>}
      {!unique && <p className={styles.formError}>Each offered card must be different.</p>}
      <button className={styles.primaryAction} type="button" onClick={decide} disabled={!unique}>Compare these cards <Icon name="arrow" size={17}/></button>

      {submitted && ranked.length === 3 && <section className={styles.decisionResult} aria-live="polite">
        <div className={styles.resultLead}><span className={styles.resultRank}>Best fit now</span><span className={styles.evidenceTag}>{ranked[0].upgrade.sourceStatus}</span></div>
        <div className={styles.resultTitle}><span className={`${styles.upgradeIcon} ${styles[`tone${ranked[0].upgrade.color}`]}`}><Icon name={ranked[0].upgrade.icon} size={28}/></span><div><h3>{ranked[0].upgrade.name}</h3><strong>{ranked[0].confidence}</strong></div></div>
        <ul>{ranked[0].reasons.map((reason) => <li key={reason}><Icon name="check" size={15}/>{reason}</li>)}</ul>
        <p className={styles.resultCaution}><Icon name="info" size={17}/><span><strong>Watch for:</strong> {ranked[0].risk}</span></p>
        <p className={styles.resultChange}><strong>Change the call when:</strong> {ranked[0].changeCondition}</p>
        <div className={styles.alternatives}><span>Second choice</span><Link href={`/upgrades/${ranked[1].upgrade.slug}`}>{ranked[1].upgrade.name}</Link><span>Riskier here</span><Link href={`/upgrades/${ranked[2].upgrade.slug}`}>{ranked[2].upgrade.name}</Link></div>
      </section>}
    </div>
  );
}
