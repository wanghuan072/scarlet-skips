import type { Metadata } from "next";
import GameInfoPage from "@/page/game-info/GameInfoPage";
import { createMetadata } from "@/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Scarlet Skips Game Info – Price, Release & PC Requirements",
  description: "Check the Scarlet Skips release date, Steam price reference, Windows PC requirements, features, version and developer details.",
  path: "/game-info",
  image: "/images/official/steam-header.jpg",
});

export default GameInfoPage;
