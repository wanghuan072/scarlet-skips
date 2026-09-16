"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { RunBuilder } from "@/page/builds/components/RunBuilder";
import { getRelatedUpgrades } from "@/lib/data/content";
import { destinations, type RunDestination } from "@/lib/data/destinations";
import styles from "@/style/page/builds/builds.module.css";

function readHash(): RunDestination | null {
  const id = window.location.hash.replace("#", "");
  return destinations.some((item) => item.id === id) ? (id as RunDestination) : null;
}

export function RouteDesk() {
  const [dest, setDest] = useState<RunDestination | null>(null);

  useEffect(() => {
    const apply = () => setDest(readHash());
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  function pick(id: RunDestination, scrollToSim = false) {
    setDest(id);
    window.history.replaceState(null, "", `#${id}`);
    if (scrollToSim) {
      document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <section className={styles.routes} aria-labelledby="routes-title">
        <div className={styles.sectionHead}>
          <p>WHERE THIS RUN CAN GO</p>
          <h2 id="routes-title">Pick a destination. Then take cards that move it.</h2>
          <p>
            The early picks overlap. The late ones do not. Fire helps a score run and wrecks a Moon climb. Extra ropes look great and slow the ending down. Choose first, then play the pause.
          </p>
        </div>
        <div className={styles.destGrid}>
          {destinations.map((route) => {
            const cores = getRelatedUpgrades(route.cores);
            const selected = dest === route.id;
            return (
              <article
                key={route.id}
                id={route.id}
                className={styles.dest}
                data-tone={route.tone}
                data-selected={selected ? "true" : undefined}
              >
                <figure>
                  <Image src={route.image} alt={route.imageAlt} fill sizes="(max-width: 980px) 100vw, 33vw" />
                </figure>
                <div>
                  <p>{route.kicker}</p>
                  <h3>{route.title}</h3>
                  <p className={styles.routeLead}>{route.text}</p>
                  <ul className={styles.cores}>
                    {cores.map((item) => (
                      <li key={item.slug}><Link href={`/upgrades/${item.slug}`}>{item.shortName}</Link></li>
                    ))}
                  </ul>
                  <div className={styles.routeActions}>
                    <button type="button" aria-pressed={selected} onClick={() => pick(route.id, true)}>
                      Play this in the run <Icon name="arrow" size={16} />
                    </button>
                    <Link href={route.href}>{route.cta}</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <RunBuilder destination={dest} onPickDestination={pick} />
    </>
  );
}
