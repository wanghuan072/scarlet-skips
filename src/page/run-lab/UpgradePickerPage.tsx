import { UpgradePicker } from "@/page/run-lab/components/UpgradePicker";
import { ToolPageHeader } from "@/page/run-lab/components/ToolPageHeader";
import { upgrades } from "@/lib/data/content";
import styles from "@/style/page/run-lab/run-lab.module.css";

export default function UpgradePickerPage() { return <main id="main-content"><ToolPageHeader title="Scarlet Skips Upgrade Picker" description="Compare the three cards on screen against your current goal and see why one fits better." icon="cards"/><div className={`container ${styles.toolBody}`}><UpgradePicker upgrades={upgrades}/></div></main>; }
