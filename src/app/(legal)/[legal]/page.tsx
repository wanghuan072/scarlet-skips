import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LegalPage, { legalPages } from "@/page/legal/LegalPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";
export function generateStaticParams(){return Object.keys(legalPages).map((legal)=>({legal}));}
export async function generateMetadata({params}:{params:Promise<{legal:string}>}):Promise<Metadata>{const {legal}=await params;if(!legalPages[legal] || !pageTdk[`/${legal}` as keyof typeof pageTdk])return {};return createMetadata({...pageTdk[`/${legal}` as keyof typeof pageTdk],path:`/${legal}`});}
export default async function Page({params}:{params:Promise<{legal:string}>}){const {legal}=await params;if(!legalPages[legal])notFound();return <LegalPage slug={legal}/>;}
