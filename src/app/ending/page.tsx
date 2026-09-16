import type { Metadata } from "next";
import EndingPage from "@/page/ending/EndingPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";
export const metadata: Metadata = createMetadata({...pageTdk["/ending"],path:"/ending"});
export default EndingPage;
