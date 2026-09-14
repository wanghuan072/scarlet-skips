import type { Metadata } from "next";
import PickMyUpgradePage from "@/page/lab/PickMyUpgradePage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "Pick My Upgrade – Scarlet Skips Decision Tool", description: "Compare three Scarlet Skips upgrade offers by goal, stage, rope count and cards already in the run.", path: "/lab/pick-my-upgrade" });
export default PickMyUpgradePage;
