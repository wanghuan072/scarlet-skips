import { ChallengeGenerator } from "@/page/lab/components/ChallengeGenerator";
import { LabPageHeader } from "@/page/lab/components/LabPageHeader";
import styles from "@/style/page/lab/lab-v2.module.css";

export default function ChallengeGeneratorPage({ initialChallengeId }: { initialChallengeId?: string }) {
  return <main id="main-content"><LabPageHeader eyebrow="Authored challenge selector" title="Challenge Generator" description="Filter a curated library by goal and difficulty. Every output remains playable and version-labelled." icon="spark" backHref="/challenges" backLabel="Challenges"/><section className={`container ${styles.toolSection}`}><ChallengeGenerator initialChallengeId={initialChallengeId}/></section></main>;
}
