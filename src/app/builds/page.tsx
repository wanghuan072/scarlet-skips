import type { Metadata } from "next";
import BuildsPage from "@/page/builds/BuildsPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Builds – Best Plans by Goal",description:"Choose Scarlet Skips builds for beginners, endings, high scores, Rocket airtime and multi-rope fire challenges.",path:"/builds",image:"/images/editorial/builds-hero.webp"});
export default BuildsPage;
