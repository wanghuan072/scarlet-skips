import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LegalPage, { legalPages } from "@/page/legal/LegalPage";
import { createMetadata } from "@/seo/metadata";
export function generateStaticParams(){return Object.keys(legalPages).map((legal)=>({legal}));}
export async function generateMetadata({params}:{params:Promise<{legal:string}>}):Promise<Metadata>{const {legal}=await params;const page=legalPages[legal];if(!page)return {};return createMetadata({title:page.title,description:page.intro,path:`/${legal}`});}
export default async function Page({params}:{params:Promise<{legal:string}>}){const {legal}=await params;if(!legalPages[legal])notFound();return <LegalPage slug={legal}/>;}
