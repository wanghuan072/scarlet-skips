"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/common/Icon";
import { goals, rankUpgrades, type GoalId } from "@/lib/recommendation/build-score";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/run-lab/run-lab.module.css";

export function BuildPlanner({ upgrades }: { upgrades: Upgrade[] }) {
  const [goal, setGoal] = useState<GoalId>("ending");
  const [stacks, setStacks] = useState<Record<string, number>>({});
  const ranking = useMemo(() => rankUpgrades(upgrades, goal, stacks), [goal, stacks, upgrades]);
  const selected = upgrades.filter((upgrade) => (stacks[upgrade.slug] ?? 0) > 0);
  const strengths = ranking.filter((item) => (stacks[item.upgrade.slug] ?? 0) > 0 && item.score >= 4).slice(0, 3);
  const recommendations = ranking.filter((item) => (stacks[item.upgrade.slug] ?? 0) === 0).slice(0, 3);
  const avoid = ranking.filter((item) => item.score <= 1.5).slice(0, 3);

  function adjust(slug: string, amount: number) {
    setStacks((current) => ({ ...current, [slug]: Math.max(0, Math.min(9, (current[slug] ?? 0) + amount)) }));
  }

  return (
    <div className={styles.planner}>
      <section className={styles.toolSection} aria-labelledby="choose-goal">
        <div className={styles.toolStep}><span>01</span><div><h2 id="choose-goal">Choose your goal</h2><p>The same card can be excellent for one route and disruptive for another.</p></div></div>
        <div className={styles.goalPicker}>{goals.map((item) => <button type="button" key={item.id} aria-pressed={goal === item.id} onClick={() => setGoal(item.id)}><Icon name={item.id === "ending" ? "route" : item.id === "high-score" ? "trophy" : item.id === "beginner" ? "controller" : item.id === "airtime" ? "rocket" : "spark"} size={24}/><span><strong>{item.label}</strong><small>{item.description}</small></span></button>)}</div>
      </section>
      <section className={styles.toolSection} aria-labelledby="current-upgrades">
        <div className={styles.toolStep}><span>02</span><div><h2 id="current-upgrades">Add current upgrades</h2><p>Stacks are capped at nine in this planning interface; that cap is not a game claim.</p></div></div>
        <div className={styles.stackGrid}>{upgrades.map((upgrade) => <article key={upgrade.slug}><span className={styles.stackIcon}><Icon name={upgrade.icon} size={26}/></span><div><strong>{upgrade.shortName}</strong><small>{upgrade.category}</small></div><div className={styles.stepper}><button type="button" aria-label={`Remove one ${upgrade.name} stack`} disabled={!stacks[upgrade.slug]} onClick={() => adjust(upgrade.slug, -1)}><Icon name="minus" size={17}/></button><output aria-label={`${upgrade.name} stacks`}>{stacks[upgrade.slug] ?? 0}</output><button type="button" aria-label={`Add one ${upgrade.name} stack`} onClick={() => adjust(upgrade.slug, 1)}><Icon name="plus" size={17}/></button></div></article>)}</div>
      </section>
      <section className={`${styles.toolSection} ${styles.analysis}`} aria-labelledby="build-analysis">
        <div className={styles.toolStep}><span>03</span><div><h2 id="build-analysis">Build analysis</h2><p>Rule-based suggestions use goal fit, documented synergies and your current stacks.</p></div></div>
        <div className={styles.analysisHero}><span><Icon name={goal === "ending" ? "route" : goal === "high-score" ? "trophy" : goal === "airtime" ? "rocket" : goal === "beginner" ? "controller" : "spark"} size={32}/></span><div><small>CURRENT DIRECTION</small><h3>{goals.find((item) => item.id === goal)?.label} build</h3><p>{selected.length ? `${selected.length} documented card types · ${Object.values(stacks).reduce((sum, count) => sum + count, 0)} total planned stacks` : "Add at least one upgrade to compare your current shape with the goal."}</p></div></div>
        <div className={styles.analysisGrid}>
          <div><h3><Icon name="check" size={20}/>Strengths</h3>{strengths.length ? <ul>{strengths.map((item) => <li key={item.upgrade.slug}><strong>{item.upgrade.shortName}</strong><span>{item.reasons[0]}</span></li>)}</ul> : <p>No goal-aligned strength yet. Add one of the recommended foundation cards.</p>}</div>
          <div><h3><Icon name="arrow" size={20}/>Recommended next picks</h3><ul>{recommendations.map((item) => <li key={item.upgrade.slug}><strong>{item.upgrade.shortName}</strong><span>{item.reasons.join(" · ")}</span></li>)}</ul></div>
          <div><h3><Icon name="x" size={20}/>Low priority now</h3>{avoid.length ? <ul>{avoid.map((item) => <li key={item.upgrade.slug}><strong>{item.upgrade.shortName}</strong><span>Low fit for the selected goal at this stage.</span></li>)}</ul> : <p>No documented card is an automatic avoid for this goal.</p>}</div>
        </div>
        <p className={styles.disclaimer}><Icon name="info" size={16}/>Recommendations are strategy suggestions, not guaranteed optimal choices. Unknown game values are not part of the score.</p>
      </section>
    </div>
  );
}
