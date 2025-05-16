import { Metadata } from "next";
import NotFound from "@/components/NotFound";
import { Post, PostSummary } from "@/types/post";
import BlogLayout from "@/components/Blog/BlogLayout";

export async function generateStaticParams() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);

        if (!res.ok) {
            return [];
        }

        const posts: PostSummary[] | null = await res.json();

        if (!Array.isArray(posts)) {
            return [];
        }

        return posts
            .filter((post) => post && typeof post.slug === "string")
            .map((post) => ({ slug: post.slug }));
    } catch (error) {
        console.error("generateStaticParams error:", error);
        return [];
    }
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`
        );
        if (!res.ok) throw new Error("404");

        const post: PostSummary & { content: string; cover?: string } =
            await res.json();

        return {
            title: post.title,
            description: post.excerpt || "",
            openGraph: {
                title: post.title,
                description: post.excerpt || "",
                images: [
                    {
                        url:
                            post.cover ||
                            "https://www.dohyeoplim.me/static/images/default-thumbnail.jpg",
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: post.excerpt || "",
                images: [
                    post.cover ||
                        "https://www.dohyeoplim.me/static/images/default-thumbnail.jpg",
                ],
            },
            alternates: {
                canonical: `https://www.dohyeoplim.me/blog/${slug}`,
            },
        };
    } catch (error) {
        console.error("generateMetadata error:", error);
        return {
            title: "페이지를 찾을 수 없습니다.",
            description: "해당 페이지는 존재하지 않거나 오류가 발생했습니다.",
        };
    }
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`
        );

        if (!res.ok) {
            console.warn(`Post not found: ${slug}`);
            return <NotFound />;
        }

        const post: Post = await res.json();

        if (!post || !post.title || !post.content) {
            return <NotFound />;
        }

        return <BlogLayout post={post} />;
    } catch (error) {
        console.error("페이지 렌더링 실패:", error);
        return <NotFound />;
    }
}
