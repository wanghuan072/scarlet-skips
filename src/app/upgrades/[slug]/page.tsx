import { notFound } from "next/navigation";
import type { Metadata } from "next";
import UpgradeDetailPage from "@/page/upgrades/UpgradeDetailPage";
import { getUpgrade, upgrades } from "@/lib/data/content";
import { createMetadata } from "@/seo/metadata";

export function generateStaticParams() { return upgrades.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=getUpgrade(slug);if(!item)return {};return createMetadata({...item.seo,path:`/upgrades/${slug}`});}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getUpgrade(slug);if(!item)notFound();return <UpgradeDetailPage upgrade={item}/>;}
