import { notFound } from "next/navigation";
import type { Metadata } from "next";
import UpdateDetailPage from "@/page/updates/UpdateDetailPage";
import { getUpdate, updates } from "@/lib/data/content";
import { createMetadata } from "@/seo/metadata";
export function generateStaticParams(){return updates.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=getUpdate(slug);if(!item)return {};return createMetadata({...item.seo,path:`/updates/${slug}`});}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getUpdate(slug);if(!item)notFound();return <UpdateDetailPage entry={item}/>;}
