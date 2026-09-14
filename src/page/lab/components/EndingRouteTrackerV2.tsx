"use client";

import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { useLabState } from "@/lib/storage/lab-store";
import styles from "@/style/page/lab/lab-v2.module.css";

const steps = [
  ["Build progression", "Use early Luck or manageable rope growth without making the pattern unreadable."],
  ["Simplify the set", "Allow excess ropes to fall away until the remaining pattern is controllable."],
  ["Protect the ropes", "Take Reinforce Jump Rope before committing to the long height push."],
  ["Stack usable height", "Increase Jump Height while checking that each stack still creates useful loops."],
  ["Keep fire out", "The documented route avoids Ignite Jump Rope during the completion attempt."],
  ["Add fuel late", "Use Rocket Fuel only after natural airtime gives it a useful bridge."],
  ["Watch for the trigger", "Continue the controlled airtime loop and reveal the full ending guide only if needed."],
] as const;

export function EndingRouteTrackerV2() {
  const { state, update, recordToolUse } = useLabState();
  const count = state.endingProgress.filter(Boolean).length;
  function toggle(index: number) {
    update((current) => ({ ...current, endingProgress: current.endingProgress.map((value, currentIndex) => currentIndex === index ? !value : value) }));
    recordToolUse("ending-route");
  }
  return <div className={styles.routeTracker}>
    <div className={styles.routeProgress}><span>{count} / {steps.length} field checks</span><div><i style={{ width: `${count / steps.length * 100}%` }}/></div><p>Saved automatically in this browser.</p></div>
    <ol>{steps.map(([title, description], index) => <li key={title} className={state.endingProgress[index] ? styles.routeDone : ""}><button type="button" onClick={() => toggle(index)} aria-pressed={state.endingProgress[index]}><span>{state.endingProgress[index] ? <Icon name="check" size={18}/> : index + 1}</span><div><strong>{title}</strong><p>{description}</p></div></button></li>)}</ol>
    <div className={styles.cardActions}><Link href="/ending">Open the sourced ending guide <Icon name="arrow" size={15}/></Link><button className={styles.ghostButton} type="button" onClick={() => update((current) => ({ ...current, endingProgress: current.endingProgress.map(() => false) }))}>Reset checklist</button></div>
  </div>;
}
