import type { Metadata } from "next";
import UpdatesPage from "@/page/updates/UpdatesPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Updates & Patch Notes",description:"Read official Scarlet Skips patch summaries and see how each update affects builds, mechanics and guide verification.",path:"/updates"});
export default UpdatesPage;
