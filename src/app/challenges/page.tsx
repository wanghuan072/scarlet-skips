import type { Metadata } from "next";
import ChallengesPage from "@/page/challenges/ChallengesPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "Scarlet Skips Challenges – Daily & Custom Runs", description: "Try authored Scarlet Skips score, survival, rope and ending challenges with clear rules, targets and local progress.", path: "/challenges", image: "/images/editorial/home-hero-v2.webp" });
export default ChallengesPage;
