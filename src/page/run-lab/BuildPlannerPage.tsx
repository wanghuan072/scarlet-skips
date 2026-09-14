import { BuildPlanner } from "@/page/run-lab/components/BuildPlanner";
import { ToolPageHeader } from "@/page/run-lab/components/ToolPageHeader";
import { upgrades } from "@/lib/data/content";
import styles from "@/style/page/run-lab/run-lab.module.css";

export default function BuildPlannerPage() { return <main id="main-content"><ToolPageHeader title="Scarlet Skips Build Planner" description="Choose a goal, enter the upgrades already in your run and get explainable next-pick suggestions." icon="flask"/><div className={`container ${styles.toolBody}`}><BuildPlanner upgrades={upgrades}/></div></main>; }
