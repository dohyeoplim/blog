import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Time from "../Time";

interface PreviewListItemProps {
    post: {
        title: string;
        excerpt: string;
        slug: string;
        date: string;
        tags?: string[];
    };
}

const PreviewListItem = ({ post }: PreviewListItemProps) => {
    return (
        <li role="article" className="list-none flex flex-col space-y-2">
            <div className="flex flex-col items-start justify-start space-y-2">
                <header>
                    <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                            {post.title}
                        </h2>
                    </Link>
                </header>

                <p className="text-sm text-secondary-foreground">
                    {post.excerpt}
                </p>
            </div>

            <div className="w-full flex items-center justify-between">
                <div className="flex space-x-3">
                    <div>
                        <Time date={post.date} />
                    </div>

                    <div className="flex space-x-2">
                        {post.tags?.map((tag, index) => (
                            <Badge key={index} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost">
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
        </li>
    );
};

export default PreviewListItem;
