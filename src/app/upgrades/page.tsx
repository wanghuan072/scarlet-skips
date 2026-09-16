import type { Metadata } from "next";
import UpgradesPage from "@/page/upgrades/UpgradesPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";
export const metadata: Metadata = createMetadata({...pageTdk["/upgrades"],path:"/upgrades"});
export default UpgradesPage;
