import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { guides } from "@/lib/data/content";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/guides/guides.module.css";

const guideCopy: Record<string, string> = {
  "beginner-guide": "Watch the rope. Make the same small jump. Don’t pile on cards until that jump feels boring.",
  "how-to-play": "Press, hold, let go. Then three cards. Then the jump changes.",
  tips: "The run just died. Start from the miss and fix that one thing.",
  achievement: "New run. Don’t jump. Let the first rope hit. That’s the unlock.",
  secrets: "Rocket Fuel refill, the Moon, and the first-jump miss. Exact numbers are still unpublished.",
  "high-score": "Stay up first. Then pile on score. Fire last.",
  spectacle: "Extra ropes, fire, speed and tricks. Not if this run is going to the Moon.",
};

const guideGroups = [
  {
    title: "Start a run without guessing",
    text: "See the rope, land the same jump, then make sense of the three cards.",
    slugs: ["beginner-guide", "how-to-play"],
  },
  {
    title: "Keep a promising run alive",
    text: "Once it isn’t just one rope, the question is which card wrecked the beat — and when to stop adding more.",
    slugs: ["tips"],
    extras: [
      { href: "/upgrades", title: "What does this card do?", label: "CARD LIBRARY", text: "See the name on screen, then get the short player answer before we click.", image: "/images/official/screenshot-3.jpg", alt: "Official Scarlet Skips screenshot of the three-card level-up choice" },
      { href: "/builds#simulator", title: "Practice a full upgrade run", label: "RUN SIMULATOR", text: "Jump, pause, pick a card, and watch why one choice helps this route and another wrecks it.", image: "/images/official/screenshot-1.jpg", alt: "Official Scarlet Skips gameplay showing Scarlet jumping in the park" },
    ],
  },
  {
    title: "Pick a destination",
    text: "Moon, score and a wild screen want different late cards. Don’t copy one order for all three.",
    slugs: ["high-score", "spectacle", "achievement"],
    extras: [
      { href: "/ending", title: "How to reach the Moon", label: "ENDING ROUTE", text: "Fewer ropes, no fire, then height and fuel. We keep the ending hidden until we ask for it.", image: "/images/official/screenshot-5.jpg", alt: "Official Scarlet Skips screenshot showing the Rocket Shoes state" },
    ],
  },
];

export default function GuidesPage() {
  const latestGuideDate = guides.reduce((latest, guide) => guide.updatedDate > latest ? guide.updatedDate : latest, "");
  const latestGuideMonth = new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${latestGuideDate}T00:00:00.000Z`));
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Guides",href:"/guides"}])}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Guides"}]}/></div>
      <PageHero
        eyebrow="FIND THE HELP YOU NEED"
        titlePrefix="Scarlet Skips Guides"
        title="Find help for your next run"
        description="Start with the one-button jump, work out why a landing failed, or choose a route for the Moon, score or spectacle."
        image="/images/official/screenshot-4.jpg"
        imageAlt="Scarlet clearing an active rope"
        imageCaption="Watch the loop. Then pick the guide we actually need."
      >
        <p className={styles.byline}>Guides by <Link href="/about#who-writes-the-guides">{siteConfig.guideAuthor}</Link><span aria-hidden="true">·</span> Latest guide update <time dateTime={latestGuideDate}>{latestGuideMonth}</time></p>
      </PageHero>
      <section className={`container ${styles.guideSections}`}>
        {guideGroups.map((group) => {
          const cards = group.slugs
            .map((slug) => guides.find((guide) => guide.slug === slug))
            .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));
          return (
            <section key={group.title}>
              <div className={styles.categoryHead}><span><Icon name="book" size={27} /></span><div><h2>{group.title}</h2><p>{group.text}</p></div></div>
              <div className={styles.guideGrid}>
                {cards.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                    <div className={styles.cardImage}><Image src={guide.image} alt={guide.imageAlt} fill sizes="(max-width: 768px) 100vw, 32vw" /></div>
                    <div><span>{guide.category}</span><h3>{guide.shortName}</h3><p>{guideCopy[guide.slug] ?? guide.description}</p><strong>Open this guide <Icon name="arrow" size={16} /></strong></div>
                  </Link>
                ))}
                {group.extras?.map((guide) => (
                  <Link key={guide.href} href={guide.href}>
                    <div className={styles.cardImage}><Image src={guide.image} alt={guide.alt} fill sizes="(max-width: 768px) 100vw, 32vw" /></div>
                    <div><span>{guide.label}</span><h3>{guide.title}</h3><p>{guide.text}</p><strong>Open this guide <Icon name="arrow" size={16} /></strong></div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
