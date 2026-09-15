import type { Metadata } from "next";
import BuildsPage from "@/page/builds/BuildsPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Run Simulator – Jump, Upgrade and Reach the Moon",description:"Play a full Scarlet Skips-inspired run: clear rope circles, choose one of three upgrade cards, grow your stats and climb toward the Moon.",path:"/builds",image:"/images/official/screenshot-3.jpg"});
export default BuildsPage;
