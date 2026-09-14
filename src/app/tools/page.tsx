import type { Metadata } from "next";
import ToolsPage from "@/page/tools/ToolsPage";
import { createMetadata } from "@/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Scarlet Skips Tools – Upgrade Picker & Run Helpers",
  description: "Use Scarlet Skips tools to compare upgrade choices, recover a run, track the ending route, inspect interactions and generate challenges.",
  path: "/tools",
});

export default ToolsPage;
