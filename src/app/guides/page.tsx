import type { Metadata } from "next";
import GuidesPage from "@/page/guides/GuidesPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";
export const metadata: Metadata = createMetadata({...pageTdk["/guides"],path:"/guides"});
export default GuidesPage;
