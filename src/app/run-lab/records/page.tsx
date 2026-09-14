import type { Metadata } from "next";
import RecordsPage from "@/page/run-lab/RecordsPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Personal Record Tracker",description:"Save Scarlet Skips scores with version, date and proof links privately in your own browser.",path:"/run-lab/records"});
export default RecordsPage;
