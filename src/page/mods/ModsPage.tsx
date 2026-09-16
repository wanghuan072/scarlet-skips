import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
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

      <PageHero
        eyebrow="THIRD-PARTY GAME CHANGES"
        titlePrefix="Scarlet Skips Mods"
        title="What each listing changes"
        description="Compare the listed mods and their stated requirements before installing. Modded runs may behave differently from the base game."
        image="/images/official/screenshot-7.jpg"
        imageAlt="Scarlet missing a skip with the rope tangled around her legs"
        imageCaption="A base-game miss. We don’t host mod files here — grab them from the author."
        actions={[
          { href: "https://www.nexusmods.com/games/scarletskips", label: "Open the Nexus hub", external: true },
          { href: "/updates", label: "Check the game version" },
        ]}
      />

      <section className={`container ${styles.snapshot}`} aria-label="Current mod snapshot">
        <div><strong>7</strong><span>Nexus hub entries at the last check</span><small>Checked September 14, 2026</small></div>
        <div><strong>{mods.length}</strong><span>public non-adult listings documented here</span><small>One hub entry is not reproduced without enough public detail</small></div>
        <div><strong>{loaderMods.length}</strong><span>gameplay scripts that state a loader requirement</span><small>The Rope Ladder is the dependency</small></div>
        <div><strong>0</strong><span>files hosted by this guide</span><small>Download from the author&apos;s listing</small></div>
      </section>

      <section className={`container ${styles.notice}`}>
        <span><Icon name="shield" size={25}/></span>
        <div><h2>Mods are not the same thing as an upgrade build.</h2><p>Gym, Lit and Luck change the game&apos;s normal <Link href="/upgrades">card</Link> economy. A score from those sessions should not be compared with an unmodded <Link href="/guides/high-score">score route</Link>, and their behavior should not be used to explain base-game mechanics.</p></div>
      </section>

      <section className={`container ${styles.catalog}`}>
        <div className={styles.sectionHead}><div><span>LISTINGS CHECKED SEPTEMBER 14</span><h2>The listed mods and what they claim</h2><p>Descriptions stay close to the authors&apos; pages. Check each listing again before installing; requirements can change.</p></div></div>
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
