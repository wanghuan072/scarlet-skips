import type { Metadata } from "next";
import ChallengeGeneratorPage from "@/page/challenges/ChallengeGeneratorPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "Scarlet Skips Challenge Generator", description: "Choose a difficulty and goal, then select from hand-built Scarlet Skips challenge formats.", path: "/challenges/generator" });
export default async function Page({ searchParams }: { searchParams: Promise<{ challenge?: string }> }) {
  const { challenge } = await searchParams;
  return <ChallengeGeneratorPage initialChallengeId={challenge}/>;
}
