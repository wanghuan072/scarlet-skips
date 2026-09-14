import type { Metadata } from "next";
import UpgradesPage from "@/page/upgrades/UpgradesPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Upgrades – All Documented Cards",description:"Explore every documented Scarlet Skips upgrade by category, timing, goal and evidence status without invented card names or values.",path:"/upgrades",image:"/images/editorial/upgrades-hero.webp"});
export default UpgradesPage;
