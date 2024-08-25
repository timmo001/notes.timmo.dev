import { MetadataRoute } from "next";

export const baseUrl = "https://notes.timmo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  return result;
}
