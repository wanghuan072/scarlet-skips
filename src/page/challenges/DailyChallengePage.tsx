import { DailyChallengePanel } from "@/page/lab/components/DailyChallengePanel";
import { PassportSummary } from "@/page/lab/components/PassportSummary";
import { LabPageHeader } from "@/page/lab/components/LabPageHeader";
import styles from "@/style/page/lab/lab-v2.module.css";

export default function DailyChallengePage() {
  return <main id="main-content"><LabPageHeader eyebrow="One shared prompt per UTC day" title="Daily Challenge" description="A deterministic fan-made challenge for every visitor, with progress saved only on this device." icon="calendar" backHref="/challenges" backLabel="Challenges"/><div className={`container ${styles.dailyPageGrid}`}><DailyChallengePanel/><PassportSummary detailed/></div></main>;
}
