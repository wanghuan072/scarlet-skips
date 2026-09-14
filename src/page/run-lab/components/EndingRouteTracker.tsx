"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/page/run-lab/run-lab.module.css";

const steps = [
  { title: "Establish a reliable opening rhythm", text: "Clear the first levels without changing several timing variables at once." },
  { title: "Build early progression", text: "Use Luck and manageable rope pressure to reach upgrades faster; the exact formula is undocumented." },
  { title: "Simplify the rope set", text: "The cited player route deliberately allows excess ropes to drop before committing to height." },
  { title: "Reinforce every rope you keep", text: "Protect the smaller set before the main height push." },
  { title: "Stack Jump Height and Luck", text: "Continue the two foundations while watching the actual result of each stack." },
  { title: "Add Rocket Fuel for late control", text: "Use powered airtime to manage the final progression; avoid Ignite on the cited route." },
  { title: "Watch for Super Rocket Shoes", text: "The community guide describes this as the sign the ending sequence is ready." },
];

export function EndingRouteTracker() {
  const [checked, setChecked] = useState<boolean[]>(steps.map(() => false));
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("scarlet-ending-route");
      if (saved) {
        try {
          const value = JSON.parse(saved);
          if (Array.isArray(value) && value.length === steps.length) setChecked(value);
        } catch {
          window.localStorage.removeItem("scarlet-ending-route");
        }
      }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { if (loaded) window.localStorage.setItem("scarlet-ending-route", JSON.stringify(checked)); }, [checked, loaded]);
  const done = checked.filter(Boolean).length;
  const progress = Math.round((done / steps.length) * 100);

  return (
    <div className={styles.routeTracker}>
      <div className={styles.progressCard}><div><span>ROUTE PROGRESS</span><strong>{done} / {steps.length} steps</strong><p>Saved only in this browser.</p></div><div className={styles.progressRing} style={{"--progress": `${progress * 3.6}deg`} as CSSProperties}><span>{progress}%</span></div></div>
      <ol>{steps.map((step,index) => <li key={step.title} data-complete={checked[index]}><label><input type="checkbox" checked={checked[index]} onChange={() => setChecked((current) => current.map((value,currentIndex) => currentIndex === index ? !value : value))}/><span className={styles.routeCheck}><Icon name="check" size={18}/></span><span className={styles.routeNumber}>{String(index + 1).padStart(2,"0")}</span><span><strong>{step.title}</strong><small>{step.text}</small></span></label>{index < steps.length - 1 && <span className={styles.routeLine}/>}</li>)}</ol>
      <div className={styles.routeActions}><button type="button" onClick={() => setChecked(steps.map(() => false))}>Reset checklist</button><p><Icon name="shield" size={17}/>This route is based on one Steam Community guide, not an official Yerk Games walkthrough.</p></div>
    </div>
  );
}
