import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { challenges } from "@/lib/data/lab";
import { DailyChallengePanel } from "@/page/lab/components/DailyChallengePanel";
import { PassportSummary } from "@/page/lab/components/PassportSummary";
import styles from "@/style/page/lab/lab-v2.module.css";

export default function ChallengesPage() {
  const featured = challenges.filter((challenge) => !challenge.dailyEligible || ["sky-bridge", "two-rope-discipline", "quiet-landing"].includes(challenge.id)).slice(0, 4);
  return <main id="main-content">
    <section className={styles.challengeHero}>
      <div className={`container ${styles.challengeHeroInner}`}>
        <div><span className={styles.kicker}>Fan-made run formats</span><h1>Scarlet Skips Challenges</h1><p>Give the next run a purpose. Every challenge uses authored rules, a visible target and a route you can actually learn from.</p><div className={styles.heroButtons}><Link href="/challenges/daily">Today&apos;s challenge <Icon name="arrow" size={17}/></Link><Link href="/challenges/generator"><Icon name="spark" size={18}/> Generate a run</Link></div></div>
        <div className={styles.challengeHeroNote}><span>FIELD NOTE 01</span><strong>Constraints make failed runs useful.</strong><p>Change one variable, observe it, and record what happened.</p></div>
      </div>
    </section>
    <section className={`container ${styles.challengeDashboard}`}>
      <DailyChallengePanel compact />
      <PassportSummary />
    </section>
    <section className={`container ${styles.challengeLibrary}`}>
      <div className={styles.sectionBar}><div><span className={styles.kicker}>Curated set</span><h2>Choose your experiment</h2></div><Link href="/challenges/generator">Use filters <Icon name="arrow" size={15}/></Link></div>
      <div className={styles.challengeCardGrid}>{featured.map((challenge) => <article key={challenge.id}><div className={styles.cardMeta}><span>{challenge.type}</span><span className={`${styles.difficulty} ${styles[`difficulty${challenge.difficulty}`]}`}>{challenge.difficulty}</span></div><span className={styles.challengeNumber}>0{featured.indexOf(challenge) + 1}</span><h3>{challenge.name}</h3><p className={styles.challengeTarget}>{challenge.target}</p><p>{challenge.description}</p><ul>{challenge.rules.slice(0, 2).map((rule) => <li key={rule}>{rule}</li>)}</ul><Link href={`/challenges/generator?challenge=${challenge.id}`}>Open challenge <Icon name="arrow" size={15}/></Link></article>)}</div>
    </section>
    <section className={`container ${styles.challengePrinciple}`}><div><span className={styles.kicker}>How it works</span><h2>Not a random-rule slot machine</h2></div><div className={styles.principleSteps}>{[["01", "Pick", "Choose a target that fits the run you want."], ["02", "Attempt", "Follow a small set of observable constraints."], ["03", "Record", "Save the result and use it for the next decision."]].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  </main>;
}
