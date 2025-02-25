import Time from "../Time";
import TagList from "./TagList";

export interface PostMetaInfoProps {
    date: string;
    tags?: string[];
    badgeClassName?: string;
    containerClassName?: string;
}

const PostMetaInfo: React.FC<PostMetaInfoProps> = ({
    date,
    tags,
    badgeClassName,
    containerClassName,
}) => {
    return (
        <div
            className={`flex items-center justify-start space-x-2 sm:space-x-3 ${
                containerClassName ?? "mt-4 mb-8"
            }`}
        >
            <Time date={date} />
            {tags && tags.length > 0 && (
                <TagList tags={tags} badgeClassName={badgeClassName} />
            )}
        </div>
    );
};

export default PostMetaInfo;
