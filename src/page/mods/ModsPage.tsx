import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { mods } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/mods/mods.module.css";

const loaderMods = mods.filter((mod) => mod.requirement.includes("Rope Ladder"));

export default function ModsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Mods", href: "/mods" }])}/>
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Mods" }]}/></div>

      <header className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>UNOFFICIAL, SO CHECK BEFORE YOU COPY</span>
          <h1>Scarlet Skips mods, with the important part explained.</h1>
          <p>The scene is tiny and very new. Here is what each public Nexus listing actually changes, which ones need UE4SS, and what that means for a normal run.</p>
          <div className={styles.heroActions}><a href="https://www.nexusmods.com/games/scarletskips" target="_blank" rel="noreferrer">Open the Nexus hub <Icon name="arrow" size={17}/></a><Link href="/updates">Check the game version</Link></div>
        </div>
        <figure className={styles.heroImage}><Image src="/images/official/screenshot-2.jpg" alt="Official base-game screenshot of Scarlet jumping a flaming rope" fill priority sizes="(max-width: 800px) 100vw, 48vw"/><figcaption>Official base-game screenshot—not a mod preview.</figcaption></figure>
      </header>

      <section className={`container ${styles.snapshot}`} aria-label="Current mod snapshot">
        <div><strong>7</strong><span>mods shown on the Nexus game hub</span><small>Checked September 14, 2026</small></div>
        <div><strong>{mods.length}</strong><span>public non-adult listings documented here</span><small>One hub entry is not reproduced without enough public detail</small></div>
        <div><strong>{loaderMods.length}</strong><span>gameplay scripts that state a loader requirement</span><small>The Rope Ladder is the dependency</small></div>
        <div><strong>0</strong><span>files hosted by this guide</span><small>Download from the author&apos;s listing</small></div>
      </section>

      <section className={`container ${styles.notice}`}>
        <span><Icon name="shield" size={25}/></span>
        <div><h2>Mods are not the same thing as an upgrade build.</h2><p>Gym, Lit and Luck change the game&apos;s normal card economy. A score from those sessions should not be compared with an unmodded route, and their behavior should not be used to explain base-game mechanics.</p></div>
      </section>

      <section className={`container ${styles.catalog}`}>
        <div className={styles.sectionHead}><div><span>WHAT IS AVAILABLE</span><h2>The current public listings</h2><p>Descriptions below stay close to the author&apos;s listing. If a requirement is not stated, we say so.</p></div></div>
        <div className={styles.modGrid}>
          {mods.map((mod) => (
            <article key={mod.slug} id={mod.slug}>
              <div className={styles.modTop}><span data-kind={mod.kind}><Icon name={mod.kind === "Loader" ? "flask" : mod.kind === "Gameplay" ? "gauge" : "spark"} size={21}/>{mod.kind}</span><small>{mod.sourceStatus}</small></div>
              <h3>{mod.name}</h3>
              <p className={styles.author}>by {mod.author} · {mod.uploadedDate} · {mod.fileSize}</p>
              <p>{mod.description}</p>
              <dl><div><dt>Needs</dt><dd>{mod.requirement}</dd></div><div><dt>Player note</dt><dd>{mod.usage}</dd></div></dl>
              <a href={mod.sourceUrl} target="_blank" rel="noreferrer">View the author&apos;s Nexus page <Icon name="arrow" size={16}/></a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.installBand}>
        <div className={`container ${styles.installGrid}`}>
          <div className={styles.installIntro}><span>FOR THE THREE UE4SS SCRIPTS</span><h2>Install the loader once, then add the script.</h2><p>This is a plain-language map of the author&apos;s instructions, not a mirrored download. Always read the current Files and Requirements tabs before replacing anything.</p></div>
          <ol>
            <li><span>01</span><div><h3>Back up the game folder</h3><p>Steam can restore the game, but a small backup makes it easier to undo a bad copy without guessing which file changed.</p></div></li>
            <li><span>02</span><div><h3>Get The Rope Ladder from Nexus</h3><p>Extract it so the <code>ue4ss</code> folder sits beside the Scarlet Skips executable.</p></div></li>
            <li><span>03</span><div><h3>Add one script at a time</h3><p>Put the supported mod in <code>ue4ss/Mods</code>, launch the game and confirm it works before adding another.</p></div></li>
            <li><span>04</span><div><h3>Keep modded runs separate</h3><p>Note the game version and active mods. Patch 1.0.1 already changed Rocket Shoes and extinguished-rope behavior.</p></div></li>
          </ol>
        </div>
      </section>

      <section className={`container ${styles.checklist}`}>
        <div><span><Icon name="check" size={23}/></span><h2>Before launching</h2><ul><li>Confirm the listing still supports your current game version.</li><li>Read requirements and recent posts for new breakage.</li><li>Install only from the author&apos;s page.</li><li>Test one change at a time.</li></ul></div>
        <div><span><Icon name="info" size={23}/></span><h2>What this page will not guess</h2><ul><li>No invented compatibility claims.</li><li>No promise that a mod is safe forever.</li><li>No copied author images or files.</li><li>No claim that Steam Workshop support exists.</li></ul></div>
      </section>
    </main>
  );
}
