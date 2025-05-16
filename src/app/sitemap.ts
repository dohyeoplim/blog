import type { MetadataRoute } from "next";
import type { PostSummary } from "@/types/post";

const BASE_URL = "https://www.dohyeoplim.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        cache: "no-store",
    });

    let posts: PostSummary[] = [];

    if (res.ok) {
        posts = await res.json();
    } else {
        console.error("❌ Failed to fetch posts for sitemap");
    }

    const staticUrls = [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date().toISOString(),
        },
    ];

    const blogUrls = posts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified:
            post.updated_at || post.created_at || new Date().toISOString(),
    }));

    return [...staticUrls, ...blogUrls];
}
