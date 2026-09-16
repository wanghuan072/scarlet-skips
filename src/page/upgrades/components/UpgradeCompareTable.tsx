import Link from "next/link";
import { UpgradeArt } from "@/components/common/UpgradeArt";
import { appearLabel, pairLabel, perStackLabel, playerSummary } from "@/lib/data/upgrade-view";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/upgrades/upgrades.module.css";

export function UpgradeCompareTable({ upgrades }: { upgrades: Upgrade[] }) {
  return (
    <div className={styles.compareWrap}>
      <table className={styles.compareTable}>
        <caption className="sr-only">Scarlet Skips upgrade cards, effects, per-stack values, appear level, timing and pairs</caption>
        <thead>
          <tr>
            <th scope="col">Card</th>
            <th scope="col">What it does</th>
            <th scope="col">Each stack</th>
            <th scope="col">From</th>
            <th scope="col">Best time</th>
            <th scope="col">Pair with</th>
          </tr>
        </thead>
        <tbody>
          {upgrades.map((upgrade) => (
            <tr key={upgrade.slug}>
              <th scope="row">
                <Link href={`/upgrades/${upgrade.slug}`} data-tone={upgrade.color}>
                  <UpgradeArt slug={upgrade.slug} title={upgrade.gameTitle ?? upgrade.name} size="thumb" />
                  <strong>{upgrade.shortName}</strong>
                </Link>
              </th>
              <td>{playerSummary(upgrade)}</td>
              <td>{perStackLabel(upgrade)}</td>
              <td>{appearLabel(upgrade)}</td>
              <td>{upgrade.bestTiming}</td>
              <td>{pairLabel(upgrade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
