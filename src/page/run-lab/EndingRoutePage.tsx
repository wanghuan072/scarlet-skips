import Link from "next/link";
import { EndingRouteTracker } from "@/page/run-lab/components/EndingRouteTracker";
import { ToolPageHeader } from "@/page/run-lab/components/ToolPageHeader";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/page/run-lab/run-lab.module.css";

export default function EndingRoutePage() { return <main id="main-content"><ToolPageHeader title="Scarlet Skips Ending Route" description="Track the documented community route without exposing the final sequence." icon="route" status="Player Report"/><div className={`container ${styles.toolBody}`}><div className={styles.routeNotice}><Icon name="info" size={22}/><p><strong>Spoiler-light:</strong> This checklist covers build direction and the player-reported trigger. The final scene stays on the separate <Link href="/ending">Ending Guide</Link> behind a spoiler control.</p></div><EndingRouteTracker/></div></main>; }
