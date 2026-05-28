import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://madushan.design/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://madushan.design/work",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://madushan.design/contact",
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
