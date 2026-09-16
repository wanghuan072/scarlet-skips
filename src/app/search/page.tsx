import type { Metadata } from "next";
import SearchPage from "@/page/search/SearchPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";
export const metadata: Metadata = createMetadata({...pageTdk["/search"],path:"/search",noIndex:true});
export default async function Page({searchParams}:{searchParams:Promise<{q?:string|string[]}>}){const {q}=await searchParams;return <SearchPage query={Array.isArray(q)?q[0]??"":q??""}/>;}
