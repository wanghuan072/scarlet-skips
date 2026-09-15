import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { game, getGuide, getUpgrade, updates } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { videoGameSchema, websiteSchema } from "@/seo/schema";
import styles from "@/style/page/home/home.module.css";
import type { IconName } from "@/types/content";

const goals: Array<{
  icon: IconName;
  title: string;
  text: string;
  href: string;
  tone: string;
}> = [
  {
    icon: "controller",
    title: "I’m still learning the timing",
    text: "Get comfortable with the first rope before the upgrades start changing everything.",
    href: "/guides/beginner-guide",
    tone: "green",
  },
  {
    icon: "route",
    title: "I want to see the ending",
    text: "Build a small, safe rope setup and work toward the Super Rocket Shoes.",
    href: "/ending",
    tone: "blue",
  },
  {
    icon: "trophy",
    title: "I want a much bigger score",
    text: "Turn height, Luck and Rocket Fuel into a run that barely needs to land.",
    href: "/high-score",
    tone: "orange",
  },
  {
    icon: "award",
    title: "I only want the achievement",
    text: `“${game.achievementName}” is quicker—and sillier—than you probably expect.`,
    href: "/guides/achievement",
    tone: "pink",
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
    title: "Choose score or ending",
    text: "Both routes share early upgrades, but their late picks pull in different directions.",
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
    answer: "Jump Height and Increase Luck are the usual early priorities. If the rope setup feels fragile, Reinforce Jump Rope can be the better pick right now.",
    href: "/builds#planner",
    link: "See picks by goal",
  },
  {
    question: "Are more ropes always better?",
    answer: "No. Extra ropes create more action, but they also give you more chances to lose control. Many long-run strategies stay around two to four ropes early.",
    href: "/upgrades/add-jump-rope",
    link: "When to add a rope",
  },
  {
    question: "Does Scarlet Skips have an ending?",
    answer: "Yes. Players have documented a Moon ending. The route is real, but the exact height requirement has not been published by the developer.",
    href: "/ending",
    link: "Read the spoiler-light route",
  },
  {
    question: "How does the Rocket Fuel loop work?",
    answer: "A community high-score route reports that fuel refills when an upgrade appears. If the next upgrade arrives before the gauge runs dry, the loop can keep Scarlet airborne.",
    href: "/upgrades/upgrade-rocket-fuel",
    link: "Check the full explanation",
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
        <div className={styles.heroPicture}><Image src="/images/official/screenshot-1.jpg" alt={heroAlt} fill priority sizes="100vw"/></div>
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>STUCK ON A RUN? START HERE.</span>
            <h1>Scarlet Skips, without the guesswork.</h1>
            <p className={styles.heroTopics}>Learn the timing. Pick better cards. Reach the Moon.</p>
            <p className={styles.heroText}>
              Straight answers for the moments that actually stop a run—from the first rope to the first time Scarlet stays in the air.
            </p>
            <div className={styles.heroActions}>
              <Link href="/guides/beginner-guide">
                Help with my first run <Icon name="arrow" size={18} />
              </Link>
              <Link href="/builds#planner">
                <Icon name="cards" size={19} /> What should I pick?
              </Link>
            </div>
            <div className={styles.trustRow}>
              <span><Icon name="check" size={16} /> Updated for v{game.currentVersion}</span>
              <span><Icon name="cards" size={16} /> {game.upgradeCardCount} cards, {game.choicesPerLevel} choices</span>
              <span><Icon name="shield" size={16} /> Player claims marked clearly</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.snapshot}`} aria-labelledby="snapshot-title">
        <div className={styles.snapshotHeading}>
          <span><Icon name="controller" size={27} /></span>
          <div>
            <h2 id="snapshot-title">The game in 20 seconds</h2>
            <p>One button, three random choices, one increasingly strange run.</p>
          </div>
          <Link href="/game-info">Game details <Icon name="arrow" size={15} /></Link>
        </div>
        <div className={styles.snapshotGrid}>
          <div><Icon name="cards" size={28} /><strong>{game.upgradeCardCount}</strong><span>Upgrade cards</span><small>{game.documentedCardCount} names confirmed here</small></div>
          <div><Icon name="spark" size={28} /><strong>{game.choicesPerLevel}</strong><span>Choices each level</span><small>The draw is random</small></div>
          <div><Icon name="controller" size={28} /><strong>1</strong><span>Button to learn</span><small>Press, hold and release</small></div>
          <div><Icon name="gauge" size={28} /><strong>v{game.currentVersion}</strong><span>Guide version</span><small>{game.versionDate}</small></div>
          <div><Icon name="award" size={28} /><strong>{game.achievementCount}</strong><span>Steam achievement</span><small>{game.achievementName}</small></div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading icon="target" title="Where is your run going wrong?" description="Pick the sentence that sounds most like your last attempt." />
        <div className={styles.goalGrid}>
          {goals.map((goal) => (
            <Link key={goal.href} href={goal.href} data-tone={goal.tone}>
              <span><Icon name={goal.icon} size={30} /></span>
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
              <span className={styles.starterNumber}>0{index + 1}</span>
              <span className={styles.starterIcon}><Icon name={upgrade.icon} size={35} /></span>
              <div>
                <p>{index === 0 ? "More room to breathe" : index === 1 ? "More value later" : "Less rope panic"}</p>
                <h3>{upgrade.shortName}</h3>
                <span>{starterNotes[index]}</span>
              </div>
              <strong>When should I take it? <Icon name="arrow" size={16} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.runBand}>
        <div className="container">
          <div className={styles.runBandIntro}>
            <p className={styles.kicker}>A BETTER WAY TO LEARN</p>
            <h2>What a good run actually looks like</h2>
            <p>You do not need perfect reactions. You need a rhythm you can still read after the next upgrade changes it.</p>
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
        <SectionHeading icon="info" title="Quick answers before you jump again" description="The questions most players ask after the first few runs." />
        <div className={styles.answerGrid}>
          {quickAnswers.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              <Link href={item.href}>{item.link} <Icon name="arrow" size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className={`container ${styles.pickerBanner}`}>
        <span className={styles.pickerIcon}><Icon name="cards" size={34} /></span>
        <div>
          <p className={styles.kicker}>THREE CARDS ON SCREEN?</p>
          <h2>Tell us what you drew.</h2>
          <p>Choose your goal and current problem, then compare the exact three cards in front of you.</p>
        </div>
        <div className={styles.pickerLinks}>
          <Link href="/builds#planner">Help me pick <Icon name="arrow" size={17} /></Link>
          <Link href="/upgrades">Check every card</Link>
        </div>
      </section>

      <section className={`container ${styles.updateSection}`}>
        <div className={styles.updateIntro}>
          <span><Icon name="gauge" size={28} /></span>
          <div><p className={styles.kicker}>WHAT CHANGED?</p><h2>We’re checking against v{latestUpdate.version}</h2><p>{latestUpdate.summary}</p></div>
        </div>
        <div className={styles.updateChanges}>
          {latestUpdate.changes.slice(0, 3).map((change) => <span key={change}><Icon name="check" size={15} />{change}</span>)}
        </div>
        <Link className={styles.updateLink} href={`/updates/${latestUpdate.slug}`}>Read the patch notes <Icon name="arrow" size={16} /></Link>
      </section>
    </main>
  );
}
