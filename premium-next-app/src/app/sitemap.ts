import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/data/case-studies";
import { INSIGHTS } from "@/data/insights";

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

    const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
        url: `${BASE_URL}/work/${cs.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    const insightEntries: MetadataRoute.Sitemap = INSIGHTS.map((post) => ({
        url: `${BASE_URL}/insights/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...entries, ...caseStudyEntries, ...insightEntries];
}
