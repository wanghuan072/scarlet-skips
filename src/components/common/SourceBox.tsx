import styles from "@/style/common/common.module.css";
import { Icon } from "@/components/common/Icon";
import type { Source } from "@/types/content";

export function SourceBox({ sources, version }: { sources: Source[]; version?: string }) {
  return (
    <section className={styles.sourceBox} aria-labelledby="sources-heading">
      <div className={styles.sourceBoxTitle}>
        <Icon name="shield" size={24}/>
        <div><h2 id="sources-heading">Sources &amp; testing</h2>{version && <p>Content checked for game version {version}.</p>}</div>
      </div>
      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
            <span>{source.type} · checked {source.dateChecked}</span>
            <p>{source.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
