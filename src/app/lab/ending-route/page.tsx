import type { Metadata } from "next";
import EndingRoutePage from "@/page/lab/EndingRoutePage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "Scarlet Skips Ending Route Tracker", description: "Track a spoiler-light Scarlet Skips ending route checklist locally and open the sourced guide only when needed.", path: "/lab/ending-route" });
export default EndingRoutePage;
