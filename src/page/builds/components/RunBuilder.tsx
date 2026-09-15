"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { upgrades } from "@/lib/data/content";
import type { IconName, Upgrade } from "@/types/content";
import styles from "@/style/page/builds/run-builder.module.css";

type Phase = "jumping" | "choosing" | "finished";

const MOON_HEIGHT = 1_000;

const simulatedEffects: Record<string, { icon: IconName; detail: string; change: string }> = {
  "increase-jump-height": { icon: "shoe", detail: "Adds more altitude after every level-up.", change: "+18 m level-up height" },
  "increase-luck": { icon: "clover", detail: "Makes the next upgrade come a little sooner.", change: "−1 circle to the next level" },
  "upgrade-rocket-fuel": { icon: "rocket", detail: "Adds a fuel-assisted lift after every level-up.", change: "+12 m level-up height" },
  "add-jump-rope": { icon: "rope", detail: "Adds another active rope and more score per cleared circle.", change: "+1 rope · +5 score/circle" },
  "reinforce-jump-rope": { icon: "shield", detail: "Adds one protection charge to the rope set.", change: "+1 rope shield" },
  "increase-jump-rope-speed": { icon: "speed", detail: "Lets one jump action clear more circles, but raises pressure.", change: "+1 speed" },
  "ignite-jump-rope": { icon: "fire", detail: "Adds a visible score multiplier to every cleared circle.", change: "+1 fire multiplier" },
  "extinguish-jump-rope": { icon: "minus", detail: "Removes one fire layer when a run needs control.", change: "−1 fire multiplier" },
};

function countPicks(picks: string[]) {
  return picks.reduce<Record<string, number>>((result, slug) => ({ ...result, [slug]: (result[slug] ?? 0) + 1 }), {});
}

function cardDraw(level: number, picks: string[]) {
  const seed = picks.reduce((total, slug) => total + slug.length, level * 7);
  const draw: Upgrade[] = [];
  for (let index = 0; draw.length < 3; index += 1) {
    const candidate = upgrades[(seed + index * 3) % upgrades.length];
    if (!draw.some((item) => item.slug === candidate.slug)) draw.push(candidate);
  }
  return draw;
}

export function RunBuilder() {
  const [phase, setPhase] = useState<Phase>("jumping");
  const [level, setLevel] = useState(1);
  const [circles, setCircles] = useState(0);
  const [height, setHeight] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [lastUpgrade, setLastUpgrade] = useState<string | null>(null);
  const [lastChange, setLastChange] = useState("Start jumping to fill the first upgrade meter.");

  const stacks = useMemo(() => countPicks(picks), [picks]);
  const ropes = 1 + (stacks["add-jump-rope"] ?? 0);
  const speed = stacks["increase-jump-rope-speed"] ?? 0;
  const fire = Math.max(0, (stacks["ignite-jump-rope"] ?? 0) - (stacks["extinguish-jump-rope"] ?? 0));
  const shields = stacks["reinforce-jump-rope"] ?? 0;
  const luck = stacks["increase-luck"] ?? 0;
  const jumpHeightBonus = (stacks["increase-jump-height"] ?? 0) * 18;
  const fuelHeightBonus = (stacks["upgrade-rocket-fuel"] ?? 0) * 12;
  const targetCircles = Math.max(8, 10 + level * 2 - luck);
  const draw = useMemo(() => cardDraw(level, picks), [level, picks]);
  const jumpActionCircles = 1 + Math.floor(speed / 2);
  const pressure = Math.min(100, Math.round((ropes - 1) * 13 + speed * 10 + fire * 12));
  const progress = Math.min(100, Math.round((circles / targetCircles) * 100));
  const moonProgress = Math.min(100, Math.round((height / MOON_HEIGHT) * 100));

  function jump(requestedCircles: number) {
    if (phase !== "jumping") return;
    const cleared = Math.min(targetCircles - circles, requestedCircles * jumpActionCircles);
    const scorePerCircle = (10 + ropes * 5) * (1 + fire);
    const nextCircles = circles + cleared;
    setCircles(nextCircles);
    setScore((current) => current + cleared * scorePerCircle);
    setLastChange(`Cleared ${cleared} ${cleared === 1 ? "circle" : "circles"}. ${targetCircles - nextCircles} until the next card draw.`);
    if (nextCircles >= targetCircles) setPhase("choosing");
  }

  function chooseUpgrade(upgrade: Upgrade) {
    const nextPicks = [...picks, upgrade.slug];
    const nextStacks = countPicks(nextPicks);
    const levelLift = 52 + (nextStacks["increase-jump-height"] ?? 0) * 18 + (nextStacks["upgrade-rocket-fuel"] ?? 0) * 12;
    const nextHeight = Math.min(MOON_HEIGHT, height + levelLift);
    const effect = simulatedEffects[upgrade.slug];
    setPicks(nextPicks);
    setLastUpgrade(upgrade.slug);
    setHeight(nextHeight);
    setCircles(0);
    setScore((current) => current + 100 + level * 20);
    setLastChange(`${upgrade.name}: ${effect.change}. Level-up lift: +${levelLift} m.`);
    if (nextHeight >= MOON_HEIGHT) setPhase("finished");
    else { setLevel((current) => current + 1); setPhase("jumping"); }
  }

  function resetRun() {
    setPhase("jumping"); setLevel(1); setCircles(0); setHeight(0); setScore(0); setPicks([]); setLastUpgrade(null);
    setLastChange("Fresh run started. Clear circles to reveal your first three cards.");
  }

  return (
    <section className={styles.simulator} id="simulator" aria-labelledby="simulator-title">
      <header className={styles.simHeader}>
        <div><p className={styles.kicker}>PLAYABLE RUN SIMULATOR</p><h2 id="simulator-title">Jump, level up, choose a card — make it to the Moon.</h2><p>Each button press clears rope circles. Fill the meter, choose one of three upgrade cards, watch the run change, then keep climbing.</p></div>
        <div className={styles.runIdentity}><span>CURRENT RUN</span><strong>Level {level}</strong><small>{phase === "jumping" ? "Jumping" : phase === "choosing" ? "Choose an upgrade" : "Moon reached"}</small></div>
      </header>

      <div className={styles.simGrid}>
        <section className={styles.playArea} aria-live="polite">
          <div className={styles.altitudePanel}>
            <div className={styles.panelTop}><span><Icon name="route" size={18}/> ALTITUDE</span><strong>{height.toLocaleString()} m <small>/ {MOON_HEIGHT.toLocaleString()} m</small></strong></div>
            <div className={styles.meter} aria-label={`${moonProgress}% of the route to the Moon`}><span style={{ width: `${moonProgress}%` }}/></div>
            <p>{height >= MOON_HEIGHT ? "Scarlet reached the Moon." : `${MOON_HEIGHT - height} m left to the Moon.`}</p>
          </div>

          {phase === "jumping" && <section className={styles.jumpStage} aria-labelledby="jump-title">
            <div className={styles.stageLabel}><span>JUMP PHASE</span><h3 id="jump-title">Clear {targetCircles - circles} more rope {targetCircles - circles === 1 ? "circle" : "circles"} to level up.</h3></div>
            <div className={styles.circleReadout}><strong>{circles}</strong><span>/ {targetCircles} circles</span></div>
            <div className={styles.meter} aria-label={`${progress}% to the next upgrade`}><span style={{ width: `${progress}%` }}/></div>
            <p className={styles.jumpHint}>Every jump action currently clears {jumpActionCircles} {jumpActionCircles === 1 ? "circle" : "circles"}. Score grows with ropes and fire.</p>
            <div className={styles.jumpActions}><button type="button" onClick={() => jump(5)}><Icon name="rope" size={22}/>Jump 5 circles</button><button type="button" onClick={() => jump(1)}>Jump 1 circle</button></div>
          </section>}

          {phase === "choosing" && <section className={styles.choiceStage} aria-labelledby="choice-title">
            <div className={styles.stageLabel}><span>LEVEL {level} COMPLETE</span><h3 id="choice-title">Pick one upgrade for the next climb.</h3><p>Each choice immediately changes this simulated run.</p></div>
            <div className={styles.cardGrid}>{draw.map((upgrade) => { const effect = simulatedEffects[upgrade.slug]; return <button className={styles.upgradeCard} type="button" key={upgrade.slug} onClick={() => chooseUpgrade(upgrade)}><span className={styles.cardIcon}><Icon name={effect.icon} size={32}/></span><span className={styles.cardCategory}>{upgrade.category}</span><strong>{upgrade.name}</strong><small>{effect.detail}</small><em>{effect.change}</em><span className={styles.cardAction}>Choose this card <Icon name="arrow" size={16}/></span></button>; })}</div>
          </section>}

          {phase === "finished" && <section className={styles.finishStage} aria-labelledby="finish-title"><Icon name="trophy" size={38}/><p>RUN COMPLETE</p><h3 id="finish-title">You reached the Moon.</h3><span>Final score: {score.toLocaleString()}</span><div><button type="button" onClick={resetRun}>Start another run</button><Link href="/ending">Read the ending route <Icon name="arrow" size={17}/></Link></div></section>}
          <div className={styles.eventLog}><Icon name="spark" size={18}/><p>{lastChange}</p></div>
        </section>

        <aside className={styles.runPanel} aria-label="Current run statistics">
          <div className={styles.scoreBlock}><span>RUN SCORE</span><strong>{score.toLocaleString()}</strong><small>Score rises each cleared circle.</small></div>
          <dl className={styles.statGrid}>
            <div data-changed={lastUpgrade === "increase-jump-height" || undefined}><dt><Icon name="shoe" size={17}/> Height</dt><dd>+{jumpHeightBonus} m</dd></div>
            <div data-changed={lastUpgrade === "upgrade-rocket-fuel" || undefined}><dt><Icon name="rocket" size={17}/> Fuel</dt><dd>+{fuelHeightBonus} m</dd></div>
            <div data-changed={lastUpgrade === "increase-luck" || undefined}><dt><Icon name="clover" size={17}/> Luck</dt><dd>{luck}</dd></div>
            <div data-changed={lastUpgrade === "add-jump-rope" || undefined}><dt><Icon name="rope" size={17}/> Ropes</dt><dd>{ropes}</dd></div>
            <div data-changed={lastUpgrade === "increase-jump-rope-speed" || undefined}><dt><Icon name="speed" size={17}/> Speed</dt><dd>{speed}</dd></div>
            <div data-changed={(lastUpgrade === "ignite-jump-rope" || lastUpgrade === "extinguish-jump-rope") || undefined}><dt><Icon name="fire" size={17}/> Fire</dt><dd>×{1 + fire}</dd></div>
            <div data-changed={lastUpgrade === "reinforce-jump-rope" || undefined}><dt><Icon name="shield" size={17}/> Shields</dt><dd>{shields}</dd></div>
            <div data-changed={(lastUpgrade === "increase-jump-height" || lastUpgrade === "upgrade-rocket-fuel") || undefined}><dt><Icon name="route" size={17}/> Next lift</dt><dd>+{52 + jumpHeightBonus + fuelHeightBonus} m</dd></div>
          </dl>
          <section className={styles.pressure}><div><span>Rope pressure</span><strong>{pressure < 35 ? "Calm" : pressure < 65 ? "Busy" : "Wild"}</strong></div><div className={styles.meter} aria-label={`Rope pressure ${pressure} out of 100`}><span style={{ width: `${pressure}%` }}/></div><p>More ropes, speed and fire make the simulated rhythm harder to manage.</p></section>
          <section className={styles.pickHistory}><h3>Upgrade history</h3>{picks.length ? <ol>{picks.map((slug, index) => { const upgrade = upgrades.find((item) => item.slug === slug); return upgrade ? <li key={`${slug}-${index}`}><span>{index + 1}</span><Icon name={simulatedEffects[slug].icon} size={18}/><strong>{upgrade.shortName}</strong></li> : null; })}</ol> : <p>No cards yet. Reach the first level-up to start your build.</p>}</section>
          <button className={styles.resetButton} type="button" onClick={resetRun}>Reset this run</button>
        </aside>
      </div>
      <footer className={styles.simNote}><Icon name="info" size={18}/><p><strong>About these numbers:</strong> the game confirms three upgrade choices and stackable cards, but does not publish its full formulas. Circle targets, metres, score and attribute changes here are a transparent playable approximation—not official game values.</p></footer>
    </section>
  );
}
