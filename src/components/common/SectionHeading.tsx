import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/common.module.css";
import type { IconName } from "@/types/content";

export function SectionHeading({
  icon,
  title,
  description,
  href,
  linkLabel,
}: {
  icon: IconName;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div className={styles.sectionTitleWrap}>
        <span className={styles.sectionIcon}><Icon name={icon} size={26} /></span>
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>
      {href && (
        <Link className={styles.textLink} href={href}>
          {linkLabel ?? "View all"}<Icon name="arrow" size={16} />
        </Link>
      )}
    </div>
  );
}
