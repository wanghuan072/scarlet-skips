import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { builds, guides, mods, updates, upgrades } from "@/lib/data/content";
import styles from "@/style/page/search/search.module.css";

type SearchItem = { title: string; description: string; href: string; type: string };

const index: SearchItem[] = [
  ...upgrades.map((item) => ({title:item.name,description:item.description,href:`/upgrades/${item.slug}`,type:"Upgrade"})),
  ...builds.map((item) => ({title:item.name,description:item.description,href:"/builds#planner",type:"Build route"})),
  ...guides.map((item) => ({title:item.name,description:item.description,href:`/guides/${item.slug}`,type:"Guide"})),
  ...updates.map((item) => ({title:item.title,description:item.summary,href:`/updates/${item.slug}`,type:"Update"})),
  ...mods.map((item) => ({title:item.name,description:item.description,href:`/mods#${item.slug}`,type:"Mod"})),
  {title:"Scarlet Skips Ending Guide",description:"A spoiler-light, player-reported route to the ending.",href:"/ending",type:"Guide"},
  {title:"Scarlet Skips High Score Guide",description:"Build the airtime engine before scaling ropes and fire.",href:"/high-score",type:"Guide"},
  {title:"Scarlet Skips Game Info",description:"Release date, price reference, Steam features and Windows PC requirements.",href:"/game-info",type:"Game Info"},
  {title:"Scarlet Skips Build Planner",description:"Enter the three cards on screen and log every level toward an ending, learning or score route.",href:"/builds#planner",type:"Build"},
];

export default function SearchPage({ query }: { query: string }) {
  const normalized = query.trim().toLocaleLowerCase();
  const results = normalized ? index.filter((item) => `${item.title} ${item.description} ${item.type}`.toLocaleLowerCase().includes(normalized)) : [];
  return <main id="main-content"><div className={`container ${styles.wrap}`}><header><span><Icon name="search" size={31}/></span><div><p>SCARLET SKIPS SEARCH</p><h1>{normalized ? `Results for “${query}”` : "Search the guide"}</h1><p>{normalized ? `${results.length} relevant ${results.length === 1 ? "page" : "pages"} found.` : "Search upgrades, builds, guides, the Moon route, mods and patch notes."}</p></div></header><form action="/search"><label htmlFor="page-search" className="sr-only">Search Scarlet Skips Guide</label><Icon name="search" size={21}/><input id="page-search" name="q" type="search" defaultValue={query} placeholder="Try Rocket Fuel, high score, or ending…" autoFocus/><button type="submit">Search</button></form>{normalized ? results.length ? <section className={styles.results} aria-label="Search results">{results.map((item) => <Link key={`${item.href}-${item.title}`} href={item.href}><span>{item.type}</span><h2>{item.title}</h2><p>{item.description}</p><strong>Open page <Icon name="arrow" size={16}/></strong></Link>)}</section> : <section className={styles.empty}><span><Icon name="info" size={30}/></span><h2>No exact guide match yet</h2><p>Try a broader term such as “rocket”, “rope”, “ending”, “score” or “beginner”.</p><Link href="/upgrades">Browse all upgrades</Link></section> : <section className={styles.quick}><h2>Popular destinations</h2><div><Link href="/upgrades"><Icon name="cards" size={22}/>All upgrades</Link><Link href="/builds#planner"><Icon name="target" size={22}/>Build planner</Link><Link href="/ending"><Icon name="route" size={22}/>Ending guide</Link><Link href="/mods"><Icon name="flask" size={22}/>Mods</Link></div></section>}</div></main>;
}
