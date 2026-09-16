import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/common/page-hero.module.css";

export type PageHeroFact = {
  label: string;
  value: string;
};

export type PageHeroAction = {
  href: string;
  label: string;
  external?: boolean;
  variant?: "primary" | "ghost";
};

export function PageHero({
  eyebrow,
  title,
  titlePrefix,
  description,
  image,
  imageAlt,
  imageCaption,
  imagePosition,
  facts,
  actions,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  titlePrefix?: string;
  description: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  imagePosition?: string;
  facts?: PageHeroFact[];
  actions?: PageHeroAction[];
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className={`container ${styles.hero}`}>
      <div className={styles.copy}>
        {lead ? <div className={styles.lead}>{lead}</div> : null}
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>
          {titlePrefix ? (
            <>
              <span className={styles.keyword}>{titlePrefix}</span>
              <span className="sr-only"> – </span>
            </>
          ) : null}
          {title}
        </h1>
        <p>{description}</p>
        {facts && facts.length > 0 ? (
          <dl className={styles.facts} style={{ gridTemplateColumns: `repeat(${facts.length}, minmax(0, 1fr))` }}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {children ? <div className={styles.extra}>{children}</div> : null}
        {actions && actions.length > 0 ? (
          <div className={styles.actions}>
            {actions.map((action, index) => {
              const variant = action.variant ?? (index === 0 ? "primary" : "ghost");
              const content = (
                <>
                  {action.label}
                  <Icon name="arrow" size={17} />
                </>
              );
              return action.external ? (
                <a key={action.href} href={action.href} data-variant={variant} target="_blank" rel="noreferrer">
                  {content}
                </a>
              ) : (
                <Link key={action.href} href={action.href} data-variant={variant}>
                  {content}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
      <figure className={styles.image}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 54vw"
          style={imagePosition ? ({ objectPosition: imagePosition } as CSSProperties) : undefined}
        />
        <figcaption>{imageCaption}</figcaption>
      </figure>
    </header>
  );
}
