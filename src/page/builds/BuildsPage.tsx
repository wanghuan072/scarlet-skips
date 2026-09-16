import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHero } from "@/components/common/PageHero";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { SourcesList } from "@/components/common/SourcesList";
import { RouteDesk } from "@/page/builds/components/RouteDesk";
import { builds, regularUpgrades } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/builds/builds.module.css";

const steps = [
  { n: "Skip", title: "Fill the rope.", text: "One skip completes loops on every rope in the air. Jump Level, speed, fuel and tricks change how many loops that skip is worth. The number under Skip is that preview." },
  { n: "Pause", title: "Three cards come up.", text: "The bar is the real jump counter. When it fills, the run pauses on three rarity-weighted cards. Reinforce shows up half as often. Late cards wait for their level." },
  { n: "Watch", title: "See what actually moved.", text: "The green chips are the numbers that just changed. A destination marks which card helps the Moon, a score run, or a loud screen — then we skip again until Super Rocket Shoes." },
];

export default function BuildsPage() {
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Builds", href: "/builds" }])} />
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Builds" }]} /></div>

      <PageHero
        eyebrow="MOON, SCORE OR SPECTACLE"
        titlePrefix="Scarlet Skips Builds"
        title="Pick a goal for your run"
        description="Compare three routes before you take the next card. Then try the choices in a teaching simulator; its scores are not the game's scores."
        image="/images/official/screenshot-4.jpg"
        imageAlt="Scarlet clearing an active rope in Scarlet Skips"
        imageCaption="The park still. The destination is the tool under this."
        imagePosition="center 60%"
        facts={[
          { label: "Destinations", value: "3" },
          { label: "Regular cards", value: String(regularUpgrades.length) },
          { label: "Ends on", value: "Super" },
        ]}
        actions={[
          { href: "#moon", label: "Pick a destination" },
          { href: "#simulator", label: "Play the run", variant: "ghost" },
        ]}
        lead={<><SourceBadge status="Community Verified" /><VersionBadge version="1.0.1" /></>}
      />

      <div className={`container ${styles.page}`}>
        <RouteDesk />

        <section className={styles.pick} id="how" aria-labelledby="how-title">
          <div>
            <p>INSIDE THE RUN</p>
            <h2 id="how-title">Practice the three-card decision.</h2>
            <p>
              If the first rope still feels random, the <Link href="/guides/beginner-guide">first-run guide</Link> is the slower version of this. If we just need the button, that&apos;s <Link href="/guides/how-to-play">how it actually works</Link>. The names on the cards live on the <Link href="/upgrades">card list</Link>.
            </p>
            <ol>
              {steps.map((item) => (
                <li key={item.n}>
                  <span>{item.n}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure>
            <Image src="/images/official/screenshot-3.jpg" alt="Official Scarlet Skips upgrade choice with three cards" fill sizes="(max-width: 980px) 100vw, 40vw" />
            <figcaption>The game offers three cards at level-up. This page models the choice for practice.</figcaption>
          </figure>
        </section>

        <p className={styles.framework} id="best-build">
          There is no one best order when every pause is a random three. Pick the destination first. If we already know who we&apos;re skipping as, that&apos;s <Link href="/character">Scarlet</Link>.
        </p>

        <section className={styles.note} aria-labelledby="note-title">
          <p>WHAT THE RUN IS COUNTING</p>
          <h2 id="note-title">The cards and ropes are from the build. The hang is a model.</h2>
          <p>
            Three cards, appear-after-level, Reinforce showing up half as often, fire and shields on a rope, Luck flashing LUCKY — that is in the shipping files. Score in the run is loops times the ignite multiplier. Jump Level changing how many loops one skip clears is a working model of hang time, not a dumped centimetre formula. If a jump felt different after a patch, check the <Link href="/updates">notes</Link> and re-test on the <Link href="/guides/tips">tips page</Link>.
          </p>
        </section>
      </div>
      <SourcesList ids={builds.flatMap((build) => build.sourceIds)} title="Check the route details" />
    </main>
  );
}
