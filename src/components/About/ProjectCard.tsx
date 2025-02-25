import TagList from "@/components/Common/TagList";
import { Project } from "@/types/about";

const ProjectCard = ({
    title,
    description,
    tags,
    link,
    linkLabel,
}: Project) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                    <span className="md:text-xl text-lg font-bold">
                        {title}
                    </span>
                    {tags && <TagList tags={tags} />}
                </div>
                <div className="flex flex-col space-y-2 md:text-base text-sm font-light">
                    {description && <span>{description}</span>}
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="md:text-sm text-xs"
                        >
                            {linkLabel || "Source Code"}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
