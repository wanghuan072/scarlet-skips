"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/page/run-lab/run-lab.module.css";

type RecordEntry = { id: number; player: string; score: string; version: string; date: string; proof: string };

export function RecordsTracker() {
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("scarlet-personal-records");
      if (saved) {
        try { setRecords(JSON.parse(saved)); }
        catch { window.localStorage.removeItem("scarlet-personal-records"); }
      }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { if (loaded) window.localStorage.setItem("scarlet-personal-records", JSON.stringify(records)); }, [records, loaded]);

  return (
    <div className={styles.recordsLayout}>
      <form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const next = { id: Date.now(), player: String(form.get("player")), score: String(form.get("score")), version: String(form.get("version")), date: String(form.get("date")), proof: String(form.get("proof")) }; setRecords((current) => [next, ...current]); event.currentTarget.reset(); setMessage("Personal record saved on this device."); }}>
        <h2>Add a personal record</h2><p>This tracker is private to your browser and is not a public leaderboard.</p>
        <label><span>Player name</span><input name="player" required placeholder="Your display name"/></label>
        <label><span>Score or loops</span><input name="score" required inputMode="numeric" pattern="[0-9,]+" placeholder="e.g. 125,000"/></label>
        <div className={styles.formRow}><label><span>Game version</span><input name="version" required defaultValue="1.0.1"/></label><label><span>Date</span><input name="date" type="date" required/></label></div>
        <label><span>Proof URL</span><input name="proof" type="url" required placeholder="Steam screenshot or video URL"/><small>Required so the entry remains checkable.</small></label>
        <button type="submit">Save personal record <Icon name="plus" size={17}/></button>{message && <p className={styles.successMessage} role="status"><Icon name="check" size={16}/>{message}</p>}
      </form>
      <section aria-labelledby="personal-records"><h2 id="personal-records">Your saved records</h2>{records.length ? <div className={styles.recordList}>{records.map((record) => <article key={record.id}><div><strong>{record.score}</strong><span>{record.player}</span></div><dl><div><dt>Version</dt><dd>{record.version}</dd></div><div><dt>Date</dt><dd>{record.date}</dd></div></dl><a href={record.proof} target="_blank" rel="noreferrer">Open proof <Icon name="arrow" size={15}/></a><button type="button" aria-label={`Remove ${record.score} record`} onClick={() => setRecords((current) => current.filter((item) => item.id !== record.id))}><Icon name="x" size={16}/></button></article>)}</div> : <div className={styles.emptyRecords}><span><Icon name="trophy" size={36}/></span><h3>No personal records yet</h3><p>Add a score with a screenshot or video link. It stays on this device.</p></div>}</section>
    </div>
  );
}
