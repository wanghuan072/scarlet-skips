import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { SourceBadge, VersionBadge } from "@/components/common/Badges";
import { SourceBox } from "@/components/common/SourceBox";
import { getSources, guides } from "@/lib/data/content";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import type { Guide } from "@/types/content";
import styles from "@/style/page/guides/guide-detail.module.css";

export default function GuideDetailPage({ guide }: { guide: Guide }) {
  const sources = getSources(guide.sourceIds);
  const currentIndex = guides.findIndex((item) => item.slug === guide.slug);
  const next = guides[(currentIndex + 1) % guides.length];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.name,
    description: guide.description,
    dateModified: "2026-09-14",
    image: guide.image,
    author: { "@type": "Organization", name: "Scarlet Skips Lab" },
  };
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:"Guides",href:"/guides"},{label:guide.shortName,href:`/guides/${guide.slug}`}])}/><JsonLd data={articleSchema}/>
      <div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:"Guides",href:"/guides"},{label:guide.shortName}]}/></div>
      <header className={`container ${styles.hero}`}>
        <div><span className={styles.eyebrow}>{guide.category}</span><h1>{guide.name}</h1><p>{guide.description}</p><div className={styles.badges}><SourceBadge status={guide.sourceStatus}/><VersionBadge version="1.0.1"/><span>Updated {guide.updatedDate}</span></div></div>
        <figure><div><Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 45vw"/></div><figcaption>Official Scarlet Skips image via the Steam store page.</figcaption></figure>
      </header>
      <div className={`container ${styles.layout}`}>
        <article className={styles.content}>
          {guide.sections.map((section, index) => <section key={section.heading} id={`section-${index + 1}`}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Icon name="check" size={17}/>{bullet}</li>)}</ul>}</section>)}
          <section className={styles.nextSteps}><h2>Next steps</h2><div>{guide.links.map((link) => <Link key={link.href} href={link.href}>{link.label}<Icon name="arrow" size={17}/></Link>)}</div></section>
          <SourceBox sources={sources} version="1.0.1"/>
        </article>
        <aside className={styles.sidebar}>
          <section><h2>On this page</h2><nav>{guide.sections.map((section,index) => <a key={section.heading} href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2,"0")}</span>{section.heading}</a>)}</nav></section>
          <section className={styles.dataCard}><h2><Icon name="shield" size={21}/>How we label facts</h2><p><strong>Official</strong> means the Steam listing, API, patch notes or screenshots. <strong>Player Report</strong> means a linked route or test that Yerk Games has not confirmed.</p></section>
          <Link className={styles.nextGuide} href={`/guides/${next.slug}`}><span>READ NEXT</span><strong>{next.shortName}</strong><Icon name="arrow" size={19}/></Link>
        </aside>
      </div>
    </main>
  );
}
