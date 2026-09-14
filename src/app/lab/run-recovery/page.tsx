import type { Metadata } from "next";
import RunRecoveryPage from "@/page/lab/RunRecoveryPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "Scarlet Skips Run Recovery Tool", description: "Identify a Scarlet Skips run bottleneck and get a short, evidence-aware recovery plan for the next upgrade.", path: "/lab/run-recovery" });
export default RunRecoveryPage;
