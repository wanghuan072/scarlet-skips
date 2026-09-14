import type { Metadata } from "next";
import DailyChallengePage from "@/page/challenges/DailyChallengePage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "Scarlet Skips Daily Challenge", description: "Play today's deterministic fan-made Scarlet Skips challenge and save completion progress locally.", path: "/challenges/daily" });
export default DailyChallengePage;
