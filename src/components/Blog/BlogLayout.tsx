import Header from "@/components/Header";
import PostMeta from "@/types/PostMeta";
import { Badge } from "../ui/badge";
import Time from "../Time";

const BlogLayout = ({
    children,
    metadata,
}: Readonly<{ children: React.ReactNode; metadata: PostMeta }>) => {
    return (
        <div>
            <Header title={metadata?.title} bottomPadding={false} />

            <div className="flex items-center justify-start space-x-3 mt-4 mb-8">
                <p>
                    <Time date={metadata.date} />
                </p>

                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex space-x-2">
                        {metadata.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            <article className="prose dark:prose-invert">{children}</article>
        </div>
    );
};

export default BlogLayout;
