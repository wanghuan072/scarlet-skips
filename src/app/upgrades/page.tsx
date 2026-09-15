import type { Metadata } from "next";
import UpgradesPage from "@/page/upgrades/UpgradesPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Upgrades – Every Documented Card",description:"Find each documented Scarlet Skips upgrade, what it changes, when players take it and which exact values remain unpublished.",path:"/upgrades",image:"/images/official/screenshot-3.jpg"});
export default UpgradesPage;
