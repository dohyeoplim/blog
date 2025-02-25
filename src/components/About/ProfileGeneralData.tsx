import TagList from "@/components/Common/TagList";
import { GeneralData } from "@/types/about";

const ProfileGeneralData: React.FC<GeneralData> = ({
    title,
    description_1,
    description_2,
    tags,
}) => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="md:text-xl text-lg font-bold">{title}</span>
            </div>
            {tags && <TagList tags={tags} />}
            <div className="flex flex-col md:text-base text-sm font-light">
                {description_1 && (
                    <span className="font-medium">{description_1}</span>
                )}
                {description_2 && <span>{description_2}</span>}
            </div>
        </div>
    );
};

export default ProfileGeneralData;
