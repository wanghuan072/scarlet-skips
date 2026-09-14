import type { Metadata } from "next";
import BuildPlannerPage from "@/page/run-lab/BuildPlannerPage";
import { createMetadata } from "@/seo/metadata";
export const metadata: Metadata = createMetadata({title:"Scarlet Skips Build Planner",description:"Select a Scarlet Skips goal and current upgrade stacks to get a transparent, versioned build recommendation.",path:"/run-lab/build-planner"});
export default BuildPlannerPage;
