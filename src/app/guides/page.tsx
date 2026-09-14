import type { Metadata } from "next";
import GuidesPage from "@/page/guides/GuidesPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Guides – Controls, Tips & Secrets",description:"Learn Scarlet Skips controls, jump timing, beginner strategy, achievements, tips and hidden mechanics with clearly labeled sources.",path:"/guides",image:"/images/editorial/guides-hero.webp"});
export default GuidesPage;
