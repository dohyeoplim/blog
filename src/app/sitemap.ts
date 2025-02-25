import type { MetadataRoute } from "next";
import { getPublishedPages } from "@/lib/notion/notion-integration";
import { generateBlogContentsSlugs } from "@/lib/mdxUtils";

const BASE_URL = "https://www.dohyeoplim.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const notionRes = await getPublishedPages();
    const blogRes = await generateBlogContentsSlugs();

    const notionPages = notionRes.results;
    const blogSlugs = blogRes.slugs;

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

    const notionUrls = notionPages.map((page) => ({
        url: `${BASE_URL}/n/${page.id}`,
        lastModified: page.publishedDate,
    }));

    const blogUrls = blogSlugs.map((item: { slug: string; date?: string }) => ({
        url: `${BASE_URL}/blog/${item.slug}`,
        lastModified: item.date || new Date().toISOString(),
    }));

    const allUrls = [...additionalUrls, ...notionUrls, ...blogUrls];

    return allUrls;
}
