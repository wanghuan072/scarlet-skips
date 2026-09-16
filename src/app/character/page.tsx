import type { Metadata } from "next";
import CharacterPage from "@/page/character/CharacterPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata: Metadata = createMetadata({...pageTdk["/character"],path:"/character"});

export default CharacterPage;
