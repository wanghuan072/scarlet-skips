import { LabPageHeader } from "@/page/lab/components/LabPageHeader";
import { PickMyUpgrade } from "@/page/lab/components/PickMyUpgrade";
import styles from "@/style/page/lab/lab-v2.module.css";
export default function PickMyUpgradePage(){return <main id="main-content"><LabPageHeader eyebrow="Decision tool · no invented probabilities" title="Pick My Upgrade" description="Enter the three cards you were offered. Add only as much run context as you know." icon="cards"/><section className={`container ${styles.toolSection}`}><PickMyUpgrade/></section></main>}
