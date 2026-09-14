import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { builds, guides, updates, upgrades } from "@/lib/data/content";
import { challenges } from "@/lib/data/lab";
import styles from "@/style/page/search/search.module.css";

type SearchItem = { title: string; description: string; href: string; type: string };

const index: SearchItem[] = [
  ...upgrades.map((item) => ({title:item.name,description:item.description,href:`/upgrades/${item.slug}`,type:"Upgrade"})),
  ...builds.map((item) => ({title:item.name,description:item.description,href:`/builds/${item.slug}`,type:"Build"})),
  ...guides.map((item) => ({title:item.name,description:item.description,href:`/guides/${item.slug}`,type:"Guide"})),
  ...updates.map((item) => ({title:item.title,description:item.summary,href:`/updates/${item.slug}`,type:"Update"})),
  ...challenges.map((item) => ({title:item.name,description:`${item.target} ${item.description}`,href:"/challenges/generator",type:"Challenge"})),
  {title:"Scarlet Skips Ending Guide",description:"A spoiler-light, player-reported route to the ending.",href:"/ending",type:"Guide"},
  {title:"Scarlet Skips High Score Guide",description:"Build the airtime engine before scaling ropes and fire.",href:"/high-score",type:"Guide"},
  {title:"Scarlet Skips Game Info",description:"Release date, price reference, Steam features and Windows PC requirements.",href:"/game-info",type:"Game Info"},
  {title:"Scarlet Skips Tools",description:"Upgrade picker, run recovery, ending tracker, run notes, interaction matrix and challenge generator.",href:"/tools",type:"Tools"},
  {title:"Pick My Upgrade",description:"Compare three upgrade choices against your current goal and run context.",href:"/lab/pick-my-upgrade",type:"Lab"},
  {title:"Run Recovery",description:"Identify a run bottleneck and get a short reset plan.",href:"/lab/run-recovery",type:"Lab"},
  {title:"Ending Route Tracker",description:"Save a spoiler-light ending checklist on this device.",href:"/lab/ending-route",type:"Lab"},
  {title:"Upgrade Interaction Lab",description:"Compare documented two-card interactions and visible unknowns.",href:"/upgrades/matrix",type:"Lab"},
];

export default function SearchPage({ query }: { query: string }) {
  const normalized = query.trim().toLocaleLowerCase();
  const results = normalized ? index.filter((item) => `${item.title} ${item.description} ${item.type}`.toLocaleLowerCase().includes(normalized)) : [];
  return <main id="main-content"><div className={`container ${styles.wrap}`}><header><span><Icon name="search" size={31}/></span><div><p>SCARLET SKIPS SEARCH</p><h1>{normalized ? `Results for “${query}”` : "Search the guide"}</h1><p>{normalized ? `${results.length} relevant ${results.length === 1 ? "page" : "pages"} found.` : "Search upgrades, builds, guides, ending help and optional Lab tools."}</p></div></header><form action="/search"><label htmlFor="page-search" className="sr-only">Search Scarlet Skips Guide</label><Icon name="search" size={21}/><input id="page-search" name="q" type="search" defaultValue={query} placeholder="Try Rocket Fuel, high score, or ending…" autoFocus/><button type="submit">Search</button></form>{normalized ? results.length ? <section className={styles.results} aria-label="Search results">{results.map((item) => <Link key={`${item.href}-${item.title}`} href={item.href}><span>{item.type}</span><h2>{item.title}</h2><p>{item.description}</p><strong>Open page <Icon name="arrow" size={16}/></strong></Link>)}</section> : <section className={styles.empty}><span><Icon name="info" size={30}/></span><h2>No exact guide match yet</h2><p>Try a broader term such as “rocket”, “rope”, “ending”, “score” or “beginner”.</p><Link href="/upgrades">Browse all upgrades</Link></section> : <section className={styles.quick}><h2>Popular destinations</h2><div><Link href="/upgrades"><Icon name="cards" size={22}/>All upgrades</Link><Link href="/guides/beginner-guide"><Icon name="controller" size={22}/>Beginner guide</Link><Link href="/ending"><Icon name="route" size={22}/>Ending guide</Link><Link href="/high-score"><Icon name="trophy" size={22}/>High score</Link></div></section>}</div></main>;
}
