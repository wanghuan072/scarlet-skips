import type { Metadata } from "next";
import HomePage from "@/page/home/HomePage";
import { createMetadata } from "@/seo/metadata";

export const metadata: Metadata = createMetadata({title:"Scarlet Skips Guide, Upgrades, Builds & Run Lab",description:"Master Scarlet Skips with sourced upgrade guides, goal-based builds, ending and high-score routes, plus practical planning tools.",path:"/"});
export default HomePage;
