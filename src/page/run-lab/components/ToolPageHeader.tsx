import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import type { IconName, SourceStatus } from "@/types/content";
import styles from "@/style/page/run-lab/run-lab.module.css";

export function ToolPageHeader({ title, description, icon, status = "Community Verified" }: { title: string; description: string; icon: IconName; status?: SourceStatus }) {
  return <><div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Run Lab",href:"/run-lab"},{label:title}]}/></div><header className={`container ${styles.toolHero}`}><span><Icon name={icon} size={41}/></span><div><small>SCARLET SKIPS RUN LAB</small><h1>{title}</h1><p>{description}</p><div><SourceBadge status={status}/><VersionBadge version="1.0.1"/></div></div></header></>;
}
