import { RecordsTracker } from "@/page/run-lab/components/RecordsTracker";
import { ToolPageHeader } from "@/page/run-lab/components/ToolPageHeader";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/page/run-lab/run-lab.module.css";

export default function RecordsPage() { return <main id="main-content"><ToolPageHeader title="Scarlet Skips High Score Records" description="Track proof-linked personal runs without presenting unverified community claims as an official leaderboard." icon="trophy" status="Unconfirmed"/><div className={`container ${styles.toolBody}`}><div className={styles.emptyLeaderboard}><Icon name="shield" size={24}/><div><strong>No official Scarlet Skips leaderboard is currently documented.</strong><p>The launch-week roughly 200,000 score is a single player report, not a verified world record. The tracker below stores only entries you add.</p></div></div><RecordsTracker/></div></main>; }
