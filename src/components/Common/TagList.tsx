import { Badge } from "@/components/ui/badge";

export interface TagListProps {
    tags: string[];
    badgeClassName?: string;
}

const TagList: React.FC<TagListProps> = ({ tags, badgeClassName }) => {
    return (
        <div className="flex space-x-1 sm:space-x-2">
            {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className={badgeClassName}>
                    {tag}
                </Badge>
            ))}
        </div>
    );
};

export default TagList;
