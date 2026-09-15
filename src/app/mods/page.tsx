import type { Metadata } from "next";
import ModsPage from "@/page/mods/ModsPage";
import { createMetadata } from "@/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Scarlet Skips Mods – Current Nexus List & Install Notes",
  description: "A checked list of Scarlet Skips mods, UE4SS requirements, gameplay changes and safe install notes without rehosting author files.",
  path: "/mods",
  image: "/images/official/screenshot-2.jpg",
});

export default ModsPage;
