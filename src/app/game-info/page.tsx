import type { Metadata } from "next";
import GameInfoPage from "@/page/game-info/GameInfoPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata: Metadata = createMetadata({...pageTdk["/game-info"],path:"/game-info"});

export default GameInfoPage;
