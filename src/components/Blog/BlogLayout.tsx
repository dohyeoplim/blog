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
