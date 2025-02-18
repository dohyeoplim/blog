import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Time from "../Time";
import PostMeta from "@/types/PostMeta";

interface PreviewListItemProps {
    meta: PostMeta;
}

const PreviewListItem = ({ meta }: PreviewListItemProps) => {
    return (
        <li role="article" className="list-none flex flex-col space-y-2">
            <div className="flex flex-col items-start justify-start space-y-2">
                <header>
                    <Link href={`/blog/${meta.slug}`}>
                        <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                            {meta.title}
                        </h2>
                    </Link>
                </header>

                {meta.description && (
                    <p className="text-sm text-secondary-foreground">
                        {meta.description}
                    </p>
                )}
            </div>

            <div className="w-full flex items-center justify-between">
                <div className="flex space-x-3">
                    <div>
                        <Time date={meta.date} />
                    </div>

                    {meta.tags && meta.tags.length > 0 && (
                        <div className="flex space-x-2">
                            {meta.tags.map((tag, index) => (
                                <Badge key={index} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
                <Link href={`/blog/${meta.slug}`}>
                    <Button variant="ghost">
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
        </li>
    );
};

export default PreviewListItem;
