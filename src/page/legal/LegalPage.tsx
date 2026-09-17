import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/legal/legal.module.css";

type Section = { heading: string; paragraphs: string[] };
type PageData = {
  title: string;
  eyebrow: string;
  intro: string;
  icon: "info" | "heart" | "shield" | "book";
  sections: Section[];
};

const contactLine = `For questions or corrections, write to ${siteConfig.email}.`;
const legalLinks = [
  { slug: "about", label: "About Us" },
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "terms", label: "Terms of Service" },
  { slug: "copyright", label: "Copyright" },
  { slug: "contact", label: "Contact Us" },
] as const;

function LegalParagraph({ text }: { text: string }) {
  const email = siteConfig.email;
  if (!text.includes(email)) return <p>{text}</p>;
  const [before, after] = text.split(email);
  return <p>{before}<a href={`mailto:${email}`}>{email}</a>{after}</p>;
}

function sectionId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const legalPages: Record<string, PageData> = {
  about: {
    title: "About Scarlet Skips Hub", eyebrow: "ABOUT THE FAN GUIDE", icon: "heart",
    intro: "Scarlet Skips Hub is an independent place to work out the next jump, card or route. We explain what can be checked and say when a strategy is only a player's account.",
    sections: [
      { heading: "Who writes the guides", paragraphs: [
        `${siteConfig.guideAuthor} is the editorial name used for the guides on Scarlet Skips Hub. The name gives readers a consistent place to find who is responsible for these pages and where to send a correction; it is not a claim of endorsement by the game makers or a list of individual writers.`,
        "The work starts with a player's question, then checks what the game or an original announcement actually shows. A card's name in the game data, a moment visible in footage and a route described by another player are different kinds of evidence. We try to keep those differences visible instead of smoothing them into one confident-sounding answer.",
        "That approach is especially useful in a game where one more rope or a longer jump can turn a familiar rhythm into a new problem. We write guides to help players recognize that change, weigh a card at the moment it appears and understand why a route might fail—not to claim a perfect run or a secret formula we cannot verify.",
      ] },
      { heading: "Why this site exists", paragraphs: [
        "Scarlet Skips can turn a simple one-button jump into a difficult decision. A new card changes the timing; a good-looking offer may be wrong for the rope pattern on screen; a route that reaches the Moon is not necessarily a score route. This site puts those questions next to the controls, cards and runs they concern, so a player can find an answer without reading a single long walkthrough from the beginning.",
        "The guide is focused on this one game. It is not the game's official manual and it does not speak for its developer or publisher. Its value rests on clear explanations and traceable claims, not on a promise that every possible route has been personally completed.",
      ] },
      { heading: "What you can use", paragraphs: [
        "The Guides pages cover the first rope, recovering after a missed jump and choosing a goal. Upgrades lists named card entries and separates the regular progression from special rows in the game data. Builds compares Moon, score and spectacle plans; its playable run is a teaching model, not the game's scoring engine. Ending marks spoilers and distinguishes the visible Moon sequence from reported card orders. Updates gives version context, while the official Steam listing has current store details.",
        "Start with the problem in front of you. If the timing changed, open How to Play. If three cards are on screen, compare their effects and availability. If you are planning a longer run, read the relevant route and its failure cases before committing to it.",
      ] },
      { heading: "How claims are handled", paragraphs: [
        "Official store information and patch announcements are used for published features and changes. Screenshots or gameplay footage can show what happened in a recorded run, but they do not establish an unpublished probability, score formula or universal requirement. Game-data entries identify names and conditions in a particular build; a row in a table is not a promise that its card will appear in every normal offer.",
        "Community guides help surface routes worth trying. We attribute those reports and keep their observations separate from developer statements. When a number, trigger or mechanic cannot be confirmed, the guide should say so. Pages that depend on a version or a specific record include links and check dates so readers can judge the claim for themselves.",
      ] },
      { heading: "Independence and corrections", paragraphs: [
        "Scarlet Skips Hub is a fan project and is not developed, sponsored or endorsed by Yerk Games, YerkDiff, Valve or Steam. Game names, characters and official images remain with their respective rights holders. The Copyright page explains how material is used here.",
        "A clear correction is more useful than a vague disagreement: send the page URL, the line at issue, the game version and a link or repeatable observation that changes the answer. We may correct the text, add a version note or leave the uncertainty visible when the evidence is incomplete.",
        contactLine,
      ] },
    ],
  },
  privacy: {
    title: "Privacy Policy", eyebrow: "PRIVACY AND SITE USE", icon: "shield",
    intro: "You can read this guide without an account. This notice explains the information the current site may handle and where a third-party service takes over.",
    sections: [
      { heading: "What you do on this site", paragraphs: [
        "There is no account registration, public profile, comment section or score submission. The Builds simulator keeps its run and card choices in the current page's memory. Resetting or reloading the page starts a new teaching run; those choices are not submitted to this site as a personal game record.",
        "Search terms are placed in the /search URL so the results page can show them. Like any URL you visit, that address may appear in your browser history and in hosting request records. Avoid putting private information in a search query.",
      ] },
      { heading: "Hosting and technical records", paragraphs: [
        "Delivering a website normally involves the hosting provider receiving technical request information, such as an IP address, requested URL, time and browser or device details. Such records may be used by the provider to serve the site and protect its service. We do not claim that hosting logs are absent, and we cannot describe the provider's exact retention period from this site's source code.",
        "The current site code does not add a site-operated analytics or advertising tracker and does not create a first-party account cookie for readers. This describes the current implementation, not a promise that browsers, hosting infrastructure or linked services store nothing. Review this notice before analytics, ads or new integrations are introduced.",
      ] },
      { heading: "Email and corrections", paragraphs: [
        "If you email us, your address and the contents of your message are delivered through your email provider and ours. Use email only for information you choose to share; do not send passwords, payment details or other sensitive material. A correction may be used to improve a page, but we do not publish a sender's name or private message as a testimonial without permission.",
        "For a privacy question about an email you sent, identify the message and write to the address below. We cannot erase copies held by your email provider or another independent service on your behalf.",
        contactLine,
      ] },
      { heading: "External links and video", paragraphs: [
        "Links to Steam, Steam Community, YouTube, Nexus Mods and other sources lead to services with their own terms and privacy notices. Their practices are not controlled by this site. The ending page includes a YouTube video only inside a spoiler section you choose to reveal. Opening that section loads a player from youtube-nocookie.com, and the video provider may receive technical request information. The privacy-enhanced domain does not mean that no data is exchanged with YouTube.",
      ] },
      { heading: "Changes to this notice", paragraphs: [
        "This page describes the site as reviewed on September 17, 2026. If hosting, tracking, embedded services or ways to submit information change, the notice should be updated to match the deployed site. Check this page again if those details matter to you.",
      ] },
    ],
  },
  terms: {
    title: "Terms of Service", eyebrow: "USING THE FAN GUIDE", icon: "book",
    intro: "These terms set out what this fan guide offers and its limits. They do not replace the terms of Scarlet Skips, Steam or another linked service.",
    sections: [
      { heading: "Scope of the guide", paragraphs: [
        "Scarlet Skips Hub provides reading material, links and a teaching simulator for personal use. It is an independent fan site, not an official game service, retailer, support channel or leaderboard. Reading the site does not create a game account or give access to the game itself.",
        "You may read and link to public pages. Please do not interfere with the site's operation, impersonate its editors or the game developer, or present substantial original guide text as your own work. For reuse beyond a short attributed excerpt or ordinary link, contact us first.",
      ] },
      { heading: "Gameplay information and the simulator", paragraphs: [
        "Card draws, timing, patches and player choices make outcomes variable. Guides explain a route to try, not a guaranteed ending, score, achievement or best build. We separate official information, game-data observations and player reports where possible, but a page can still be incomplete or out of date.",
        "The Builds playable run simplifies parts of the game so players can compare decisions. Its score, probabilities and jump behavior should not be treated as a measurement of the game's unpublished formulas. Check the current game and official patch notes before relying on a particular mechanic.",
      ] },
      { heading: "Third-party services and materials", paragraphs: [
        "External links may lead to stores, community posts, mod listings or video platforms. Those services control their own accounts, purchases, downloads, privacy practices and availability. A link is provided for context, not as a guarantee that its content is safe, current or endorsed by this site.",
        "The game, official screenshots and third-party video remain subject to their respective owners' rights. The Copyright page explains the distinction between those materials and this site's original writing and interface.",
      ] },
      { heading: "Availability and changes", paragraphs: [
        "Pages may be corrected, removed or reorganized as the game and available records change. We cannot promise uninterrupted access or that every external link will keep working. Material changes to these terms should be reflected on this page; this version was reviewed on September 17, 2026.",
        "Nothing here is intended to limit rights that applicable law does not allow a website to waive. For a question about these terms or a correction, use the contact address below.",
        contactLine,
      ] },
    ],
  },
  copyright: {
    title: "Copyright", eyebrow: "OWNERSHIP AND REUSE", icon: "shield",
    intro: "This fan guide uses game material to identify and discuss Scarlet Skips. It does not claim ownership of the game or permission to redistribute someone else's work.",
    sections: [
      { heading: "Game and third-party material", paragraphs: [
        "The official Steam listing identifies © 2026 YerkDiff and names Yerk Games as developer and publisher. Scarlet Skips, its characters, artwork, screenshots and other game assets remain with their respective rights holders. Steam and its marks belong to Valve or their applicable owners.",
        "Official screenshots on this site illustrate particular mechanics or screens. Linked community posts, videos and mod listings remain the work of their creators. A credit, link or appearance on this site does not transfer their rights or make an asset free to copy. Obtain files and permission from the original owner where needed.",
      ] },
      { heading: "Material made for this guide", paragraphs: [
        "The site's original explanations, comparisons, layout and teaching-simulator code are separate from the game material they discuss. You are welcome to link to a page and quote a short passage with clear attribution. Do not copy substantial guide text, reproduce the site as another guide, or reuse official game images on the assumption that this site can license them to you.",
        "The fan-site notice does not mean the game developer, publisher or Valve has approved or endorsed the site. Nor is it a blanket claim that every possible use of a game image is automatically permitted in every jurisdiction.",
      ] },
      { heading: "Credit and rights concerns", paragraphs: [
        "If a credit is wrong or you believe material on a specific page should be changed or removed, identify the page URL, the image or passage, and the reason for your request. A link to the original work or information showing your connection to the rights holder helps us review it. Do not send passwords or private identification documents in an initial message.",
        "We can investigate a concrete report and update an attribution, replace an image or remove disputed material where appropriate. This contact route is for site material; game purchases and account support belong with the relevant store or game provider.",
        contactLine,
      ] },
    ],
  },
  contact: {
    title: "Contact Scarlet Skips Hub", eyebrow: "CORRECTIONS AND QUESTIONS", icon: "info",
    intro: "Found a card detail, route step or credit that needs another look? Email the exact page and what you saw. There is no contact form or public comment feed.",
    sections: [
      { heading: "How to reach us", paragraphs: [
        contactLine,
        "Use the address for guide corrections, version updates, attribution concerns and questions about these Legal pages. It is not an official Scarlet Skips, Steam or mod-author support address. We cannot fix a purchase, game account or third-party download.",
      ] },
      { heading: "Make a correction useful", paragraphs: [
        "Include the page URL, the sentence or card name, the game version and the reason it may be wrong. For a gameplay finding, describe what happened and the steps another player could try. A link to a public patch note, gameplay video or original post is more useful than a cropped claim without context.",
        "If the issue is a broken link or image, name the page and the link or image. If it concerns copyright or attribution, use the details described on the Copyright page. Please send links rather than executable files or large attachments.",
      ] },
      { heading: "What happens next", paragraphs: [
        "A report may lead to a correction, a clearer version note or an explicit statement that the evidence remains uncertain. Sending a suggestion does not guarantee a reply, a publication date or adoption of a proposed route. We do not name a contributor or republish a private message without permission.",
        "Do not include passwords, payment information or other sensitive details. Email travels through separate providers; the Privacy Policy explains that boundary. This page was reviewed on September 17, 2026.",
      ] },
    ],
  },
};

export default function LegalPage({ slug }: { slug: string }) {
  const page = legalPages[slug];
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema([{ label: "Home", href: "/" }, { label: page.title, href: `/${slug}` }])} />
      <div className="container"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: page.title }]} /></div>
      <header className={`container ${styles.hero}`}>
        <span><Icon name={page.icon} size={34} /></span>
        <div><p>{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></div>
      </header>
      <div className={`container ${styles.layout}`}>
        <article>
          {page.sections.map((section) => (
            <section key={section.heading} id={sectionId(section.heading)} aria-labelledby={`${sectionId(section.heading)}-title`}>
              <h2 id={`${sectionId(section.heading)}-title`}>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <LegalParagraph key={paragraph} text={paragraph} />)}
            </section>
          ))}
        </article>
        <aside aria-label="Legal page navigation">
          <p className={styles.asideLabel}>ON THIS PAGE</p>
          <nav aria-label="Sections on this page">
            {page.sections.map((section) => <a key={section.heading} href={`#${sectionId(section.heading)}`}>{section.heading}</a>)}
          </nav>
          <p className={styles.asideLabel}>MORE FROM THIS SITE</p>
          <nav aria-label="Other legal pages">
            {legalLinks.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} href={`/${item.slug}`}>{item.label}</Link>)}
          </nav>
        </aside>
      </div>
    </main>
  );
}
