"use client";

import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { getDailyChallenge, getUtcDateKey } from "@/lib/challenges/daily";
import { challenges } from "@/lib/data/lab";
import { useLabState } from "@/lib/storage/lab-store";
import type { ChallengeStatus } from "@/types/lab";
import styles from "@/style/page/lab/lab-v2.module.css";

export function DailyChallengePanel({ compact = false }: { compact?: boolean }) {
  const challenge = getDailyChallenge(challenges);
  const dateKey = getUtcDateKey();
  const { state, update } = useLabState();
  const progress = state.challengeProgress.find((item) => item.challengeId === `${dateKey}:${challenge.id}`);

  function setStatus(status: ChallengeStatus) {
    update((current) => {
      const id = `${dateKey}:${challenge.id}`;
      const prior = current.challengeProgress.find((item) => item.challengeId === id);
      const next = {
        challengeId: id,
        status,
        attempts: status === "started" ? (prior?.attempts ?? 0) + 1 : Math.max(1, prior?.attempts ?? 0),
        updatedAt: new Date().toISOString(),
      };
      return { ...current, challengeProgress: [...current.challengeProgress.filter((item) => item.challengeId !== id), next] };
    });
  }

  return (
    <article className={`${styles.dailyCard} ${compact ? styles.compactDaily : ""}`}>
      <div className={styles.cardMeta}>
        <span className={styles.kicker}><Icon name="calendar" size={15}/> Daily / {dateKey}</span>
        <span className={`${styles.difficulty} ${styles[`difficulty${challenge.difficulty}`]}`}>{challenge.difficulty}</span>
      </div>
      <h3>{challenge.name}</h3>
      <p className={styles.challengeTarget}>{challenge.target}</p>
      {!compact && <p>{challenge.description}</p>}
      <ul className={styles.ruleList}>
        {challenge.rules.slice(0, compact ? 2 : 3).map((rule) => <li key={rule}><Icon name="check" size={15}/>{rule}</li>)}
      </ul>
      <div className={styles.cardActions}>
        {progress?.status !== "started" && progress?.status !== "completed" && <button type="button" onClick={() => setStatus("started")}>Start attempt</button>}
        {progress?.status === "started" && <><button type="button" onClick={() => setStatus("completed")}>Mark complete</button><button className={styles.ghostButton} type="button" onClick={() => setStatus("failed")}>End attempt</button></>}
        {progress?.status === "completed" && <span className={styles.completeState}><Icon name="check" size={17}/> Completed locally</span>}
        <Link href="/challenges/daily">Open details <Icon name="arrow" size={15}/></Link>
      </div>
    </article>
  );
}
