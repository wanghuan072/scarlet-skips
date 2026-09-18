import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { UpgradeArt } from "@/components/common/UpgradeArt";
import { siteConfig } from "@/config/site";
import { game, getGuide, getUpgrade, updates } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { videoGameSchema, websiteSchema } from "@/seo/schema";
import styles from "@/style/page/home/home.module.css";
import { RichText } from "@/page/guides/RichText";
import type { IconName } from "@/types/content";

const goals: Array<{
  title: string;
  text: string;
  href: string;
  image: string;
  imageAlt: string;
}> = [
  {
    title: "Still learning the timing?",
    text: "Find a repeatable beat before the cards change it.",
    href: "/guides/beginner-guide",
    image: "/images/official/screenshot-1.jpg",
    imageAlt: "Scarlet jumping rope in the park",
  },
  {
    title: "Not sure which route?",
    text: "Compare the Moon, score and spectacle plans.",
    href: "/builds",
    image: "/images/official/screenshot-5.jpg",
    imageAlt: "Scarlet airborne during a long jump",
  },
  {
    title: "Run breaks after a card?",
    text: "Check which part of the timing changed.",
    href: "/guides/tips",
    image: "/images/official/screenshot-7.jpg",
    imageAlt: "Scarlet reacting after a missed skip",
  },
  {
    title: "Three cards hard to choose?",
    text: "Pick for the run you have, not a fixed list.",
    href: "/guides/how-to-play#section-7",
    image: "/images/official/screenshot-3.jpg",
    imageAlt: "Three upgrade cards offered after a level-up",
  },
];

const runLessons: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "controller",
    title: "Find one repeatable beat",
    text: "Watch the rope meet the ground. A clean, boring jump is better than a panicked high one.",
  },
  {
    icon: "cards",
    title: "Fix the next problem",
    text: "Pick for the run you have. If the landing is already messy, a flashy score card can wait.",
  },
  {
    icon: "target",
    title: "Choose Moon, score or spectacle",
    text: "They share early cards. Late picks pull apart. Fire helps a score run and wrecks a Moon climb.",
  },
  {
    icon: "gauge",
    title: "Test before you commit",
    text: "After height, speed or fuel changes, give yourself a few safe cycles to learn the new timing.",
  },
];

const quickAnswers = [
  {
    question: "What should I pick first?",
    answer: "If the first rope is still hard to clear, Jump Height may give you more room. If the pattern is already comfortable, Luck can help the run progress; Reinforce is useful when losing a rope would hurt. The [beginner guide](/guides/beginner-guide) explains those trade-offs.",
    href: "/builds#simulator",
    link: "Try those picks in a run",
  },
  {
    question: "Are more ropes always better?",
    answer: "No. Another rope changes the pattern and can make a landing harder to read. Add one when you can already handle the current set; the [beginner guide](/guides/beginner-guide) starts with control instead.",
    href: "/upgrades/add-jump-rope",
    link: "When to add a rope",
  },
  {
    question: "Does Scarlet Skips have an ending?",
    answer: "Yes. Recorded gameplay shows Scarlet reaching the Moon. The [ending guide](/ending) explains a player-reported route, but no official height requirement has been published.",
    href: "/ending",
    link: "Read the spoiler-light route",
  },
  {
    question: "How does the Rocket Fuel loop work?",
    answer: "One player route reports a fuel refill when an upgrade appears. If the next upgrade arrives before the gauge empties, a long jump may continue. Watch the gauge in your own run; the [high-score guide](/guides/high-score) explains the setup.",
    href: "/guides/high-score",
    link: "Read the score route",
  },
  {
    question: "Why does Steam say 10 cards when this site lists 16?",
    answer: "Steam advertises 10 upgrade cards. Our [card list](/upgrades) also shows 16 named rows in the shipping data, including three outside the regular progression. Those counts describe different things; the list does not promise that every row appears in a normal three-card offer.",
    href: "/upgrades#card-count-title",
    link: "See how the counts differ",
  },
  {
    question: "Why does Steam show a mature-content warning?",
    answer: "The developer lists suggestive themes, revealing clothing and exaggerated animation among the reasons. The [Scarlet page](/character) explains the wording and links to the current Steam description so you can decide before buying.",
    href: "/character#mature-content-title",
    link: "Read the store warning",
  },
];

export default function HomePage() {
  const howToPlay = getGuide("how-to-play")!;
  const rocketFuel = getUpgrade("upgrade-rocket-fuel")!;
  const starterUpgrades = [
    getUpgrade("increase-jump-height")!,
    getUpgrade("increase-luck")!,
    getUpgrade("reinforce-jump-rope")!,
  ];
  const starterNotes = [
    "Take it when the basic jump feels cramped. The extra room makes the next few landings much easier to read.",
    "Take it early when the current pattern already feels safe. Luck has more time to pay you back over a full run.",
    "Take it when losing one rope would make the whole setup fall apart. It buys stability, not instant height.",
  ];
  const latestUpdate = updates[0];
  const heroAlt = "Official Scarlet Skips gameplay showing Scarlet clearing the jump rope in the park";

  const featuredGuides = [
    {
      eyebrow: "Start here",
      title: "Your first good run",
      text: "Learn what the one button actually does, where to watch the rope and why your landing matters more than your launch.",
      href: `/guides/${howToPlay.slug}`,
      image: howToPlay.image,
      alt: howToPlay.imageAlt,
    },
    {
      eyebrow: "Build help",
      title: "Make Rocket Fuel useful",
      text: "Fuel feels weak at the start. It becomes run-changing only after height and progression can carry you to the next upgrade.",
      href: `/upgrades/${rocketFuel.slug}`,
      image: rocketFuel.image,
      alt: rocketFuel.imageAlt,
    },
    {
      eyebrow: "Ending route",
      title: "Get to the Moon without wrecking the run",
      text: "Keep the rope set manageable, reinforce it, then lean into height, Luck and fuel while leaving fire alone.",
      href: "/ending",
      image: "/images/official/screenshot-5.jpg",
      alt: "Official Scarlet Skips gameplay showing the glowing Rocket Shoes effect",
    },
  ];

  return (
    <main id="main-content">
      <JsonLd data={websiteSchema} />
      <JsonLd data={videoGameSchema} />

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Image className={styles.heroImage} src="/images/official/screenshot-1.jpg" alt={heroAlt} fill priority sizes="(max-width: 768px) 100vw, 1400px" />
          <div className={styles.heroCopy}>
            <h1>
              <span className={styles.heroBrand}>Scarlet Skips</span>
              <span className="sr-only"> – </span>
              <span className={styles.heroLine}>Learn the jump. Then pick a route.</span>
            </h1>
            <p className={styles.heroText}>
              Need help with a landing, a three-card choice or a longer run? Start with the <Link href="/guides/beginner-guide">beginner guide</Link>, compare <Link href="/upgrades">upgrades</Link>, or choose a route that fits your goal.
            </p>
            <nav className={styles.heroRoutes} aria-label="Choose a route">
              <Link href="/builds#moon"><Icon name="rocket" size={15} /> Moon</Link>
              <Link href="/builds#score"><Icon name="trophy" size={15} /> Score</Link>
              <Link href="/builds#spectacle"><Icon name="fire" size={15} /> Spectacle</Link>
            </nav>
            <div className={styles.heroActions}>
              <Link href="/guides/beginner-guide">
                First run <Icon name="arrow" size={18} />
              </Link>
              <Link href="/builds#simulator">
                <Icon name="cards" size={19} /> Play a run
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.snapshot}`} aria-label="Scarlet Skips at a glance">
        <div className={styles.snapshotGrid}>
          <div><Icon name="cards" size={28} /><strong>{game.upgradeCardCount} cards</strong><small><Link href="/upgrades#card-count-title">Steam count; {game.documentedCardCount} named rows explained</Link></small></div>
          <div><Icon name="spark" size={28} /><strong>{game.choicesPerLevel} choices</strong><small>One card at each level-up</small></div>
          <div><Icon name="controller" size={28} /><strong>1 button</strong><small>Press, hold and release</small></div>
          <div><Icon name="gauge" size={28} /><strong>v{game.currentVersion}</strong><small>{game.versionDate}</small></div>
          <div><Icon name="award" size={28} /><strong>{game.achievementCount} achievement</strong><small><a href={siteConfig.steamUrl} target="_blank" rel="noopener noreferrer">{game.achievementName} on Steam</a></small></div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading icon="target" title="Where is your run going wrong?" description="Pick the sentence that sounds most like your last attempt." />
        <div className={styles.goalGrid}>
          {goals.map((goal) => (
            <Link key={goal.href} href={goal.href}>
              <span className={styles.goalImage}><Image src={goal.image} alt={goal.imageAlt} fill sizes="(max-width: 768px) 88px, 80px" /></span>
              <div><h3>{goal.title}</h3><p>{goal.text}</p></div>
              <Icon name="arrow" size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading icon="cards" title="Three picks that make early runs easier" description="There is no automatic best card, but these are useful before the run gets chaotic." href="/upgrades" linkLabel="Browse every upgrade" />
        <div className={styles.starterGrid}>
          {starterUpgrades.map((upgrade, index) => (
            <Link key={upgrade.slug} href={`/upgrades/${upgrade.slug}`} data-tone={upgrade.color}>
              <UpgradeArt slug={upgrade.slug} title={upgrade.gameTitle ?? upgrade.name} size="tile" />
              <div>
                <p>{index === 0 ? "More room to breathe" : index === 1 ? "More value later" : "Less rope panic"}</p>
                <h3>{upgrade.gameTitle ?? upgrade.name}</h3>
                <span>{starterNotes[index]}</span>
                <strong>When should I take it? <Icon name="arrow" size={16} /></strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.runBand}>
        <div className="container">
          <div className={styles.runBandIntro}>
            <p className={styles.kicker}>A BETTER WAY TO LEARN</p>
            <h2>What a good run actually looks like</h2>
            <p>You do not need perfect reactions. You need a rhythm you can still read after the next upgrade changes it. The <Link href="/guides/beginner-guide">first-run guide</Link> is that rhythm, written slowly.</p>
          </div>
          <ol className={styles.runSteps}>
            {runLessons.map((lesson, index) => (
              <li key={lesson.title}>
                <span><Icon name={lesson.icon} size={25} /></span>
                <small>STEP {index + 1}</small>
                <h3>{lesson.title}</h3>
                <p>{lesson.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading icon="book" title="Guides worth opening mid-run" description="Short enough to find the answer, detailed enough to explain why it works." href="/guides" linkLabel="See all guides" />
        <div className={styles.guideGrid}>
          {featuredGuides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <div className={styles.guideImage}><Image src={guide.image} alt={guide.alt} fill sizes="(max-width: 768px) 100vw, 33vw" /></div>
              <div className={styles.guideBody}>
                <span>{guide.eyebrow}</span>
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
                <strong>Show me how <Icon name="arrow" size={15} /></strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading icon="info" title="Questions before the next run" description="Quick answers when a card choice or an ending route is still unclear." />
        <div className={styles.answerGrid}>
          {quickAnswers.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p><RichText text={item.answer} /></p>
              <Link href={item.href}>{item.link} <Icon name="arrow" size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className={`container ${styles.aboutSection}`} aria-labelledby="about-this-site">
        <div>
          <p className={styles.kicker}>ABOUT THIS GUIDE</p>
          <h2 id="about-this-site">Find the next useful move, not a guaranteed build.</h2>
        </div>
        <div>
          <p>This independent Scarlet Skips fan guide is for the moment a run gives you a question: how to land, which card to take, or whether to aim for the Moon or a bigger score. The guides, card pages and patch notes keep official game details separate from player-reported routes. Exact scoring and upgrade values are left open when the game has not published them.</p>
          <Link href="/about">How this guide handles game information <Icon name="arrow" size={16} /></Link>
        </div>
      </section>

      <section className={`container ${styles.pickerBanner}`}>
        <span className={styles.pickerIcon}><Icon name="cards" size={34} /></span>
        <div>
          <p className={styles.kicker}>THREE CARDS ON SCREEN?</p>
          <h2>Play the pause.</h2>
          <p>Skip until the rope fills, take one of the three cards, and watch Jump Level, Luck and the ropes move.</p>
        </div>
        <div className={styles.pickerLinks}>
          <Link href="/builds#simulator">Play a run <Icon name="arrow" size={17} /></Link>
          <Link href="/upgrades">Check every card</Link>
        </div>
      </section>

      <section className={`container ${styles.updateSection}`}>
        <div className={styles.updateIntro}>
          <span><Icon name="gauge" size={28} /></span>
          <div><p className={styles.kicker}>WHAT CHANGED?</p><h2>Patch v{latestUpdate.version}</h2><p>Using Rocket Shoes or extinguished ropes in a route? Check the hotfix before following older advice.</p></div>
        </div>
        <Link className={styles.updateLink} href={`/updates/${latestUpdate.slug}`}>Read the patch notes <Icon name="arrow" size={16} /></Link>
      </section>
    </main>
  );
}
