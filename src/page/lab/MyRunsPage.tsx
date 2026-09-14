import { LabPageHeader } from "@/page/lab/components/LabPageHeader";
import { MyRuns } from "@/page/lab/components/MyRuns";
import styles from "@/style/page/lab/lab-v2.module.css";
export default function MyRunsPage(){return <main id="main-content"><LabPageHeader eyebrow="Local-only run history" title="My Runs & Passport" description="Save scores, builds and observations in this browser. These entries are private notes, not public records." icon="book"/><section className={`container ${styles.toolSection}`}><MyRuns/></section></main>}
