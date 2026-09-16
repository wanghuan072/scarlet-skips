import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: { index: !noIndex && siteConfig.indexable, follow: !noIndex },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1672, height: 941 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
