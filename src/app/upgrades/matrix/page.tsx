import type { Metadata } from "next";
import UpgradeMatrixPage from "@/page/upgrades/UpgradeMatrixPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({ title: "Scarlet Skips Upgrade Interaction Lab", description: "Compare documented Scarlet Skips upgrade pairs by purpose, timing, prerequisite, risk and evidence status.", path: "/upgrades/matrix" });
export default UpgradeMatrixPage;
