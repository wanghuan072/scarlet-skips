import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { toolNavigation } from "@/config/navigation";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/tools/tools.module.css";

export default function ToolsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }])} />
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tools" }]} /></div>

      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroIcon}><Icon name="flask" size={36} /></span>
            <p>SCARLET SKIPS TOOLKIT</p>
            <h1>Tools for the next decision.</h1>
            <p>Choose a tool when the next card, landing or route is unclear. Each one focuses on a single job and keeps personal run data in your browser.</p>
          </div>
          <div className={styles.runFlow} aria-label="Run tool workflow">
            <span>Choose</span><Icon name="arrow" size={17} />
            <span>Test</span><Icon name="arrow" size={17} />
            <span>Record</span><Icon name="arrow" size={17} />
            <span>Adjust</span>
          </div>
        </div>
      </header>

      <section className={`container ${styles.toolsSection}`} aria-labelledby="tools-title">
        <div className={styles.sectionHeading}>
          <div><p>ALL TOOLS</p><h2 id="tools-title">Pick what the run needs</h2></div>
          <span>{toolNavigation.length} focused tools</span>
        </div>
        <div className={styles.toolGrid}>
          {toolNavigation.map((tool) => (
            <Link key={tool.href} href={tool.href} data-tone={tool.tone}>
              <span className={styles.cardIcon}><Icon name={tool.icon} size={29} /></span>
              <span className={styles.cardCategory}>{tool.category}</span>
              <h2>{tool.label}</h2>
              <p>{tool.description}</p>
              <strong>Open {tool.category.toLowerCase()} tool <Icon name="arrow" size={16} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={`container ${styles.guideBand}`}>
        <span><Icon name="book" size={29} /></span>
        <div><p>LOOKING FOR AN EXPLANATION?</p><h2>Use the guides when you need the why.</h2></div>
        <nav aria-label="Guide destinations">
          <Link href="/guides/beginner-guide">Beginner Guide</Link>
          <Link href="/builds">Builds</Link>
          <Link href="/ending">Ending Guide</Link>
        </nav>
      </section>
    </main>
  );
}
