import type { Metadata } from "next";
import UpgradePickerPage from "@/page/run-lab/UpgradePickerPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Upgrade Picker",description:"Enter three Scarlet Skips upgrade choices and compare them against your current goal with visible ranking reasons.",path:"/run-lab/upgrade-picker"});
export default UpgradePickerPage;
