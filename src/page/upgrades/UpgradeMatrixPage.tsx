import { LabPageHeader } from "@/page/lab/components/LabPageHeader";
import { InteractionExplorer } from "@/page/upgrades/components/InteractionExplorer";
import { interactions } from "@/lib/data/lab";
import styles from "@/style/page/upgrades/interaction-matrix.module.css";

export default function UpgradeMatrixPage() {
  return <main id="main-content"><LabPageHeader eyebrow={`${interactions.length} documented pairings · unknowns stay visible`} title="Upgrade Interaction Lab" description="Explore what two cards try to accomplish together, when the pairing becomes useful and what can still make it fail." icon="flask" backHref="/upgrades" backLabel="Upgrades"/><section className={`container ${styles.section}`}><InteractionExplorer/><div className={styles.policy}><div><span>01</span><h2>Documented</h2><p>Only pairs supported by official material or identifiable player routes receive a description.</p></div><div><span>02</span><h2>Contextual</h2><p>Every pairing includes a goal, timing, prerequisite and risk instead of a universal rank.</p></div><div><span>03</span><h2>Open</h2><p>Unstudied pairs remain “Untested”—never silently filled with invented mechanics.</p></div></div></section></main>;
}
