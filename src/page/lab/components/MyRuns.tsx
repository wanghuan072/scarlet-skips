"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { game, upgrades } from "@/lib/data/content";
import { passportBadges } from "@/lib/data/lab";
import { isBadgeUnlocked } from "@/lib/passport/progress";
import { useLabState } from "@/lib/storage/lab-store";
import type { SavedRun } from "@/types/lab";
import styles from "@/style/page/lab/lab-v2.module.css";

const initialForm = { runType: "Normal" as SavedRun["runType"], score: "", endingCompleted: false, build: "", upgrades: [] as string[], proofUrl: "", notes: "" };

export function MyRuns() {
  const { state, loaded, update, recordToolUse } = useLabState();
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);

  function saveRun(event: React.FormEvent) {
    event.preventDefault();
    const run: SavedRun = { id: crypto.randomUUID(), runType: form.runType, score: Math.max(0, Number(form.score)), endingCompleted: form.endingCompleted, build: form.build.trim(), upgrades: form.upgrades, gameVersion: game.currentVersion, date: new Date().toISOString(), proofUrl: form.proofUrl.trim() || undefined, notes: form.notes.trim() || undefined };
    update((current) => ({ ...current, runs: [run, ...current.runs] }));
    recordToolUse("my-runs");
    setForm(initialForm);
    setShowForm(false);
  }

  return <div className={styles.runsLayout}>
    <section>
      <div className={styles.sectionBar}><div><span className={styles.kicker}>Private field log</span><h2>Saved runs</h2></div><button type="button" onClick={() => setShowForm((value) => !value)}><Icon name={showForm ? "minus" : "plus"} size={17}/>{showForm ? "Close form" : "Add a run"}</button></div>
      {showForm && <form className={styles.runForm} onSubmit={saveRun}>
        <label><span>Run type</span><select value={form.runType} onChange={(event) => setForm({ ...form, runType: event.target.value as SavedRun["runType"] })}><option>Normal</option><option>Ending</option><option>Challenge</option></select></label>
        <label><span>Score</span><input required type="number" min="0" value={form.score} onChange={(event) => setForm({ ...form, score: event.target.value })}/></label>
        <label><span>Build name</span><input placeholder="e.g. Height + Rocket" value={form.build} onChange={(event) => setForm({ ...form, build: event.target.value })}/></label>
        <label className={styles.checkField}><input type="checkbox" checked={form.endingCompleted} onChange={(event) => setForm({ ...form, endingCompleted: event.target.checked })}/><span>Ending completed</span></label>
        <fieldset><legend>Upgrades used</legend><div className={styles.stackGrid}>{upgrades.map((upgrade) => <label key={upgrade.slug}><input type="checkbox" checked={form.upgrades.includes(upgrade.slug)} onChange={(event) => setForm({ ...form, upgrades: event.target.checked ? [...form.upgrades, upgrade.slug] : form.upgrades.filter((slug) => slug !== upgrade.slug) })}/><span>{upgrade.shortName}</span></label>)}</div></fieldset>
        <label><span>Proof or clip link <small>optional</small></span><input type="url" placeholder="https://" value={form.proofUrl} onChange={(event) => setForm({ ...form, proofUrl: event.target.value })}/></label>
        <label className={styles.fullField}><span>Notes <small>optional</small></span><textarea rows={3} placeholder="What worked? What ended the run?" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })}/></label>
        <button className={styles.primaryAction} type="submit">Save on this device</button>
      </form>}
      {!loaded || state.runs.length === 0 ? <div className={styles.emptyState}><Icon name="book" size={32}/><h3>No runs saved yet</h3><p>Your first entry becomes the baseline for future decisions.</p></div> : <div className={styles.runList}>{state.runs.map((run) => <article key={run.id}><div><span>{new Date(run.date).toLocaleDateString()}</span><strong>{run.runType} run</strong></div><b>{run.score.toLocaleString()}</b><p>{run.build || "Unlabelled build"}</p><div className={styles.runTags}>{run.endingCompleted && <span>Ending</span>}{run.upgrades.slice(0, 3).map((slug) => <span key={slug}>{upgrades.find((upgrade) => upgrade.slug === slug)?.shortName}</span>)}</div><button type="button" onClick={() => update((current) => ({ ...current, runs: current.runs.filter((item) => item.id !== run.id) }))} aria-label={`Delete ${run.runType} run from ${new Date(run.date).toLocaleDateString()}`}>Delete</button></article>)}</div>}
    </section>
    <aside className={styles.badgeShelf}><span className={styles.kicker}>Passport badges</span><h2>Field milestones</h2><div>{passportBadges.map((badge) => { const unlocked = isBadgeUnlocked(badge, state); return <article key={badge.id} className={unlocked ? styles.badgeUnlocked : ""}><span><Icon name={badge.icon} size={23}/></span><div><strong>{badge.name}</strong><p>{badge.description}</p></div><small>{unlocked ? "Unlocked" : "Locked"}</small></article>; })}</div><p className={styles.mutedNote}>Badges are local fan-site milestones, not Steam achievements.</p></aside>
  </div>;
}
