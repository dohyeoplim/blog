import type { MetadataRoute } from "next";
import { getPublishedPages } from "@/lib/notion/notion-integration";

const BASE_URL = "https://www.dohyeoplim.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { blogs, studies } = await getPublishedPages();
    const allPages = [...blogs, ...studies];

    const additionalUrls = [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date().toISOString(),
        },
    ];

    const notionUrls = allPages.map((page) => ({
        url: `${BASE_URL}/n/${page.id}`,
        lastModified: page.publishedDate,
    }));

    const allUrls = [...additionalUrls, ...notionUrls];

    return allUrls;
}
