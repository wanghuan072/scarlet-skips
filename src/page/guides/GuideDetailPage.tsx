import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { guides } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import type { Guide } from "@/types/content";
import styles from "@/style/page/guides/guide-detail.module.css";

const pageTitles: Record<string, string> = {
  "beginner-guide": "Your first good Scarlet Skips run",
  "how-to-play": "How Scarlet Skips actually works",
  tips: "Tips that make the next run easier",
  achievement: "How to unlock Off to a Great Start",
  secrets: "Secrets, strange mechanics and what players found",
};

const quickTakes: Record<string, string> = {
  "beginner-guide": "Forget the score for a minute. Watch the rope touch the ground, make the same safe jump a few times, and only change one part of the run with each upgrade.",
  "how-to-play": "Press to jump, hold to keep rising, and release to come back down. The hard part is not the button—it is relearning the landing every time a card changes the run.",
  tips: "Most runs do not die because you picked a weak card. They die because you changed height, rope count or speed before you understood the new rhythm.",
  achievement: "Start a fresh run and do nothing on the first rope. Let Scarlet trip before completing a successful skip; that is the player-documented trigger.",
  secrets: "The big discoveries are the Rocket Fuel refill loop, the Moon ending and the backwards first-failure achievement. Exact formulas and stat caps are still not public.",
};

const friendlyHeadings: Record<string, string> = {
  "What Is Scarlet Skips?": "So, what kind of game is this?",
  "Basic Controls": "The one button you need",
  "A First-30-Seconds Practice Routine": "Try this for your first 30 seconds",
  "How Jump Timing Works": "Where should you watch the rope?",
  "How Leveling and Upgrade Choices Work": "What happens when you level up?",
  "Which Upgrades Should Beginners Prioritize?": "What should a beginner pick?",
  "Common Beginner Mistakes": "What usually ends an early run?",
  "First Build Recommendation": "A simple build for learning",
  "When Should You Add More Ropes?": "When are more ropes worth it?",
  "Know When the Run Has Changed Shape": "Notice when the old timing stops working",
  Controls: "How do the controls work?",
  "PC Version and Requirements": "Can your PC run it?",
  "Press, Hold and Release": "Press, hold, then let go",
  "Jump Timing": "Getting the timing to feel natural",
  "Level Ups": "When the upgrade screen appears",
  "Upgrade Choices": "How to choose between three cards",
  "Scoring and Progression": "What makes the score climb?",
  "The Airtime Transition": "When a jump turns into real airtime",
  "Losing and Recovering": "What to learn from a miss",
  "Win and Ending Basics": "Yes, there is an ending",
  "What Is Confirmed and What Is Not": "What do we actually know?",
  "Early Run: Protect Information": "Keep the opening easy to read",
  "Jump Timing: Plan the Descent": "Plan the landing, not just the jump",
  "Upgrade Decisions: Ask Four Questions": "Ask these four things before picking",
  "Rope Management": "Do not add ropes faster than you can read them",
  "Airtime and the Refill Test": "Test the Rocket Fuel loop safely",
  "Luck Without an Invented Formula": "Luck is useful, but the formula is unknown",
  "High Score Transition": "When to switch into score mode",
  "Ending Transition": "When to commit to the ending",
  "Diagnose a Failed Run": "Why did that run fall apart?",
  "Claims to Treat Carefully": "Numbers you should not treat as rules",
  "Achievement Facts": "The quick achievement answer",
  "Before You Start": "Before you press Play",
  "How to Unlock Off to a Great Start": "Do this on the first rope",
  "Why This Is Community Verified": "Why we think this trigger is right",
  Troubleshooting: "It did not unlock—now what?",
  "The Rocket Fuel Refill Loop": "The Rocket Fuel trick players found",
  "A Run Can Stop Landing": "How players stay in the air",
  "Ending Route Versus Score Route": "Ending run or score run? Pick one",
  "Ending Sequence — Full Spoilers": "What happens at the end (spoilers)",
  "Off to a Great Start Is Intentionally Backwards": "The achievement rewards a bad start",
  "Card Names and Community Aliases": "Why the same card has different names online",
  "What Is Still Unknown": "Things nobody has pinned down yet",
  "How to Verify a New Discovery": "Found something new? Test it like this",
};

export default function GuideDetailPage({ guide }: { guide: Guide }) {
  const currentIndex = guides.findIndex((item) => item.slug === guide.slug);
  const next = guides[(currentIndex + 1) % guides.length];
  const title = pageTitles[guide.slug] ?? guide.name;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.name,
    description: guide.description,
    dateModified: "2026-09-14",
    image: guide.image,
    author: { "@type": "Organization", name: "Scarlet Skips Guide" },
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Guides",href:"/guides"},{label:guide.shortName,href:`/guides/${guide.slug}`}])}/>
      <JsonLd data={articleSchema}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Guides",href:"/guides"},{label:guide.shortName}]}/></div>

      <header className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{guide.category}</span>
          <h1>{title}</h1>
          <p>{guide.description}</p>
          <div className={styles.badges}><SourceBadge status={guide.sourceStatus}/><VersionBadge version="1.0.1"/><span>{guide.sections.length + 2} min read</span></div>
        </div>
        <figure><div><Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 45vw"/></div><figcaption>Scarlet Skips gameplay image.</figcaption></figure>
      </header>

      <div className={`container ${styles.layout}`}>
        <article className={styles.content}>
          <section className={styles.quickTake}>
            <span><Icon name="spark" size={25}/></span>
            <div><p className={styles.kicker}>IF YOU ONLY READ ONE THING</p><h2>The quick answer</h2><p>{quickTakes[guide.slug] ?? guide.description}</p></div>
          </section>

          {guide.sections.map((section, index) => (
            <section key={section.heading} id={`section-${index + 1}`}>
              <h2>{friendlyHeadings[section.heading] ?? section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <p className={paragraphIndex === 0 ? styles.sectionLead : undefined} key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Icon name="check" size={17}/><span>{bullet}</span></li>)}</ul>}
            </section>
          ))}

          <section className={styles.nextSteps}>
            <p className={styles.kicker}>KEEP GOING</p>
            <h2>What do you want to do next?</h2>
            <div>{guide.links.map((link, index) => <Link key={`${link.href}-${link.label}-${index}`} href={link.href}>{link.label}<Icon name="arrow" size={17}/></Link>)}</div>
          </section>
        </article>

        <aside className={styles.sidebar}>
          <section>
            <h2>Jump to the answer</h2>
            <nav>{guide.sections.map((section,index) => <a key={section.heading} href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2,"0")}</span>{friendlyHeadings[section.heading] ?? section.heading}</a>)}</nav>
          </section>
          <Link className={styles.nextGuide} href={`/guides/${next.slug}`}><span>READ NEXT</span><strong>{pageTitles[next.slug] ?? next.shortName}</strong><Icon name="arrow" size={19}/></Link>
        </aside>
      </div>
    </main>
  );
}
