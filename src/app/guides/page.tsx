import type { Metadata } from "next";
import GuidesPage from "@/page/guides/GuidesPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Guides – Controls, Routes & Player Tips",description:"Learn Scarlet Skips controls, jump timing, achievement steps, high-score strategy and practical fixes backed by official media and player runs.",path:"/guides",image:"/images/official/screenshot-4.jpg"});
export default GuidesPage;
