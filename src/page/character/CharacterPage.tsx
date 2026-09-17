import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { PageHero } from "@/components/common/PageHero";
import { VersionBadge } from "@/components/common/Badges";
import { siteConfig } from "@/config/site";
import { getUpgrade } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/character/character.module.css";

const looks = [
  {
    src: "/images/official/screenshot-1.jpg",
    alt: "Scarlet skipping rope in the park",
    label: "In the park",
    title: "The opening skip",
    text: "The rope and the ground crossing are easier to follow here than in a crowded late run.",
  },
  {
    src: "/images/official/screenshot-5.jpg",
    alt: "Scarlet airborne with glowing Rocket Shoes in Scarlet Skips",
    label: "Rocket Shoes",
    title: "A longer jump",
    text: "Rocket Shoes can keep Scarlet airborne while the ropes continue below her.",
  },
  {
    src: "/images/official/screenshot-7.jpg",
    alt: "Scarlet missing a skip with the rope tangled around her legs",
    label: "A miss",
    title: "A missed rope",
    text: "The run ends when the skip fails. This still shows the result, not the exact input that caused it.",
  },
];

export default function CharacterPage() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Character", href: "/character" },
  ];
  const gear = [
    { item: getUpgrade("add-jump-rope")!, blurb: "Another rope in the air. We score more. We also miss more." },
    { item: getUpgrade("reinforce-jump-rope")!, blurb: "A shield on a rope we actually want to keep." },
    { item: getUpgrade("ignite-jump-rope")!, blurb: "Set a rope on fire when we’re chasing score, not when the pattern is already a mess." },
    { item: getUpgrade("upgrade-rocket-fuel")!, blurb: "Hold the jump and she keeps rising. This is how we stay up." },
    { item: getUpgrade("super-rocket-shoes")!, blurb: "The late pair. If we’re going for the ending, this is the one we wait for." },
  ];
  const skills = [
    { item: getUpgrade("increase-jump-height")!, blurb: "She jumps higher, so one skip can clear more turns." },
    { item: getUpgrade("increase-luck")!, blurb: "Players use Luck to seek faster progression; its exact effect is unpublished." },
    { item: getUpgrade("charge-jump")!, blurb: "Hold a little longer and the next jump hits harder." },
    { item: getUpgrade("fast-fall")!, blurb: "Let go and she drops faster, so we can land on purpose." },
    { item: getUpgrade("air-tricks")!, blurb: "Press jump again in the air and she tricks." },
  ];

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Scarlet Skips Character – Scarlet",
          description: "Scarlet is the jumper we keep in the air: one button, a jump rope, and the cards that change how she skips.",
          url: `${siteConfig.url}/character`,
          image: `${siteConfig.url}/images/official/screenshot-1.jpg`,
          about: {
            "@type": "Person",
            name: "Scarlet",
            description: "The jump-rope player character in Scarlet Skips by Yerk Games.",
          },
        }}
      />
      <div className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Character" }]} />
      </div>
      <PageHero
        eyebrow="CHARACTER"
        titlePrefix="Scarlet Skips Character"
        title="Scarlet"
        description="She’s the jumper. We press one button, she skips, and the park gets weirder from there."
        image="/images/official/screenshot-1.jpg"
        imageAlt="Scarlet jumping rope in the sunny park"
        imageCaption="Every run starts here: Scarlet, a rope, the park."
        imagePosition="center 28%"
        lead={<VersionBadge version="1.0.1" />}
        facts={[
          { label: "Name", value: "Scarlet" },
          { label: "Role", value: "Jumper" },
          { label: "Controls", value: "One button" },
        ]}
        actions={[
          { href: "/guides/beginner-guide", label: "Learn the jump" },
          { href: "/ending", label: "Where a long run goes", variant: "ghost" },
        ]}
      />

      <div className={`container ${styles.content}`}>
        <section className={styles.opening} aria-labelledby="who-title">
          <div className={styles.intro}>
            <p>THE CHARACTER</p>
            <h2 id="who-title">You play as Scarlet.</h2>
            <p>
              Scarlet is the character you control in the runs shown here. The game uses <Link href="/guides/how-to-play">one button</Link>—press, hold and release—to time her jump rope. Steam&apos;s short story setup asks you to help her get out of a funk and touch grass. The <Link href="/guides/beginner-guide">first-run guide</Link> covers the timing; the cards change what each run feels like.
            </p>
          </div>
          <figure className={styles.openingImage}>
            <Image src="/images/official/screenshot-4.jpg" alt="Scarlet airborne above a jump rope in the park" fill sizes="(max-width: 1024px) 100vw, 38vw" />
            <figcaption>Scarlet above the rope in an official gameplay screenshot.</figcaption>
          </figure>
        </section>

        <section className={styles.contentNotice} aria-labelledby="mature-content-title">
          <div><p>BEFORE YOU BUY</p><h2 id="mature-content-title">Why does Steam warn about suggestive content?</h2></div>
          <p>Yerk Games&apos; <a href={siteConfig.steamUrl} target="_blank" rel="noopener noreferrer">Steam description</a> lists suggestive themes, revealing clothing, exaggerated animation of suggestive body parts and general mature content. That warning describes the material the developer says may appear; it is not a hidden gameplay mode or a promise that every scene is suitable for every viewer. Check Steam&apos;s current warning and trailer if that matters to your purchase.</p>
        </section>

        <section aria-labelledby="looks-title">
          <div className={styles.sectionTitle}>
            <span><Icon name="person" size={22} /></span>
            <div>
              <p>ON SCREEN</p>
              <h2 id="looks-title">Scarlet through a run</h2>
            </div>
          </div>
          <p className={styles.lead}>
            The screenshots show the first rope, a Rocket Shoes jump and a miss. When you play, watch <Link href="/guides/beginner-guide">where the rope meets the ground</Link> rather than trying to time the jump from Scarlet&apos;s pose alone.
          </p>
          <div className={styles.looks}>
            {looks.map((look) => (
              <article key={look.title}>
                <figure>
                  <Image src={look.src} alt={look.alt} fill sizes="(max-width: 900px) 100vw, 32vw" />
                </figure>
                <div>
                  <small>{look.label}</small>
                  <strong>{look.title}</strong>
                  <p>{look.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.story} aria-labelledby="story-title">
          <div>
            <p>HER STORY</p>
            <h2 id="story-title">The story Steam gives her</h2>
            <p>
              The Steam description says Scarlet needs to get out of her funk and touch grass. It introduces a simple setup, then leaves the jump-rope run to the player. The page does not explain more about her background.
            </p>
            <p>
              Long-form gameplay shows a run leaving the park and reaching the <Link href="/ending">Moon</Link>. The ending guide covers one player-reported route without treating its card order as a requirement.
            </p>
            <Link href="/ending">How we get her there <Icon name="arrow" size={16} /></Link>
          </div>
          <aside>
            <p>IN A RUN</p>
            <ul>
              <li>Keep the rope off her legs</li>
              <li>Pick the card that saves this run</li>
              <li>Stack height when the landing is clean</li>
              <li>Go for score, or go for the Moon</li>
            </ul>
          </aside>
        </section>

        <section aria-labelledby="gear-title">
          <div className={styles.sectionTitle}>
            <span><Icon name="rope" size={22} /></span>
            <div>
              <p>WHAT SHE USES</p>
              <h2 id="gear-title">Ropes and Rocket Shoes</h2>
            </div>
          </div>
          <p className={styles.lead}>
            A run starts with one rope. The <Link href="/upgrades">card list</Link> covers extra ropes, protection, fire and Rocket Shoes, with each card&apos;s details and availability. The links below are a quick way to recognize what changed on screen; player ending routes look for the later Super Rocket Shoes card.
          </p>
          <div className={styles.picks}>
            {gear.map(({ item, blurb }) => (
              <Link key={item.slug} href={`/upgrades/${item.slug}`} data-tone={item.color}>
                <span><Icon name={item.icon} size={26} /></span>
                <strong>{item.shortName}</strong>
                <p>{blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-title">
          <div className={styles.sectionTitle}>
            <span><Icon name="controller" size={22} /></span>
            <div>
              <p>WHAT SHE CAN DO</p>
              <h2 id="skills-title">Cards that change the jump</h2>
            </div>
          </div>
          <p className={styles.lead}>
            The basic input is press, hold and release. At level-up, choose from three offered cards. Jump Height can make an early landing easier; Luck is a progression choice once the pattern feels safe. The <Link href="/guides/beginner-guide">beginner guide</Link> explains the trade-off. Charge Jump, Fast Fall and Air Tricks are later entries in the game data.
          </p>
          <div className={styles.picks}>
            {skills.map(({ item, blurb }) => (
              <Link key={item.slug} href={`/upgrades/${item.slug}`} data-tone={item.color}>
                <span><Icon name={item.icon} size={26} /></span>
                <strong>{item.shortName}</strong>
                <p>{blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="next-title">
          <div className={styles.sectionTitle}>
            <span><Icon name="arrow" size={22} /></span>
            <div>
              <p>KEEP PLAYING</p>
              <h2 id="next-title">Keep exploring</h2>
            </div>
          </div>
          <div className={styles.links}>
            <Link href="/guides/beginner-guide">
              <Icon name="book" size={24} />
              <strong>Learn the jump</strong>
              <span>Watch the rope at her feet. That’s how we stop staring at her hair and start landing.</span>
            </Link>
            <Link href="/upgrades">
              <Icon name="cards" size={24} />
              <strong>See every card</strong>
              <span>The full list, so the next three on screen aren’t a guess.</span>
            </Link>
            <Link href="/ending">
              <Icon name="rocket" size={24} />
              <strong>Go for the ending</strong>
              <span>If we want this run to leave the park.</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
