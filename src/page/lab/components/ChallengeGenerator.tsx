"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { filterChallenges } from "@/lib/challenges/daily";
import { challenges } from "@/lib/data/lab";
import { useLabState } from "@/lib/storage/lab-store";
import type { ChallengeDifficulty, ChallengeGoal, ChallengeStatus } from "@/types/lab";
import styles from "@/style/page/lab/lab-v2.module.css";

export function ChallengeGenerator({ initialChallengeId }: { initialChallengeId?: string }) {
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty | "Any">("Any");
  const [goal, setGoal] = useState<ChallengeGoal | "Any">("Any");
  const [index, setIndex] = useState(() => Math.max(0, challenges.findIndex((challenge) => challenge.id === initialChallengeId)));
  const { state, update, recordToolUse } = useLabState();
  const pool = useMemo(() => filterChallenges(challenges, { difficulty, goal }), [difficulty, goal]);
  const challenge = pool[index % Math.max(pool.length, 1)];
  const progress = challenge ? state.challengeProgress.find((item) => item.challengeId === challenge.id) : undefined;

  function generate() {
    setIndex((value) => pool.length > 1 ? (value + 1) % pool.length : 0);
    recordToolUse("challenge-generator");
  }

  function setStatus(status: ChallengeStatus) {
    if (!challenge) return;
    update((current) => {
      const prior = current.challengeProgress.find((item) => item.challengeId === challenge.id);
      return { ...current, challengeProgress: [...current.challengeProgress.filter((item) => item.challengeId !== challenge.id), { challengeId: challenge.id, status, attempts: status === "started" ? (prior?.attempts ?? 0) + 1 : Math.max(1, prior?.attempts ?? 0), updatedAt: new Date().toISOString() }] };
    });
  }

  return (
    <div className={styles.generatorLayout}>
      <aside className={styles.generatorControls}>
        <span className={styles.kicker}>Challenge filters</span>
        <h2>Shape the next run</h2>
        <label><span>Difficulty</span><select value={difficulty} onChange={(event) => { setDifficulty(event.target.value as ChallengeDifficulty | "Any"); setIndex(0); }}><option>Any</option><option>Easy</option><option>Normal</option><option>Hard</option><option>Chaos</option></select></label>
        <label><span>Goal</span><select value={goal} onChange={(event) => { setGoal(event.target.value as ChallengeGoal | "Any"); setIndex(0); }}><option>Any</option><option>Score</option><option>Ending</option><option>Survival</option></select></label>
        <button className={styles.primaryAction} type="button" onClick={generate}><Icon name="spark" size={17}/> Give me another</button>
        <p className={styles.mutedNote}>{pool.length} hand-built templates match. The tool selects among authored rules; it does not invent random constraints.</p>
      </aside>
      {challenge ? <article className={styles.generatedChallenge}>
        <div className={styles.cardMeta}><span className={styles.kicker}>{challenge.type}</span><span className={`${styles.difficulty} ${styles[`difficulty${challenge.difficulty}`]}`}>{challenge.difficulty}</span></div>
        <h2>{challenge.name}</h2>
        <p className={styles.bigTarget}>{challenge.target}</p>
        <p>{challenge.description}</p>
        <div className={styles.fieldBlock}><span>Run rules</span><ol>{challenge.rules.map((rule) => <li key={rule}>{rule}</li>)}</ol></div>
        <div className={styles.bonusBlock}><Icon name="award" size={22}/><div><span>Bonus objective</span><strong>{challenge.bonusObjective}</strong></div></div>
        <div className={styles.directionBlock}><span>Recommended direction</span><p>{challenge.recommendedDirection}</p></div>
        <div className={styles.cardActions}>
          {progress?.status !== "started" && progress?.status !== "completed" && <button type="button" onClick={() => setStatus("started")}>Start this challenge</button>}
          {progress?.status === "started" && <><button type="button" onClick={() => setStatus("completed")}>Mark complete</button><button className={styles.ghostButton} type="button" onClick={() => setStatus("failed")}>End attempt</button></>}
          {progress?.status === "completed" && <span className={styles.completeState}><Icon name="check" size={17}/> Completed locally</span>}
          <Link href="/lab/my-runs">Record a run <Icon name="arrow" size={15}/></Link>
        </div>
        <small>Fan-made challenge · designed for game version {challenge.gameVersion}</small>
      </article> : <div className={styles.emptyState}><h2>No exact match</h2><p>Broaden one filter to see an authored challenge.</p></div>}
    </div>
  );
}
