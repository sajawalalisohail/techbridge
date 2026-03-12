import type { MetadataRoute } from "next";

const BASE_URL = "https://techbridge.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        "",
        "/services",
        "/websites",
        "/work",
        "/about",
        "/contact",
        "/insights",
        "/privacy",
        "/terms",
    ];

    const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/services" ? 0.9 : 0.7,
    }));

    return entries;
}
