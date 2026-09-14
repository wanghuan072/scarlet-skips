import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BuildDetailPage from "@/page/builds/BuildDetailPage";
import { builds, getBuild } from "@/lib/data/content";
import { createMetadata } from "@/seo/metadata";
export function generateStaticParams(){return builds.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=getBuild(slug);if(!item)return {};return createMetadata({title:item.seo.title,description:item.seo.description,path:`/builds/${slug}`});}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getBuild(slug);if(!item)notFound();return <BuildDetailPage build={item}/>;}
