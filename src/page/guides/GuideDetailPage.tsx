import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { SourcesList } from "@/components/common/SourcesList";
import { guides } from "@/lib/data/content";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import { RichText } from "@/page/guides/RichText";
import type { Guide } from "@/types/content";
import styles from "@/style/page/guides/guide-detail.module.css";

const quickTakes: Record<string, string> = {
  "beginner-guide": "Watch the rope hit the ground, make the same small jump a few times, and only change one thing after each card.",
  "how-to-play": "Press to jump, hold to stay up, let go to come down. The hard part is the landing after a card changes the rhythm.",
  tips: "If a run breaks after a new card, check what changed: the landing, rope count or speed. Fix that before adding more pressure.",
  achievement: "Start a fresh run. Don’t jump. Let the first rope hit Scarlet. That’s the unlock.",
  secrets: "Players report a Rocket Shoes refill during long jumps; the Moon ending and first-jump achievement are visible, but their exact rules are not all published.",
  "high-score": "Height and Luck first. Rocket Fuel once a jump already hangs. Fire, speed and extra ropes only after that loop has worked twice.",
  spectacle: "Extra ropes, fire, speed and tricks. Take the loud card on purpose — not if this run is actually going to the Moon.",
};

const heroCaptions: Record<string, string> = {
  "beginner-guide": "Watch the rope, not her hair.",
  "how-to-play": "One miss ends the run.",
  tips: "If we can’t see the gap, we have too many ropes.",
  achievement: "Hands off. Let the first rope hit.",
  "high-score": "Fire looks like score. Take it last.",
  spectacle: "The busy screen. That’s the point.",
};

const heroFacts: Record<string, { label: string; value: string }[]> = {
  "beginner-guide": [
    { label: "First job", value: "See the rope" },
    { label: "Early cards", value: "Height, shield" },
    { label: "Leave alone", value: "Fire, speed" },
  ],
  "how-to-play": [
    { label: "Press", value: "Jump" },
    { label: "Hold", value: "Stay up" },
    { label: "Let go", value: "Land" },
  ],
  tips: [
    { label: "Start from", value: "The miss" },
    { label: "Change", value: "One thing" },
    { label: "Then", value: "Learn the beat" },
  ],
  achievement: [
    { label: "Achievements", value: "1" },
    { label: "How", value: "Miss first jump" },
    { label: "Needs", value: "A fresh run" },
  ],
  "high-score": [
    { label: "First", value: "Height + Luck" },
    { label: "Then", value: "Rocket Fuel" },
    { label: "Last", value: "Fire" },
  ],
  spectacle: [
    { label: "The look", value: "Ropes + fire" },
    { label: "Extras", value: "Speed, tricks" },
    { label: "Not for", value: "The Moon" },
  ],
};

const extraStills: Record<string, { src: string; alt: string; caption: string }[]> = {
  "beginner-guide": [
    { src: "/images/official/screenshot-3.jpg", alt: "Three upgrade cards on the level-up screen", caption: "Three cards. Pick for this run." },
    { src: "/images/official/screenshot-7.jpg", alt: "Scarlet missing a skip with the rope around her legs", caption: "Late by a beat. That’s the run." },
  ],
  "how-to-play": [
    { src: "/images/official/screenshot-4.jpg", alt: "Scarlet clearing an active rope", caption: "Watch the rope at her feet." },
    { src: "/images/official/screenshot-3.jpg", alt: "Three upgrade cards on the level-up screen", caption: "The pause. Fix the next problem here." },
  ],
  tips: [
    { src: "/images/official/screenshot-7.jpg", alt: "Scarlet missing a skip with the rope around her legs", caption: "Work backward from the miss." },
    { src: "/images/official/screenshot-5.jpg", alt: "Scarlet airborne with Rocket Shoes", caption: "Watch the gauge. Land until it refills twice." },
  ],
  achievement: [
    { src: "/images/official/screenshot-1.jpg", alt: "Scarlet skipping in the park", caption: "After it pops, learn the real jump." },
  ],
  "high-score": [
    { src: "/images/official/screenshot-5.jpg", alt: "Scarlet airborne with Rocket Shoes", caption: "The fuel loop. That’s the engine." },
    { src: "/images/official/screenshot-6.jpg", alt: "A jump rope breaking into segments", caption: "More ropes after we can already stay up." },
  ],
  spectacle: [
    { src: "/images/official/screenshot-2.jpg", alt: "Scarlet above a flaming rope", caption: "Fire is the look. Unprotected fire is a short show." },
    { src: "/images/official/screenshot-3.jpg", alt: "Three upgrade cards on the level-up screen", caption: "Change one rhythm card at a time." },
  ],
};

const friendlyHeadings: Record<string, string> = {
  "What Is Scarlet Skips?": "It’s jump rope. Then the cards cheat.",
  "Basic Controls": "One button: press, hold, let go",
  "A First-30-Seconds Practice Routine": "Give the first 30 seconds to one boring jump",
  "How Jump Timing Works": "Watch the rope hit the ground, not Scarlet",
  "How Leveling and Upgrade Choices Work": "Three cards. Pick the one that saves this run.",
  "Which Upgrades Should Beginners Prioritize?": "Early cards: height, a shield, then Luck",
  "Common Beginner Mistakes": "Mistakes that make early runs harder",
  "First Build Recommendation": "A simple first plan",
  "When Should You Add More Ropes?": "Another rope is not free points",
  "Know When the Run Has Changed Shape": "When it stops feeling like jump rope",
  Controls: "There’s only one button",
  "PC Version and Requirements": "Will it run on this PC?",
  "Press, Hold and Release": "How that one button actually feels",
  "Jump Timing": "Time the rope, not the character",
  "Level Ups": "When the game pauses for a card",
  "Upgrade Choices": "How to pick between three cards",
  "Scoring and Progression": "What actually raises the score",
  "The Airtime Transition": "When we stop landing",
  "Losing and Recovering": "You missed. What now?",
  "Win and Ending Basics": "Yes, there’s an ending",
  "What the game confirms": "What the game confirms",
  "Early Run: Protect Information": "Keep the first minute readable",
  "Jump Timing: Plan the Descent": "Land where you can still see the next rope",
  "Upgrade Decisions: Ask Four Questions": "Ask this before you click",
  "Rope Management": "Don’t add ropes you can’t read",
  "Airtime and the Refill Test": "The Rocket Fuel trick",
  "Luck Without an Invented Formula": "Luck helps. Nobody knows the math.",
  "High Score Transition": "When to start chasing score",
  "Ending Transition": "When to start going for the Moon",
  "Diagnose a Failed Run": "Why that run died",
  "Claims to Treat Carefully": "Don’t treat these numbers as rules",
  "Achievement Facts": "There’s only one achievement",
  "Before You Start": "Start a fresh run",
  "How to Unlock Off to a Great Start": "Do nothing. Let the first rope hit.",
  "What backs this method?": "What backs this method?",
  Troubleshooting: "It didn’t pop. Try this.",
  "The pick order": "One player-reported card order",
  "Early run: make room for a long jump": "First: make the jump long enough",
  "Mid run: make the fuel loop repeat": "Then: make Rocket Fuel refill",
  "Late run: turn spare safety into score": "Last: ropes, speed, fire",
  "Signs the engine is ready": "Check the fuel gauge before adding pressure",
  "What usually ruins a score attempt": "What kills a score run",
  "What this route is for": "This is the loud run, not the Moon run",
  "Do not start loud": "Get a clean jump first",
  "Add ropes when the gap is readable": "Add ropes when you can still see the gap",
  "Fire is the look": "Fire is the show — and it can end the run",
  "Speed and tricks": "Speed and tricks come after we can still read it",
  "This is not the Moon": "Want the Moon? Switch routes.",
};

function headingFor(heading: string) {
  return friendlyHeadings[heading] ?? heading;
}

export default function GuideDetailPage({ guide }: { guide: Guide }) {
  const currentIndex = guides.findIndex((item) => item.slug === guide.slug);
  const next = guides[(currentIndex + 1) % guides.length];
  const stills = extraStills[guide.slug] ?? [];
  const facts = heroFacts[guide.slug];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.shortName,
    description: guide.description,
    dateModified: guide.updatedDate,
    image: guide.image,
    author: { "@type": "Organization", name: siteConfig.name, url: `${siteConfig.url}/about` },
  };

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.shortName, href: `/guides/${guide.slug}` }])} />
      <JsonLd data={articleSchema} />

      <div className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.shortName }]} />
      </div>

      <PageHero
        eyebrow={guide.category}
        title={guide.shortName}
        description={quickTakes[guide.slug] ?? guide.description}
        image={guide.image}
        imageAlt={guide.imageAlt}
        imageCaption={heroCaptions[guide.slug] ?? guide.imageAlt}
        lead={(
          <>
            <SourceBadge status={guide.sourceStatus} />
            <VersionBadge version="1.0.1" />
          </>
        )}
        facts={facts}
        actions={guide.links.slice(0, 2).map((link, index) => ({
          href: link.href,
          label: link.label,
          external: link.href.startsWith("http"),
          variant: (index === 0 ? "primary" : "ghost") as "primary" | "ghost",
        }))}
      />

      <div className={`container ${styles.layout}`}>
        <article className={styles.paper}>
          {guide.sections.map((section, index) => (
            <section key={section.heading} id={`section-${index + 1}`} className={styles.block}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{headingFor(section.heading)}</h2>
              </header>
              <div className={styles.prose}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}><RichText text={paragraph} /></p>
                ))}
              </div>
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}><Icon name="check" size={16} /><span><RichText text={bullet} /></span></li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        <aside className={styles.aside}>
          <nav className={styles.toc} aria-label="On this page">
            <p>On this page</p>
            <ol>
              {guide.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#section-${index + 1}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {headingFor(section.heading)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {stills.map((still) => (
            <figure key={still.src}>
              <Image src={still.src} alt={still.alt} fill sizes="280px" />
              <figcaption>{still.caption}</figcaption>
            </figure>
          ))}
        </aside>
      </div>

      <section className={`container ${styles.next}`} aria-labelledby="next-title">
        <p>NEXT</p>
        <h2 id="next-title">Keep going from here</h2>
        <div className={styles.nextLinks}>
          {guide.links.map((link) => (
            <Link key={`${link.href}-${link.label}`} href={link.href}>
              <strong>{link.label}</strong>
              <Icon name="arrow" size={16} />
            </Link>
          ))}
          <Link href={`/guides/${next.slug}`}>
            <strong>{next.shortName}</strong>
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
      <SourcesList ids={guide.sourceIds} />
    </main>
  );
}
