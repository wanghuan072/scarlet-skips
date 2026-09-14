import type { Metadata } from "next";
import MyRunsPage from "@/page/lab/MyRunsPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "My Scarlet Skips Runs & Passport", description: "Save private Scarlet Skips scores, builds, notes and fan-site milestones in your browser.", path: "/lab/my-runs", noIndex: true });
export default MyRunsPage;
