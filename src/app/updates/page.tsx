import type { Metadata } from "next";
import UpdatesPage from "@/page/updates/UpdatesPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";
export const metadata: Metadata = createMetadata({...pageTdk["/updates"],path:"/updates"});
export default UpdatesPage;
