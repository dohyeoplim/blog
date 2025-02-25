import { Badge } from "@/components/ui/badge";

/**
 * TagListProps defines the props for the TagList component.
 * @property {string[]} tags - Array of tag strings.
 * @property {string} [badgeClassName] - Optional CSS class for each badge.
 */
export interface TagListProps {
    tags: string[];
    badgeClassName?: string;
}

/**
 * TagList renders a list of tags as outlined badges.
 * @param {TagListProps} props - Component props.
 * @returns {JSX.Element} The rendered tag list.
 */
const TagList = ({ tags, badgeClassName }: TagListProps) => {
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
