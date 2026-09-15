import type { Metadata } from "next";
import HighScorePage from "@/page/high-score/HighScorePage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips High Score Guide – Airtime, Fuel & Fire",description:"Learn the player-reported Scarlet Skips score route: height and Luck, Rocket Fuel loop, then late rope and fire scaling.",path:"/high-score",image:"/images/official/screenshot-2.jpg"});
export default HighScorePage;
