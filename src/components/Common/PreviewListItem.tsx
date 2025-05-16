import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PostMetaInfo from "./PostMetaInfo";
import type { PostSummary } from "@/types/post";

export interface PreviewListItemProps {
    post: PostSummary;
}

const PreviewListItem = ({ post }: PreviewListItemProps) => {
    return (
        <article role="article" className="list-none flex flex-col space-y-2">
            <div className="flex flex-col items-start justify-start space-y-2">
                <header>
                    <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                            {post.title}
                        </h2>
                    </Link>
                </header>
                {post.excerpt && (
                    <p className="text-sm text-secondary-foreground">
                        {post.excerpt}
                    </p>
                )}
            </div>
            <div className="w-full flex items-center justify-between">
                <PostMetaInfo
                    date={post.created_at}
                    tags={post.tags}
                    badgeClassName="text-xs"
                    containerClassName=""
                />
                <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost">
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
        </article>
    );
};

export default PreviewListItem;
