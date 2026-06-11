import type { MetadataRoute } from "next";
import { urlBase } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dev/", "/gracias"],
    },
    sitemap: `${urlBase()}/sitemap.xml`,
  };
}
