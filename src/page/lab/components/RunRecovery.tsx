"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { analyzerRules } from "@/lib/data/lab";
import { upgrades } from "@/lib/data/content";
import { useLabState } from "@/lib/storage/lab-store";
import type { RunGoal, RunStage } from "@/types/lab";
import styles from "@/style/page/lab/lab-v2.module.css";

export function RunRecovery() {
  const [goal, setGoal] = useState<RunGoal>("survival");
  const [stage, setStage] = useState<RunStage>("mid");
  const [ropeCount, setRopeCount] = useState(2);
  const [problem, setProblem] = useState("landing");
  const [submitted, setSubmitted] = useState(false);
  const { recordToolUse } = useLabState();
  const rule = analyzerRules.find((item) => item.id === problem) ?? analyzerRules[0];
  const recommendations = useMemo(() => rule.recommended.map((slug) => upgrades.find((upgrade) => upgrade.slug === slug)).filter((item) => item !== undefined), [rule]);
  const avoid = useMemo(() => rule.avoid.map((slug) => upgrades.find((upgrade) => upgrade.slug === slug)).filter((item) => item !== undefined), [rule]);

  function diagnose() {
    setSubmitted(true);
    recordToolUse("run-recovery");
  }

  return <div className={styles.recoveryLayout}>
    <form className={styles.recoveryForm} onSubmit={(event) => { event.preventDefault(); diagnose(); }}>
      <span className={styles.kicker}>60-second run check</span><h2>What changed?</h2>
      <label><span>Main goal</span><select value={goal} onChange={(event) => setGoal(event.target.value as RunGoal)}><option value="survival">Stabilize the run</option><option value="ending">Reach the ending</option><option value="high-score">Push score</option><option value="challenge">Complete a challenge</option><option value="general">Build airtime</option></select></label>
      <div className={styles.splitFields}><label><span>Stage</span><select value={stage} onChange={(event) => setStage(event.target.value as RunStage)}><option value="early">Early</option><option value="mid">Mid</option><option value="late">Late</option></select></label><label><span>Active ropes</span><input type="number" min="1" max="8" value={ropeCount} onChange={(event) => setRopeCount(Math.max(1, Number(event.target.value)))}/></label></div>
      <fieldset><legend>What is going wrong?</legend><div className={styles.problemGrid}>{analyzerRules.map((item) => <label key={item.id}><input type="radio" name="problem" value={item.id} checked={problem === item.id} onChange={() => { setProblem(item.id); setSubmitted(false); }}/><span>{item.problem}</span></label>)}</div></fieldset>
      <button className={styles.primaryAction} type="submit">Build a recovery plan <Icon name="arrow" size={17}/></button>
    </form>
    <section className={styles.recoveryResult} aria-live="polite">
      {!submitted ? <div className={styles.resultPlaceholder}><Icon name="gauge" size={36}/><h2>Diagnose the bottleneck</h2><p>This tool will recommend the next direction, not claim to predict the run.</p></div> : <>
        <span className={styles.kicker}>Current bottleneck</span><h2>{rule.bottleneck}</h2><p>{rule.reason}</p>
        {ropeCount >= 4 && <p className={styles.resultCaution}><Icon name="info" size={17}/><span>Four or more ropes adds pattern complexity. Protect the active set before adding pressure.</span></p>}
        <div className={styles.recommendRow}><div><span>Prioritize</span>{recommendations.map((upgrade, index) => <Link key={upgrade.slug} href={`/upgrades/${upgrade.slug}`}><b>{index + 1}</b><Icon name={upgrade.icon} size={20}/><span>{upgrade.shortName}</span></Link>)}</div><div><span>Avoid for now</span>{avoid.length ? avoid.map((upgrade) => <Link key={upgrade.slug} href={`/upgrades/${upgrade.slug}`}><Icon name="x" size={17}/><span>{upgrade.shortName}</span></Link>) : <p>No automatic avoid; choose by {goal.replace("-", " ")} fit.</p>}</div></div>
        <div className={styles.fieldBlock}><span>Three-step reset</span><ol>{rule.recoveryPlan.map((step) => <li key={step}>{step}</li>)}</ol></div>
        <small>Context: {stage} run · {ropeCount} active rope{ropeCount === 1 ? "" : "s"} · goal: {goal.replace("-", " ")}</small>
      </>}
    </section>
  </div>;
}
