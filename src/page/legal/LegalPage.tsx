import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Icon } from "@/components/common/Icon";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/legal/legal.module.css";

type Section = { heading: string; paragraphs: string[] };
type PageData = { title: string; eyebrow: string; intro: string; icon: "info" | "heart" | "shield" | "book"; sections: Section[] };

const contactLine = `Write to ${siteConfig.email}.`;

function LegalParagraph({ text }: { text: string }) {
  const email = siteConfig.email;
  if (!text.includes(email)) return <p>{text}</p>;
  const [before, after] = text.split(email);
  return <p>{before}<a href={`mailto:${email}`}>{email}</a>{after}</p>;
}

export const legalPages: Record<string, PageData> = {
  about: {
    title: "About Us", eyebrow: "INDEPENDENT FAN GUIDE", icon: "heart",
    intro: "Scarlet Skips Hub helps players learn the jump, weigh their next card and find a route worth trying. It is an independent fan project, not an official game website.",
    sections: [
      { heading: "What you can find here", paragraphs: ["Start with timing and controls, compare the documented upgrade cards, or look through Moon, score and spectacle routes. The Updates and Game Info pages help you check which version and game features a guide discusses.", "The playable run on Builds is a teaching model for thinking through card choices. It does not reproduce the game's unpublished scoring rules or predict your next real run."] },
      { heading: "How the guide is written", paragraphs: ["Game details are checked against official listings, announcements and available game records where possible. Player routes are presented as advice or reports, not as official requirements. Pages link to records and show check dates when a claim needs context.", "Random card offers, patches and individual timing make a guaranteed route impossible. If a number or trigger has not been published, we leave it uncertain rather than guess."] },
      { heading: "Independence and corrections", paragraphs: ["Scarlet Skips Hub is not developed, sponsored or endorsed by Yerk Games, YerkDiff, Valve or Steam. If you spot an error, see Contact Us.", contactLine] },
    ],
  },
  contact: {
    title: "Contact Us", eyebrow: "CORRECTIONS & FEEDBACK", icon: "info",
    intro: "A useful correction names the page, the game version and the exact claim that needs another look. There is no contact form on this site.",
    sections: [
      { heading: "What to include", paragraphs: ["Include the page URL, the card or route involved, and a short explanation of what seems wrong. For a gameplay observation, describe steps another player could repeat and share a stable screenshot, video or original announcement link if available.", "The game version and platform help us separate a current issue from advice written for an older patch."] },
      { heading: "Email", paragraphs: [contactLine, "Do not send passwords, account details or executable files."] },
      { heading: "How submissions may be used", paragraphs: ["A report may lead to a correction or a clearer uncertainty note. Sending a report does not guarantee publication. Individual players are not named in a guide without their permission."] },
    ],
  },
  privacy: {
    title: "Privacy Policy", eyebrow: "HOW THIS SITE WORKS", icon: "shield",
    intro: "Scarlet Skips Hub can be read without an account. This page describes the current development build and the limits of what we know about hosting.",
    sections: [
      { heading: "Accounts and playable runs", paragraphs: ["The site does not offer account registration or a public leaderboard. Card choices in the Builds teaching simulator stay in the active browser page state. Reloading or closing that page resets the run; it is not submitted as a game score."] },
      { heading: "Requests and hosting", paragraphs: ["A hosting service may process request details such as IP address, browser information, requested URL and time for delivery and security. This site is published at scarletskips.org. We do not claim that no hosting logs exist; the provider's own privacy notice also applies.", "No site-operated analytics or advertising tracker is represented as active in this build. Review this statement if hosting, analytics or embedded services change."] },
      { heading: "External websites", paragraphs: ["Some pages link to Steam, Steam Community, YouTube, Nexus Mods and other original records. Opening those links takes you to separate services with their own privacy practices."] },
      { heading: "Questions and changes", paragraphs: [contactLine, "Review this policy whenever the site's data handling changes."] },
    ],
  },
  terms: {
    title: "Terms of Service", eyebrow: "USING THE FAN GUIDE", icon: "book",
    intro: "These terms describe this informational fan guide and its playable teaching model. They do not change the terms of the game or third-party services.",
    sections: [
      { heading: "Information, not a guaranteed result", paragraphs: ["Guides and card suggestions are for personal gameplay decisions. Random offers, individual timing, game updates and unconfirmed mechanics may produce a different outcome. We try to distinguish game facts from player reports but do not guarantee a score, ending or strategy result."] },
      { heading: "Personal use and links", paragraphs: ["You may read the guide, link to its pages and use the teaching simulator for personal play. Do not disrupt the site, falsely present its content as official game material, or republish substantial original guide text as your own."] },
      { heading: "Third-party destinations", paragraphs: ["Steam, Steam Community, YouTube, Nexus Mods and other linked websites govern their own content, purchases, downloads and accounts. A link does not imply endorsement."] },
      { heading: "Changes and contact", paragraphs: ["These terms may change as the guide or its hosting changes.", contactLine] },
    ],
  },
  copyright: {
    title: "Copyright", eyebrow: "GAME AND SITE MATERIAL", icon: "shield",
    intro: "Scarlet Skips Hub is an independent fan guide. Game names and official materials remain with their rights holders; the site's original writing and interface are separate work.",
    sections: [
      { heading: "Game rights", paragraphs: ["The official Steam listing identifies the game's copyright as © 2026 YerkDiff and names Yerk Games as developer and publisher. Scarlet Skips, its characters, screenshots and game art remain with their respective rights holders. Steam belongs to Valve Corporation."] },
      { heading: "Materials on this site", paragraphs: ["Original explanations, comparisons, page design and the teaching simulator are part of this fan site. Official images are shown to identify and discuss the game, not offered as standalone downloads. Mod files and author artwork should be obtained from original listings.", "A link or credit does not transfer ownership. The site does not claim endorsement by the game developer, publisher or Valve."] },
      { heading: "Corrections and rights-holder requests", paragraphs: ["For a credit correction or concern about specific material, identify the page URL and the item involved.", contactLine] },
    ],
  },
};

export default function LegalPage({ slug }: { slug: string }) {
  const page = legalPages[slug];
  return <main id="main-content"><JsonLd data={breadcrumbSchema([{label:"Home",href:"/"},{label:page.title,href:`/${slug}`}])}/><div className="container"><Breadcrumb items={[{label:"Home",href:"/"},{label:page.title}]}/></div><header className={`container ${styles.hero}`}><span><Icon name={page.icon} size={34}/></span><div><p>{page.eyebrow}</p><h1>{page.title}</h1><p>{page.intro}</p></div></header><div className={`container ${styles.layout}`}><article>{page.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <LegalParagraph key={paragraph} text={paragraph} />)}</section>)}</article><aside><Icon name="info" size={25}/><h2>Independent guide</h2><p>This site is not affiliated with the game developer, publisher or Valve. Check linked records when a claim matters to your run.</p><Link href="/about">How this guide handles claims</Link></aside></div></main>;
}
