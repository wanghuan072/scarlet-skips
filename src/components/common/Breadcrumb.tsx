import Link from "next/link";
import styles from "@/style/common/common.module.css";
import { Icon } from "@/components/common/Icon";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {index === 0 && <Icon name="home" size={16} />}
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
