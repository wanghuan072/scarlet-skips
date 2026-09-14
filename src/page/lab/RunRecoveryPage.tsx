import { LabPageHeader } from "@/page/lab/components/LabPageHeader";
import { RunRecovery } from "@/page/lab/components/RunRecovery";
import styles from "@/style/page/lab/lab-v2.module.css";
export default function RunRecoveryPage(){return <main id="main-content"><LabPageHeader eyebrow="Bottleneck-first guidance" title="Run Recovery" description="Describe the failure signal and get a short plan for regaining control—without pretending to simulate the game." icon="gauge"/><section className={`container ${styles.toolSection}`}><RunRecovery/></section></main>}
