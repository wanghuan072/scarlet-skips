import type { Metadata } from "next";
import ModsPage from "@/page/mods/ModsPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata: Metadata = createMetadata({...pageTdk["/mods"],path:"/mods"});

export default ModsPage;
