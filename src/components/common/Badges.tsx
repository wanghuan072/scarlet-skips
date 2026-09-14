import styles from "@/style/common/common.module.css";
import { Icon } from "@/components/common/Icon";
import type { SourceStatus } from "@/types/content";

export function SourceBadge({ status }: { status: SourceStatus }) {
  const tone = status.toLowerCase().replaceAll(" ", "-");
  return (
    <span className={`${styles.badge} ${styles[tone]}`}>
      <Icon name={status === "Official" ? "shield" : "check"} size={14} />
      {status}
    </span>
  );
}

export function VersionBadge({ version }: { version: string }) {
  return <span className={`${styles.badge} ${styles.version}`}>Tested on {version}</span>;
}
