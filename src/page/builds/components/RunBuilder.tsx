"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { UpgradeArt } from "@/components/common/UpgradeArt";
import { upgrades } from "@/lib/data/content";
import {
  applyUpgrade,
  advanceSkipBatch,
  drawForLevel,
  expectedLoops,
  freshState,
  igniteMultiplier,
  jumpsNeeded,
  offerDetail,
  offerTitle,
  snapshot,
  type SimState,
  type StatDelta,
} from "@/lib/builds/sim";
import { destinationHint, destinations, type RunDestination } from "@/lib/data/destinations";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/builds/sim.module.css";

type Phase = "skipping" | "choosing" | "finished";

function ropeClass(rope: { ignited: boolean; reinforced: boolean; negative: boolean }) {
  if (rope.ignited) return "fire";
  if (rope.negative) return "neg";
  if (rope.reinforced) return "shield";
  return "plain";
}

function ropeNote(rope: { speed: number; ignited: boolean; reinforced: boolean; negative: boolean }) {
  const bits: string[] = [];
  if (rope.speed) bits.push(`speed ${rope.speed}`);
  if (rope.ignited) bits.push("fire");
  if (rope.reinforced) bits.push("shield");
  if (rope.negative) bits.push("negative");
  return bits.length ? bits.join(" · ") : "plain";
}

export function RunBuilder({
  destination = null,
  onPickDestination,
}: {
  destination?: RunDestination | null;
  onPickDestination?: (id: RunDestination, scrollToSim?: boolean) => void;
}) {
  const [state, setState] = useState<SimState>(freshState);
  const [phase, setPhase] = useState<Phase>("skipping");
  const [draw, setDraw] = useState<Upgrade[]>([]);
  const [log, setLog] = useState("Skip. Each rope loop fills the bar. Three cards when it fills.");
  const [deltas, setDeltas] = useState<StatDelta[]>([]);
  const [luckyFlash, setLuckyFlash] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [autoRunning, setAutoRunning] = useState(false);
  const autoActive = useRef(false);
  const autoTimer = useRef<number | null>(null);

  const needed = jumpsNeeded(state.level);
  const remaining = Math.max(0, needed - state.jumpProgress);
  const meter = Math.min(100, Math.round((state.jumpProgress / needed) * 100));
  const multiplier = igniteMultiplier(state.ropes);
  const preview = expectedLoops(state);
  const stats = snapshot(state);
  const changed = new Set(deltas.map((item) => item.key));

  const stopAuto = useCallback(() => {
    autoActive.current = false;
    if (autoTimer.current !== null) window.clearTimeout(autoTimer.current);
    autoTimer.current = null;
    setAutoRunning(false);
  }, []);

  useEffect(() => () => {
    autoActive.current = false;
    if (autoTimer.current !== null) window.clearTimeout(autoTimer.current);
  }, []);

  const skip = useCallback((untilLevel = false) => {
    if (phase !== "skipping" || autoActive.current) return;
    autoActive.current = true;
    if (untilLevel) setAutoRunning(true);

    function advance(current: SimState, totals: { loops: number; lucky: number; fuelBurned: number; scoreGained: number; jumps: number }) {
      if (!autoActive.current) return;
      const batch = advanceSkipBatch(current, untilLevel ? 40 : 1);
      const next = {
        loops: totals.loops + batch.loops,
        lucky: totals.lucky + batch.lucky,
        fuelBurned: totals.fuelBurned + batch.fuelBurned,
        scoreGained: totals.scoreGained + batch.scoreGained,
        jumps: totals.jumps + batch.jumps,
      };
      setState(batch.state);
      setDeltas([]);
      setSkipping(true);
      window.setTimeout(() => setSkipping(false), 180);
      setLuckyFlash(next.lucky > 0);
      if (next.lucky > 0) window.setTimeout(() => setLuckyFlash(false), 700);

      if (untilLevel && !batch.leveled) {
        setLog(`${next.jumps} skips · ${next.loops} loops · ${Math.max(0, jumpsNeeded(batch.state.level) - batch.state.jumpProgress)} left — continuing…`);
        autoTimer.current = window.setTimeout(() => advance(batch.state, next), 0);
        return;
      }
      autoActive.current = false;
      autoTimer.current = null;
      setAutoRunning(false);
      if (batch.leveled) {
        setDraw(drawForLevel(batch.state));
        setPhase("choosing");
        setLog(next.lucky ? `LUCKY ×${next.lucky}. ${next.loops} loops — pick a card.` : `${next.loops} loops filled the bar. Pick one.`);
      } else {
        const left = jumpsNeeded(batch.state.level) - batch.state.jumpProgress;
        setLog(`${next.loops} loops` + (next.lucky ? ` · LUCKY ×${next.lucky}` : "") +
          (next.fuelBurned ? " · fuel" : "") + ` · +${next.scoreGained} score · ${left} left`);
      }
    }
    advance(state, { loops: 0, lucky: 0, fuelBurned: 0, scoreGained: 0, jumps: 0 });
  }, [phase, state]);

  useEffect(() => {
    if (phase !== "skipping") return;
    function onKey(event: KeyboardEvent) {
      if (event.code !== "Space") return;
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "BUTTON" || tag === "A" || tag === "INPUT" || tag === "TEXTAREA") return;
      event.preventDefault();
      skip(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skip]);

  function choose(upgrade: Upgrade) {
    const result = applyUpgrade(state, upgrade.slug);
    setState(result.state);
    setDeltas(result.deltas);
    setDraw([]);
    if (result.state.superRocket) {
      setPhase("finished");
      setLog(`${offerTitle(upgrade, state)}. ${result.change}`);
      return;
    }
    setPhase("skipping");
    setLog(`${offerTitle(upgrade, state)}: ${result.change}.`);
  }

  function reset() {
    stopAuto();
    setState(freshState());
    setPhase("skipping");
    setDraw([]);
    setDeltas([]);
    setLuckyFlash(false);
    setLog("Fresh run. One rope. One loop per skip.");
  }

  const cells = [
    { key: "jump" as const, label: "Jump", value: stats.jump },
    { key: "luck" as const, label: "Luck", value: stats.luck ? `${stats.luck} · ${stats.lucky}%` : "0" },
    { key: "fuel" as const, label: "Fuel", value: stats.fuel },
    { key: "ropes" as const, label: "Ropes", value: stats.ropes },
    { key: "speed" as const, label: "Speed", value: stats.speed },
    { key: "shields" as const, label: "Shields", value: stats.shields },
    { key: "ignite" as const, label: "Ignite", value: `×${stats.ignite}` },
    { key: "loops" as const, label: "Loops/skip", value: stats.loops },
  ];

  return (
    <section className={styles.sim} id="simulator" aria-labelledby="simulator-title" data-phase={phase} data-lucky={luckyFlash ? "true" : undefined}>
      <div className={styles.stage}>
        <div className={styles.park} data-skipping={skipping ? "true" : undefined}>
          <Image
            src="/images/official/screenshot-4.jpg"
            alt=""
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
        <div className={styles.veil} />

        <header className={styles.top}>
          <div>
            <p>PLAYABLE RUN</p>
            <h2 id="simulator-title">Skip. Fill the rope. Take a card.</h2>
            {onPickDestination ? (
              <div className={styles.destSwitch} role="group" aria-label="Run destination">
                {destinations.map((route) => (
                  <button
                    key={route.id}
                    type="button"
                    aria-pressed={destination === route.id}
                    data-active={destination === route.id ? "true" : undefined}
                    onClick={() => onPickDestination(route.id)}
                  >
                    {route.id === "moon" ? "Moon" : route.id === "score" ? "Score" : "Spectacle"}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <dl>
            <div data-lucky={luckyFlash ? "true" : undefined}>
              <dt>{luckyFlash ? "LUCKY" : "Level"}</dt>
              <dd>{state.level}</dd>
            </div>
            <div data-changed={changed.has("ignite") ? "true" : undefined}>
              <dt>Score</dt>
              <dd>{state.score.toLocaleString()}{multiplier > 1 ? <small> ×{multiplier}</small> : null}</dd>
            </div>
          </dl>
        </header>

        {phase === "skipping" ? (
          <div className={styles.play}>
            <p className={styles.remain}>
              <strong>{remaining}</strong>
              <span>{remaining === 1 ? "loop to a card" : "loops to a card"}</span>
            </p>
            <div className={styles.ropeMeter} aria-label={`${meter}% to the next upgrade`}>
              <i />
              <b><span style={{ width: `${meter}%` }} /></b>
              <i />
            </div>
            <p className={styles.hint} data-changed={changed.has("loops") ? "true" : undefined}>
              This skip clears <strong>{preview}</strong> {preview === 1 ? "loop" : "loops"}
              {state.chargeJump ? " · Charge" : ""}
              {state.airTricks ? " · Air tricks" : ""}
              {state.fastFall ? ` · ${state.fastFall > 1 ? "Faster Fall" : "Fast Fall"}` : ""}
              {state.rocketShoes ? ` · Fuel ${state.fuel}/${state.maxFuel}` : ""}.
            </p>
            {deltas.length ? (
              <p className={styles.delta}>
                {deltas.filter((item) => item.key !== "lucky" || changed.has("luck")).map((item) => (
                  <span key={item.key}>{item.label} {item.from} → {item.to}</span>
                ))}
              </p>
            ) : null}
            <div className={styles.actions}>
              <button type="button" className={styles.jump} disabled={autoRunning} onClick={() => skip(false)}>Skip</button>
              <button type="button" className={styles.until} disabled={autoRunning} onClick={() => skip(true)}>Until level-up</button>
              {autoRunning ? <button type="button" className={styles.until} onClick={() => { stopAuto(); setLog("Stopped. Continue with Skip or Until level-up."); }}>Stop</button> : null}
            </div>
            <p className={styles.space}>Space also skips</p>
          </div>
        ) : null}

        {phase === "choosing" ? (
          <div className={styles.choice} aria-labelledby="choice-title">
            <p>
              {destination
                ? `Level ${state.level} — pick for ${destination === "moon" ? "the Moon" : destination === "score" ? "score" : "spectacle"}. The green line is what moves.`
                : `Level ${state.level} — pick one. Choose a destination above to see which card helps.`}
            </p>
            <h3 id="choice-title" className="sr-only">Three cards. One pick.</h3>
            <div className={styles.cards}>
              {draw.map((upgrade, index) => {
                const offer = offerDetail(upgrade, state);
                const title = offerTitle(upgrade, state);
                const hint = destinationHint(upgrade, destination);
                return (
                  <button type="button" key={upgrade.slug} style={{ animationDelay: `${index * 70}ms` }} onClick={() => choose(upgrade)} data-fit={hint?.kind}>
                    <UpgradeArt
                      slug={upgrade.slug}
                      title={title}
                      variant={{ bounceLevel: state.bounceLevel, rocketShoes: state.rocketShoes, fastFall: state.fastFall }}
                    />
                    <p>{offer.detail}</p>
                    {hint ? <small className={styles.fit}>{hint.text}</small> : null}
                    <em>{offer.change}</em>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {phase === "finished" ? (
          <div className={styles.finish}>
            <p>SUPER ROCKET SHOES</p>
            <h3>That late pair ends this climb.</h3>
            <p>
              Score {state.score.toLocaleString()} · {state.picks.length} cards · Jump {state.jumpLevel} · {state.ropes.length} ropes · {preview} loops/skip.
              {destination === "moon" ? " Super Rocket Shoes is the late beat on the Moon climb." : " The Moon route is still a different destination."}
            </p>
            <div>
              <button type="button" onClick={reset}>Play another run</button>
              <Link href="/ending">How we actually reach the Moon <Icon name="arrow" size={16} /></Link>
            </div>
          </div>
        ) : null}

        <ul className={styles.ropes} aria-label="Ropes in the air">
          {state.ropes.map((rope) => (
            <li key={rope.id} data-kind={ropeClass(rope)} data-changed={changed.has("ropes") || changed.has("speed") || changed.has("shields") || changed.has("ignite") ? "true" : undefined}>
              <strong>Rope {rope.id}</strong>
              <span>{ropeNote(rope)}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.bar}>
        <dl>
          {cells.map((cell) => (
            <div key={cell.key} data-changed={changed.has(cell.key) || (cell.key === "luck" && changed.has("lucky")) ? "true" : undefined}>
              <dt>{cell.label}</dt>
              <dd>{cell.value}</dd>
            </div>
          ))}
        </dl>
        <ol className={styles.history} aria-label="Cards taken">
          {state.picks.length ? state.picks.map((slug, index) => {
            const upgrade = upgrades.find((item) => item.slug === slug);
            return upgrade ? <li key={`${slug}-${index}`}>{upgrade.shortName}</li> : null;
          }) : <li className={styles.empty}>No cards yet</li>}
        </ol>
        <p className={styles.log} data-lucky={luckyFlash ? "true" : undefined}>{log}</p>
        <button type="button" className={styles.reset} onClick={reset}>Reset</button>
      </footer>
    </section>
  );
}
