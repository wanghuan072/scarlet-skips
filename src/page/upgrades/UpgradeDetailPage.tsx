import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { UpgradeArt } from "@/components/common/UpgradeArt";
import { PageHero } from "@/components/common/PageHero";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { upgrades } from "@/lib/data/content";
import {
  appearLabel,
  perStackLabel,
  perStackRows,
  playerSummary,
  routeRows,
  stackTiers,
  stackableLabel,
  synergyRows,
} from "@/lib/data/upgrade-view";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import type { Upgrade } from "@/types/content";
import styles from "@/style/page/upgrades/upgrade-detail.module.css";

export default function UpgradeDetailPage({ upgrade }: { upgrade: Upgrade }) {
  const summary = playerSummary(upgrade);
  const stacks = perStackRows(upgrade);
  const pairs = synergyRows(upgrade);
  const routes = routeRows(upgrade);
  const tiers = stackTiers(upgrade);
  const takeItems = (upgrade.decisionChecks ?? upgrade.tips).slice(0, 3);
  const skipItems = upgrade.avoid.slice(0, 3);
  const currentIndex = upgrades.findIndex((item) => item.slug === upgrade.slug);
  const previous = upgrades[(currentIndex - 1 + upgrades.length) % upgrades.length];
  const next = upgrades[(currentIndex + 1) % upgrades.length];
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Upgrades", href: "/upgrades" },
    { label: upgrade.name, href: `/upgrades/${upgrade.slug}` },
  ];

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Upgrades", href: "/upgrades" }, { label: upgrade.name }]} />
      </div>

      <PageHero
        eyebrow={upgrade.category}
        titlePrefix="Scarlet Skips Upgrade"
        title={upgrade.name}
        description={summary}
        image={upgrade.image}
        imageAlt={upgrade.imageAlt}
        imageCaption={upgrade.imageCaption}
        lead={(
          <>
            <span className={styles.heroCard}>
              <UpgradeArt slug={upgrade.slug} title={upgrade.gameTitle ?? upgrade.name} size="tile" />
            </span>
            <SourceBadge status={upgrade.sourceStatus} />
            <VersionBadge version={upgrade.verifiedVersion} />
          </>
        )}
        actions={[
          { href: "/upgrades", label: `All ${upgrades.length} cards` },
          { href: "/builds#simulator", label: "Try it in a run" },
        ]}
      >
        <dl className={styles.specStrip}>
          <div><dt>Stacks?</dt><dd>{stackableLabel(upgrade)}</dd></div>
          <div><dt>Best time</dt><dd>{upgrade.bestTiming}</dd></div>
          <div><dt>Each stack</dt><dd>{perStackLabel(upgrade)}</dd></div>
          <div><dt>From</dt><dd>{appearLabel(upgrade)}</dd></div>
        </dl>
      </PageHero>

      <div className={`container ${styles.pageGrid}`}>
        <article className={styles.content}>
          <section className={styles.contentSection}>
            <div className={styles.sectionHead}>
              <p>WHAT IT DOES</p>
              <h2>What changes when you pick it?</h2>
            </div>
            {upgrade.hudChange ? <p className={styles.lead}>{upgrade.hudChange}</p> : <p className={styles.lead}>{upgrade.description}</p>}
            <ul className={styles.factList}>
              {upgrade.whatItDoes.map((item) => <li key={item}><Icon name="check" size={16} />{item}</li>)}
            </ul>
          </section>

          <section className={styles.decisionPanel}>
            <div className={styles.sectionHead}>
              <p>THREE CARDS ON SCREEN</p>
              <h2>Take it or skip it?</h2>
            </div>
            <p className={styles.lead}>Three cards come up. We keep one. If the pause still feels new, <Link href="/guides/how-to-play">how it actually works</Link> is the button, then the pick — and the <Link href="/guides/tips">tips page</Link> has the four questions we ask before clicking.</p>
            <div className={styles.decisionGrid}>
              <div className={styles.take}>
                <h3>Take it if…</h3>
                <ul>{takeItems.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className={styles.skip}>
                <h3>Skip it if…</h3>
                <ul>{skipItems.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </section>

          <section className={styles.contentSection}>
            <div className={styles.sectionHead}>
              <p>EACH STACK</p>
              <h2>How much does one pick add?</h2>
            </div>
            <table className={styles.stackTable}>
              <caption className="sr-only">Known and unknown effects for each {upgrade.shortName} stack</caption>
              <thead>
                <tr><th scope="col">What we can check</th><th scope="col">What one pick does</th></tr>
              </thead>
              <tbody>
                <tr><th scope="row">Game information</th><td>{stacks.official}</td></tr>
                <tr><th scope="row">Player observations</th><td>{stacks.observed}</td></tr>
                <tr><th scope="row">Unknown</th><td>{stacks.unknown}</td></tr>
              </tbody>
            </table>
            <p className={styles.tableNote}>{upgrade.stackingNote}</p>
          </section>

          <section className={styles.contentSection}>
            <div className={styles.sectionHead}>
              <p>PAIRS WITH</p>
              <h2>Which cards work with it?</h2>
            </div>
            <div className={styles.pairGrid}>
              {pairs.map((pair) => (
                <Link key={pair.slug} href={pair.href}>
                  <strong>{pair.name}</strong>
                  <span>{pair.why}</span>
                </Link>
              ))}
            </div>
            {upgrade.antiSynergies?.length ? (
              <div className={styles.antiBox}>
                <h3>Do not pair it to fix this</h3>
                <ul>{upgrade.antiSynergies.map((item) => <li key={item}><Icon name="x" size={16} />{item}</li>)}</ul>
              </div>
            ) : null}
          </section>

          <section className={styles.contentSection}>
            <div className={styles.sectionHead}>
              <p>{upgrade.stackTiers ? "AFTER YOU STACK IT" : "WHEN IN A RUN"}</p>
              <h2>{upgrade.stackTiers ? "What each extra copy feels like." : "Where it fits in a run."}</h2>
            </div>
            <div className={styles.tierGrid}>
              {tiers.map((tier) => (
                <article key={tier.label}>
                  <span>{tier.label}</span>
                  <p>{tier.feel}</p>
                </article>
              ))}
            </div>
          </section>

          {routes.length ? (
            <section className={styles.contentSection}>
              <div className={styles.sectionHead}>
                <p>USED IN THESE ROUTES</p>
                <h2>Open the plan that matches your goal.</h2>
              </div>
              <div className={styles.routeGrid}>
                {routes.map((route) => (
                  <Link key={route.href} href={route.href}>
                    <strong>{route.label}</strong>
                    <span>{route.note}</span>
                    <em>Open route</em>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className={styles.aside}>
          <section className={styles.quickCard}>
            <p>CARD FACTS</p>
            <dl>
              <div><dt>Effect</dt><dd>{upgrade.effect}</dd></div>
              <div><dt>Draw</dt><dd>{upgrade.offerPool === "special" ? "Not in the regular 3-card offer" : appearLabel(upgrade)}</dd></div>
            </dl>
          </section>
        </aside>
      </div>

      {upgrade.knownUnknowns?.length ? (
        <section className={`container ${styles.evidence}`}>
          <div className={styles.sectionHead}>
            <p>CONFIRMED VS UNKNOWN</p>
            <h2>What is solid, and what is still a guess.</h2>
          </div>
          <ul>
            {upgrade.knownUnknowns.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      ) : null}

      <nav className={`container ${styles.bottomNav}`} aria-label="Previous and next upgrades">
        <Link href={`/upgrades/${previous.slug}`}><span>Previous</span><strong>← {previous.shortName}</strong></Link>
        <Link href="/upgrades"><span>All cards</span><strong>Back to Upgrades</strong></Link>
        <Link href={`/upgrades/${next.slug}`}><span>Next</span><strong>{next.shortName} →</strong></Link>
      </nav>
    </main>
  );
}
