import styles from "@/style/common/common.module.css";
import { Icon } from "@/components/common/Icon";
import type { SourceStatus } from "@/types/content";

export function SourceBadge({ status }: { status: SourceStatus }) {
  const tone = status.toLowerCase().replaceAll(" ", "-");
  const labels: Record<SourceStatus, string> = {
    Official: "Includes official details",
    "Community Verified": "Player observations",
    "Player Report": "Player-reported route",
    Unconfirmed: "Details unconfirmed",
  };
  return (
    <span className={`${styles.badge} ${styles[tone]}`}>
      <Icon name={status === "Official" ? "shield" : "check"} size={14} />
      {labels[status]}
    </span>
  );
}

export function VersionBadge({ version }: { version: string }) {
  return <span className={`${styles.badge} ${styles.version}`}>Covers v{version}</span>;
}
