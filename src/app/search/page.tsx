import type { Metadata } from "next";
import SearchPage from "@/page/search/SearchPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Search",description:"Search Scarlet Skips upgrades, builds, guides, updates and Run Lab tools.",path:"/search",noIndex:true});
export default async function Page({searchParams}:{searchParams:Promise<{q?:string|string[]}>}){const {q}=await searchParams;return <SearchPage query={Array.isArray(q)?q[0]??"":q??""}/>;}
