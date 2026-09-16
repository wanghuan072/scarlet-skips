import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { builds, guides, mods, updates, upgrades } from "@/lib/data/content";
import { buildSearchHref } from "@/lib/data/destinations";
import styles from "@/style/page/search/search.module.css";

type SearchItem = { title: string; description: string; href: string; type: string; keywords?: string };

const index: SearchItem[] = [
  ...upgrades.map((item) => ({
    title: item.name,
    description: item.description,
    href: `/upgrades/${item.slug}`,
    type: "Upgrade",
    keywords: `${item.shortName} ${item.tableRow ?? ""} ${item.gameTitle ?? ""} ${(item.aliases ?? []).join(" ")}`,
  })),
  ...builds.map((item) => ({title:item.name,description:item.description,href:buildSearchHref(item.slug),type:"Build route"})),
  ...guides.map((item) => ({title:item.name,description:item.description,href:`/guides/${item.slug}`,type:"Guide"})),
  ...updates.map((item) => ({title:item.title,description:item.summary,href:`/updates/${item.slug}`,type:"Update"})),
  ...mods.map((item) => ({title:item.name,description:item.description,href:`/mods#${item.slug}`,type:"Mod"})),
  {title:"Scarlet Skips Character",description:"Who Scarlet is, how she looks, why we take her outside, and the rope, shoes and cards we put on her in a run.",href:"/character",type:"Character",keywords:"scarlet character jumper who is scarlet rocket shoes jump rope"},
  {title:"Scarlet Skips Ending Guide",description:"A spoiler-light, player-reported route to the ending.",href:"/ending",type:"Guide"},
  {title:"Scarlet Skips Game Info",description:"One-button controls, release details and Windows PC requirements, with a link to the current Steam listing.",href:"/game-info",type:"Game Info"},
  {title:"Scarlet Skips Builds",description:"Pick Moon, score or spectacle, then play a simulated Scarlet Skips run until Super Rocket Shoes.",href:"/builds",type:"Build"},
];

export default function SearchPage({ query }: { query: string }) {
  const normalized = query.trim().toLocaleLowerCase();
  const results = normalized ? index.filter((item) => `${item.title} ${item.description} ${item.type} ${item.keywords ?? ""}`.toLocaleLowerCase().includes(normalized)) : [];
  return <main id="main-content"><div className={`container ${styles.wrap}`}><header><span><Icon name="search" size={31}/></span><div><p>SCARLET SKIPS SEARCH</p><h1>{normalized ? `Results for “${query}”` : "Search the guide"}</h1><p>{normalized ? `${results.length} relevant ${results.length === 1 ? "page" : "pages"} found.` : "Search upgrades, builds, guides, the Moon route, mods and patch notes."}</p></div></header><form action="/search"><label htmlFor="page-search" className="sr-only">Search Scarlet Skips Guide</label><Icon name="search" size={21}/><input id="page-search" name="q" type="search" defaultValue={query} placeholder="Try Rocket Fuel, high score, or ending…" autoFocus/><button type="submit">Search</button></form>{normalized ? results.length ? <section className={styles.results} aria-label="Search results">{results.map((item) => <Link key={`${item.href}-${item.title}`} href={item.href}><span>{item.type}</span><h2>{item.title}</h2><p>{item.description}</p><strong>Open page <Icon name="arrow" size={16}/></strong></Link>)}</section> : <section className={styles.empty}><span><Icon name="info" size={30}/></span><h2>No exact guide match yet</h2><p>Try a broader term such as “rocket”, “rope”, “ending”, “score” or “beginner”.</p><Link href="/upgrades">Browse all upgrades</Link></section> : <section className={styles.quick}><h2>Popular destinations</h2><div><Link href="/character"><Icon name="person" size={22}/>Character</Link><Link href="/upgrades"><Icon name="cards" size={22}/>All upgrades</Link><Link href="/builds#simulator"><Icon name="target" size={22}/>Play a run</Link><Link href="/ending"><Icon name="route" size={22}/>Ending guide</Link></div></section>}</div></main>;
}
