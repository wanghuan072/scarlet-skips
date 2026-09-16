import type { Metadata } from "next";
import HomePage from "@/page/home/HomePage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata: Metadata = createMetadata({...pageTdk["/"],path:"/"});
export default HomePage;
