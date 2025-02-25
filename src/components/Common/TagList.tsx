import { Badge } from "@/components/ui/badge";

export interface TagListProps {
    tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <div className="flex md:space-x-2 space-x-1 md:text-base text-sm">
            {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                    {tag}
                </Badge>
            ))}
        </div>
    );
};

export default TagList;
