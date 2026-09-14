import type { Metadata } from "next";
import RunLabPage from "@/page/run-lab/RunLabPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Run Lab – Build & Upgrade Tools",description:"Use interactive Scarlet Skips tools to plan a build, compare three upgrade choices, track the ending route and save personal scores.",path:"/run-lab"});
export default RunLabPage;
