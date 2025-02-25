import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PostMetaInfo from "./PostMetaInfo";

export interface PreviewMeta {
    id: string;
    title: string;
    description?: string;
    date: string;
    tags?: string[];
    link: string;
}

export interface PreviewListItemProps {
    meta: PreviewMeta;
}

const PreviewListItem: React.FC<PreviewListItemProps> = ({ meta }) => {
    return (
        <article
            role="article"
            className="list-none flex flex-col space-y-2 pl-4"
        >
            <div className="flex flex-col items-start justify-start space-y-2">
                <header>
                    <Link href={meta.link}>
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
                    containerClassName=""
                />
                <Link href={meta.link}>
                    <Button variant="ghost">
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
        </article>
    );
};

export default PreviewListItem;
