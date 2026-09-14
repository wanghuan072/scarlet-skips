import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { SectionHeading } from "@/components/common/SectionHeading";
import { UpgradeCard } from "@/components/common/UpgradeCard";
import { game, getGuide, getUpgrade, updates, upgrades } from "@/lib/data/content";
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
    title: "Learn the Basics",
    text: "Master the one-button rhythm and make safer first picks.",
    href: "/guides/beginner-guide",
    tone: "green",
  },
  {
    icon: "route",
    title: "Reach the Ending",
    text: "Follow a spoiler-light route toward the Moon ending.",
    href: "/ending",
    tone: "blue",
  },
  {
    icon: "trophy",
    title: "Push a High Score",
    text: "Build the height, Luck and Rocket Fuel airtime loop.",
    href: "/high-score",
    tone: "orange",
  },
  {
    icon: "award",
    title: "Unlock the Achievement",
    text: `Learn the unusual trigger for “${game.achievementName}.”`,
    href: "/guides/achievement",
    tone: "pink",
  },
];

export default function HomePage() {
  const howToPlay = getGuide("how-to-play")!;
  const rocketFuel = getUpgrade("upgrade-rocket-fuel")!;
  const latestUpdate = updates[0];
  const heroAlt = "Editorial illustration of Scarlet skipping rope through a sunny park";
  const common = { alt: heroAlt, sizes: "100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    width: 2172,
    height: 724,
    src: "/images/editorial/home-hero-v2.webp",
  });
  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    width: 1122,
    height: 1402,
    src: "/images/editorial/home-hero-mobile.webp",
  });

  const featuredGuides = [
    {
      eyebrow: "Beginner Guide",
      title: "How to Play Scarlet Skips",
      text: howToPlay.description,
      href: `/guides/${howToPlay.slug}`,
      image: howToPlay.image,
      alt: howToPlay.imageAlt,
    },
    {
      eyebrow: "Build Mechanic",
      title: "How the Rocket Fuel Loop Works",
      text: "Learn when powered airtime becomes useful, what players report about fuel refills and why the loop is not guaranteed.",
      href: `/upgrades/${rocketFuel.slug}`,
      image: rocketFuel.image,
      alt: rocketFuel.imageAlt,
    },
    {
      eyebrow: "Ending Guide",
      title: "Reach the Moon Without Chasing Fire",
      text: "Use a smaller reinforced rope set, then build height, Luck and fuel toward the documented final ascent.",
      href: "/ending",
      image: "/images/editorial/ending-hero.webp",
      alt: "Editorial illustration of Scarlet ascending toward the Moon",
    },
  ];

  return (
    <main id="main-content">
      <JsonLd data={websiteSchema} />
      <JsonLd data={videoGameSchema} />

      <section className={styles.hero}>
        <picture className={styles.heroPicture}>
          <source media="(min-width: 769px)" srcSet={desktopSrcSet} />
          <img
            {...mobileProps}
            alt={heroAlt}
            srcSet={mobileSrcSet}
            fetchPriority="high"
          />
        </picture>
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>THE COMPLETE GUIDE FOR</span>
            <h1>Scarlet Skips Guide</h1>
            <p className={styles.heroTopics}>
              Upgrades <span>·</span> Builds <span>·</span> Ending <span>·</span> High Score
            </p>
            <p className={styles.heroText}>
              Learn every documented upgrade, plan a build and follow source-labelled routes from your first skip to the Moon.
            </p>
            <div className={styles.heroActions}>
              <Link href="/upgrades">
                Explore Upgrades <Icon name="arrow" size={18} />
              </Link>
              <Link href="/ending">
                <Icon name="route" size={19} /> Reach the Ending
              </Link>
            </div>
            <div className={styles.trustRow}>
              <span><Icon name="check" size={16} /> Official facts checked</span>
              <span><Icon name="shield" size={16} /> Community routes labelled</span>
              <span><Icon name="gauge" size={16} /> Updated for v{game.currentVersion}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.snapshot}`} aria-labelledby="snapshot-title">
        <div className={styles.snapshotHeading}>
          <span><Icon name="controller" size={27} /></span>
          <div>
            <h2 id="snapshot-title">Game Snapshot</h2>
            <p>Verified basics before you start a run.</p>
          </div>
          <Link href="/game-info">View game details <Icon name="arrow" size={15} /></Link>
        </div>
        <div className={styles.snapshotGrid}>
          <div><Icon name="cards" size={28} /><strong>{game.upgradeCardCount}</strong><span>Upgrade Cards</span><small>{game.documentedCardCount} names documented</small></div>
          <div><Icon name="spark" size={28} /><strong>{game.choicesPerLevel}</strong><span>Choices per Level</span><small>Random power-ups</small></div>
          <div><Icon name="trophy" size={28} /><strong>{game.achievementCount}</strong><span>Steam Achievement</span><small>{game.achievementName}</small></div>
          <div><Icon name="gauge" size={28} /><strong>v{game.currentVersion}</strong><span>Current Version</span><small>{game.versionDate}</small></div>
          <div><Icon name="calendar" size={28} /><strong>{game.releaseDateShort}</strong><span>Release Date</span><small>Windows PC</small></div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading
          icon="cards"
          title="Popular Upgrades"
          description={`Explore ${game.documentedCardCount} documented cards without invented stats or names.`}
          href="/upgrades"
          linkLabel="View all upgrades"
        />
        <div className={styles.upgradeGrid}>
          {upgrades.slice(0, 6).map((upgrade) => (
            <UpgradeCard key={upgrade.slug} upgrade={upgrade} tile />
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <SectionHeading
          icon="target"
          title="What’s Your Goal?"
          description="Choose the result you want, then follow a focused route."
          href="/builds"
          linkLabel="View all builds"
        />
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
        <SectionHeading
          icon="book"
          title="Featured Guides"
          description="The answers players look for most: controls, airtime and the ending."
          href="/guides"
          linkLabel="View all guides"
        />
        <div className={styles.guideGrid}>
          {featuredGuides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <div className={styles.guideImage}>
                <Image src={guide.image} alt={guide.alt} fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.guideBody}>
                <span>{guide.eyebrow}</span>
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
                <strong>Read guide <Icon name="arrow" size={15} /></strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={`container ${styles.pickerBanner}`}>
        <span className={styles.pickerIcon}><Icon name="cards" size={34} /></span>
        <div>
          <p className={styles.kicker}>FREE RUN TOOL</p>
          <h2>Stuck on a three-card choice?</h2>
          <p>Enter the cards on your screen and get a contextual recommendation for your current goal and run state.</p>
        </div>
        <div className={styles.pickerLinks}>
          <Link href="/lab/pick-my-upgrade">Pick My Upgrade <Icon name="arrow" size={17} /></Link>
          <Link href="/tools">All tools</Link>
        </div>
      </section>

      <section className={`container ${styles.updateSection}`}>
        <div className={styles.updateIntro}>
          <span><Icon name="gauge" size={28} /></span>
          <div><p className={styles.kicker}>LATEST UPDATE</p><h2>Guide baseline: v{latestUpdate.version}</h2><p>{latestUpdate.summary}</p></div>
        </div>
        <div className={styles.updateChanges}>
          {latestUpdate.changes.slice(0, 3).map((change) => <span key={change}><Icon name="check" size={15} />{change}</span>)}
        </div>
        <Link className={styles.updateLink} href={`/updates/${latestUpdate.slug}`}>Read patch notes <Icon name="arrow" size={16} /></Link>
      </section>
    </main>
  );
}
