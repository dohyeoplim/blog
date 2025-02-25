import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PostMeta from "@/types/PostMeta";
import PostMetaInfo from "@/components/Common/PostMetaInfo";

interface PreviewListItemProps {
    meta: PostMeta;
}

const PreviewListItem = ({ meta }: PreviewListItemProps) => {
    return (
        <li role="article" className="list-none flex flex-col space-y-2 pl-4">
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
                <PostMetaInfo
                    date={meta.date}
                    tags={meta.tags}
                    badgeClassName="text-xs"
                />
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
