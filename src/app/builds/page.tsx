import type { Metadata } from "next";
import BuildsPage from "@/page/builds/BuildsPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";
export const metadata: Metadata = createMetadata({...pageTdk["/builds"],path:"/builds"});
export default BuildsPage;
