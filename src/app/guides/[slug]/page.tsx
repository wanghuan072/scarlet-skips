import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuideDetailPage from "@/page/guides/GuideDetailPage";
import { getGuide, guides } from "@/lib/data/content";
import { createMetadata } from "@/seo/metadata";
export function generateStaticParams(){return guides.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=getGuide(slug);if(!item)return {};return createMetadata({...item.seo,path:`/guides/${slug}`});}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getGuide(slug);if(!item)notFound();return <GuideDetailPage guide={item}/>;}
