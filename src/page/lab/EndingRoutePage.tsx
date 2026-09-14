import { LabPageHeader } from "@/page/lab/components/LabPageHeader";
import { EndingRouteTrackerV2 } from "@/page/lab/components/EndingRouteTrackerV2";
import styles from "@/style/page/lab/lab-v2.module.css";
export default function EndingRoutePage(){return <main id="main-content"><LabPageHeader eyebrow="Spoiler-light local checklist" title="Ending Route Tracker" description="Work through the control-first route and keep progress on this device. Open the sourced guide only when you need the final detail." icon="route"/><section className={`container ${styles.narrowToolSection}`}><EndingRouteTrackerV2/></section></main>}
