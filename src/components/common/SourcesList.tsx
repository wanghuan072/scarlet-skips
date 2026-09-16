import { getSources } from "@/lib/data/content";
import styles from "@/style/common/sources.module.css";

export function SourcesList({ ids, title = "Check the details" }: { ids: string[]; title?: string }) {
  const items = getSources([...new Set(ids)]);
  if (!items.length) return null;
  return (
    <section className={`container ${styles.sources}`} aria-labelledby="sources-title">
      <h2 id="sources-title">{title}</h2>
      <p>Open the linked game pages and player reports to check a claim. An observed route is not an official formula.</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>
            <span>Checked {item.dateChecked}</span>
            <p>{item.note}</p>
            {item.id.startsWith("cooked-") ? <small>The Steam link identifies the game; it is not a public permalink to the extracted files.</small> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
