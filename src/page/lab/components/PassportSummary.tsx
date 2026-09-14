"use client";

import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { getPassportSummary } from "@/lib/passport/progress";
import { useLabState } from "@/lib/storage/lab-store";
import styles from "@/style/page/lab/lab-v2.module.css";

export function PassportSummary({ detailed = false }: { detailed?: boolean }) {
  const { state, loaded } = useLabState();
  const summary = getPassportSummary(state);
  const items = [
    { icon: "target" as const, value: summary.completedChallenges, label: "challenges" },
    { icon: "trophy" as const, value: summary.personalBest ? summary.personalBest.toLocaleString() : "—", label: "personal best" },
    { icon: "route" as const, value: summary.endingComplete ? "Yes" : "Not yet", label: "ending" },
    { icon: "award" as const, value: summary.badges, label: "badges" },
  ];

  return (
    <aside className={styles.passportCard} aria-busy={!loaded}>
      <div className={styles.passportTop}>
        <div><span className={styles.kicker}>Local player passport</span><h3>Your field notes</h3></div>
        <span className={styles.localTag}>This device</span>
      </div>
      <div className={styles.passportGrid}>
        {items.map((item) => <div key={item.label}><Icon name={item.icon} size={19}/><strong>{loaded ? item.value : "—"}</strong><span>{item.label}</span></div>)}
      </div>
      {detailed && <p className={styles.mutedNote}>Runs stay in this browser. Nothing is uploaded and these are not global records.</p>}
      <Link className={styles.textLink} href="/lab/my-runs">Open my runs <Icon name="arrow" size={15}/></Link>
    </aside>
  );
}
