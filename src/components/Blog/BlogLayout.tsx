/**
 * BlogLayout: Layout for blog pages.
 * Renders the header, post meta information, a summarizer, and article content.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The blog content.
 * @param {PostMeta} props.metadata - Metadata for the blog post.
 * @returns {JSX.Element} The blog layout.
 */

import Header from "@/components/Header";
import PostMeta from "@/types/PostMeta";
import Summarizer from "./Summarizer";
import PostMetaInfo from "@/components/Common/PostMetaInfo";

const BlogLayout = ({
    children,
    metadata,
}: Readonly<{ children: React.ReactNode; metadata: PostMeta }>) => {
    return (
        <div>
            <Header title={metadata?.title} bottomPadding={false} />

            <PostMetaInfo date={metadata.date} tags={metadata.tags} />

            <Summarizer text={metadata.textOnly} />

            <article className="prose prose-sm sm:prose-base dark:prose-invert">
                {children}
            </article>
        </div>
    );
};

export default BlogLayout;
