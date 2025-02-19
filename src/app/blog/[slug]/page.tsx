import { generateBlogContentsSlugs } from "@/lib/mdxUtils";

const BlogContentPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const slug = (await params).slug;

    const { default: Post } = await import(`@/contents/${slug}.mdx`);

    return <Post />;
};

export const generateStaticParams = async () => {
    const res = await generateBlogContentsSlugs();
    if (res.error) {
        console.error("Error generating static params:", res.error);
        return [];
    }

    return res.slugs;
};

export const dynamicParams = false;

export default BlogContentPage;
