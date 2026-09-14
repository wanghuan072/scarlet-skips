import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/types/content";
import styles from "@/style/page/lab/lab-v2.module.css";

export function LabPageHeader({ eyebrow, title, description, icon, backHref = "/tools", backLabel = "Tools" }: { eyebrow: string; title: string; description: string; icon: IconName; backHref?: string; backLabel?: string }) {
  return <>
    <div className={`container ${styles.breadcrumbWrap}`}><Breadcrumb items={[{ label: "Home", href: "/" }, { label: backLabel, href: backHref }, { label: title }]} /></div>
    <header className={styles.pageHeader}>
      <div className={`container ${styles.pageHeaderInner}`}>
        <span className={styles.headerIcon}><Icon name={icon} size={30}/></span>
        <div><span className={styles.kicker}>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>
        <Link href={backHref}>Back to {backLabel} <Icon name="arrow" size={15}/></Link>
      </div>
    </header>
  </>;
}
