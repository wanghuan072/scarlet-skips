import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBox } from "@/components/common/SourceBox";
import { getSources } from "@/lib/data/content";
import type { UpdateEntry } from "@/types/content";
import styles from "@/style/page/content/content.module.css";

export default function UpdateDetailPage({ entry }: { entry: UpdateEntry }) {
  return <main id="main-content"><div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Updates",href:"/updates"},{label:`Version ${entry.version}`}]}/></div><header className={`container ${styles.releaseHero}`}><div><span>OFFICIAL PATCH</span><strong>v{entry.version}</strong></div><div><p className={styles.eyebrow}>{entry.date}</p><h1>{entry.title}</h1><p>{entry.summary}</p></div></header><div className={`container ${styles.singleArticle}`}><article className={styles.article}><section><div className={styles.sectionTitle}><span><Icon name="spark" size={23}/></span><div><p className={styles.kicker}>OFFICIAL NOTES</p><h2>What changed</h2></div></div><ul className={styles.patchList}>{entry.changes.map((change) => <li key={change}><Icon name="check" size={18}/>{change}</li>)}</ul></section><div className={styles.impactGrid}><section><span><Icon name="flask" size={22}/></span><h2>Build impact</h2><p>{entry.buildImpact}</p></section><section><span><Icon name="book" size={22}/></span><h2>Guide impact</h2><p>{entry.guideImpact}</p></section></div><section className={styles.versionNotice}><Icon name="info" size={22}/><div><h2>What the patch does not say</h2><p>The official note does not publish card values, formulas, balance tables or a full list of fixed edge cases. This site does not infer them from the brief announcement.</p></div></section><SourceBox sources={getSources(entry.sourceIds)} version={entry.version}/><nav className={styles.bottomNav}><Link href="/updates"><Icon name="arrow" size={16}/>All updates</Link><Link href="/upgrades">Re-check upgrades <Icon name="arrow" size={16}/></Link></nav></article></div></main>;
}
