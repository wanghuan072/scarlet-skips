import type { Metadata } from "next";
import HighScorePage from "@/page/high-score/HighScorePage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips High Score Guide & Build",description:"Learn the player-reported Scarlet Skips high-score route: height and Luck, Rocket Fuel loop, then late rope and fire scaling.",path:"/high-score",image:"/images/editorial/high-score-hero.webp"});
export default HighScorePage;
