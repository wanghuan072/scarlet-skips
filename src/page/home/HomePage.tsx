import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SourceBadge } from "@/components/common/Badges";
import { UpgradeCard } from "@/components/common/UpgradeCard";
import { game, guides, updates, upgrades } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { videoGameSchema, websiteSchema } from "@/seo/schema";
import styles from "@/style/page/home/home.module.css";

const faq = [
  { question: "What is Scarlet Skips?", answer: "Scarlet Skips is a one-button roguelike score-attack game by Yerk Games. You time jumps, level up and combine upgrade cards to change each run." },
  { question: "How many upgrades are in Scarlet Skips?", answer: "The official Steam page says there are 10 upgrade cards. Seven card names are currently documented on this site; the remaining names are not guessed." },
  { question: "How do upgrades work?", answer: "Each level-up offers three random power-ups. You choose one, and upgrades can stack and combine into different run builds." },
  { question: "Does Scarlet Skips have an ending?", answer: "Yes. A Steam Community guide documents an ending route. Our ending page starts spoiler-free and hides the final sequence until you choose to reveal it." },
  { question: "How do I get a high score?", answer: "Community routes first build Jump Height and Luck, then connect Rocket Fuel and later add rope quantity, speed and fire once the run is stable." },
  { question: "Where can I play Scarlet Skips?", answer: "Scarlet Skips is a single-player Windows game on Steam. The official minimum listing starts at Windows 10, 8 GB RAM and 2 GB of storage; this website is a guide and does not host the game." },
];

const snapshot = [
  { icon: "cards" as const, value: String(game.upgradeCardCount), label: "Upgrade cards", note: `${game.documentedCardCount} names documented` },
  { icon: "spark" as const, value: String(game.choicesPerLevel), label: "Choices per level", note: "Random power-ups" },
  { icon: "award" as const, value: String(game.achievementCount), label: "Achievement", note: game.achievementName },
  { icon: "gauge" as const, value: game.currentVersion, label: "Current version", note: game.versionDate },
  { icon: "calendar" as const, value: game.releaseDateShort, label: "Release date", note: "Available on Steam" },
];

const tools = [
  { icon: "flask" as const, title: "Build Planner", text: "Create a goal-based build and inspect strengths, gaps and next picks.", href: "/run-lab/build-planner" },
  { icon: "cards" as const, title: "Upgrade Picker", text: "Compare the three cards currently offered during your run.", href: "/run-lab/upgrade-picker" },
  { icon: "route" as const, title: "Ending Route", text: "Save a spoiler-light completion checklist on this device.", href: "/run-lab/ending-route" },
];

const goals = [
  { icon: "trophy" as const, title: "Reach the Ending", text: "Follow a controlled, spoiler-light route.", href: "/ending", tone: "green" },
  { icon: "gauge" as const, title: "Get a High Score", text: "Build the airtime engine before scaling fire.", href: "/high-score", tone: "blue" },
  { icon: "controller" as const, title: "Learn the Game", text: "Start with the rhythm and readable upgrades.", href: "/guides/beginner-guide", tone: "orange" },
  { icon: "spark" as const, title: "Try Something Fun", text: "Plan a wild multi-rope or Rocket build.", href: "/builds", tone: "pink" },
];

export default function HomePage() {
  const latest = updates[0];
  const heroAlt = "Editorial illustration of Scarlet skipping rope in a sunny park";
  const heroImageCommon = { alt: heroAlt, sizes: "100vw" };
  const { props: { srcSet: desktopHeroSrcSet } } = getImageProps({ ...heroImageCommon, width: 2172, height: 724, src: "/images/editorial/home-hero-v2.webp" });
  const { props: { srcSet: mobileHeroSrcSet, ...mobileHeroProps } } = getImageProps({ ...heroImageCommon, width: 1122, height: 1402, src: "/images/editorial/home-hero-mobile.webp" });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main id="main-content">
      <JsonLd data={websiteSchema} />
      <JsonLd data={videoGameSchema} />
      <JsonLd data={faqSchema} />

      <section className={styles.hero}>
        <picture className={styles.heroPicture}>
          <source media="(min-width: 769px)" srcSet={desktopHeroSrcSet} />
          <img {...mobileHeroProps} alt={heroAlt} srcSet={mobileHeroSrcSet} fetchPriority="high" />
        </picture>
        <div className={styles.heroShade} />
        <p className={styles.heroMotto} aria-hidden="true">Same park.<br/>Higher run.</p>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>THE COMPLETE GUIDE FOR</span>
            <h1>Scarlet Skips<span className="sr-only"> Guide and Run Lab</span></h1>
            <p className={styles.heroTopics}>Guide · Upgrades · Builds · Run Lab</p>
            <p className={styles.heroText}>Master the timing, compare verified upgrades, plan builds and follow player-tested routes toward the ending.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/upgrades">Explore upgrades <Icon name="arrow" size={18}/></Link>
              <Link className={styles.secondaryButton} href="/run-lab"><Icon name="flask" size={20}/> Open Run Lab</Link>
            </div>
            <div className={styles.trustRow}>
              <span><Icon name="check" size={17}/> Accurate data</span>
              <span><Icon name="shield" size={17}/> Community verified</span>
              <span><Icon name="gauge" size={17}/> Version tracked</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.snapshot}`} aria-labelledby="snapshot-heading">
        <div className={styles.snapshotHeader}><div className={styles.snapshotTitle}><span><Icon name="controller" size={25}/></span><div><h2 id="snapshot-heading">Game Snapshot</h2><p>Scarlet Skips at a glance</p></div></div><Link href="/guides/how-to-play">View game details <Icon name="arrow" size={16}/></Link></div>
        <div className={styles.snapshotGrid}>
          {snapshot.map((item) => <article key={item.label}><span><Icon name={item.icon} size={29}/></span><div><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.note}</p></div></article>)}
        </div>
      </section>

      <section className={styles.homeSection}>
        <div className="container">
          <div className={styles.labPanel}>
            <SectionHeading icon="flask" title="Run Lab" description="Plan smarter. Jump higher." href="/run-lab" linkLabel="See all tools"/>
            <div className={styles.toolGrid}>
              {tools.map((tool) => <Link key={tool.href} href={tool.href}><span><Icon name={tool.icon} size={30}/></span><div><h3>{tool.title}</h3><p>{tool.text}</p></div><Icon name="arrow" size={20}/></Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.homeSection}>
        <div className="container">
          <SectionHeading icon="cards" title="Popular upgrades" description="Browse the verified cards players use to shape a run." href="/upgrades" linkLabel="View all upgrades"/>
          <div className={styles.upgradeGrid}>{upgrades.slice(0, 6).map((upgrade) => <UpgradeCard key={upgrade.slug} upgrade={upgrade} tile/>)}</div>
        </div>
      </section>

      <section className={styles.goalSection}>
        <div className="container">
          <SectionHeading icon="target" title="What's your goal?" description="Start with what you want from the run, not a generic tier list." href="/builds" linkLabel="Compare builds"/>
          <div className={styles.goalGrid}>
            {goals.map((goal) => <Link key={goal.href} href={goal.href} data-tone={goal.tone}><span><Icon name={goal.icon} size={30}/></span><div><h3>{goal.title}</h3><p>{goal.text}</p></div><Icon name="arrow" size={18}/></Link>)}
          </div>
        </div>
      </section>

      <section className={styles.homeSection}>
        <div className={`container ${styles.guidesUpdateGrid}`}>
          <div>
            <SectionHeading icon="book" title="Latest guides" description="Focused help for the next decision in your run." href="/guides" linkLabel="View all guides"/>
            <div className={styles.guideGrid}>
              {guides.slice(0, 3).map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className={styles.guideCard}><div className={styles.guideImage}><Image src={guide.image} alt={guide.imageAlt} fill sizes="(max-width: 768px) 100vw, 28vw"/></div><div><span>{guide.category}</span><h3>{guide.shortName}</h3><p>{guide.description}</p><strong>Read guide <Icon name="arrow" size={15}/></strong></div></Link>)}
            </div>
          </div>
          <aside className={styles.updateCard} aria-labelledby="latest-update-heading">
            <div className={styles.updateHead}><span><Icon name="gauge" size={24}/></span><div><small>LATEST UPDATE</small><h2 id="latest-update-heading">Version {latest.version}</h2></div></div>
            <div className={styles.updateImage}><Image src="/images/official/screenshot-5.jpg" alt="Scarlet using Rocket Shoes, a system fixed in update 1.0.1" fill sizes="360px"/></div>
            <p>{latest.summary}</p>
            <ul>{latest.changes.slice(0, 4).map((change) => <li key={change}><Icon name="check" size={15}/>{change}</li>)}</ul>
            <div className={styles.updateMeta}><SourceBadge status="Official"/><span>{latest.date}</span></div>
            <Link href={`/updates/${latest.slug}`}>Read patch summary <Icon name="arrow" size={17}/></Link>
          </aside>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <SectionHeading icon="info" title="Scarlet Skips FAQ" description="Short answers, with deeper routes when you need them."/>
          <div className={styles.faqGrid}>{faq.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<Icon name="plus" size={18}/></summary><p>{item.answer}</p></details>)}</div>
          <p className={styles.faqNote}>This is an independent fan resource. Gameplay facts are separated from community strategies, and unknown values stay unknown.</p>
        </div>
      </section>
    </main>
  );
}
