import ProfileCard from "@/components/About/ProfileCard";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";

const Me = () => {
    return (
        <>
            <Header title="About Me" />

            <main>
                <ProfileCard imageSrc="/static/images/profile.jpg">
                    <div className="flex flex-col space-y-2">
                        <div>
                            <p className="md:text-2xl text-xl font-bold">
                                임도협
                            </p>
                            <p className="text-base md:text-lg text-secondary-foreground">
                                Dohyeop Lim
                            </p>
                        </div>

                        <div>
                            <p className="md:text-base text-sm font-medium">
                                SeoulTech | AI
                            </p>
                            <p className="md:text-sm text-xs font-light text-secondary-foreground">
                                Undergraduate Student
                            </p>
                        </div>

                        <ul className="flex space-x-4 pt-2 md:text-base text-sm">
                            <li>
                                <a
                                    href="https://github.com/dohyeoplim"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Github
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://dohyeoplim.me"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="mailto:dhlim0817@gmail.com">Mail</a>
                            </li>
                        </ul>
                    </div>
                </ProfileCard>

                <div className="mt-16 md:text-7xl text-5xl font-extralight flex flex-col space-y-4 cursor-default">
                    <p className="hover:scale-[105%] transition-transform duration-300 ease-in-out">
                        <span className="font-semibold">E</span>xecute,
                    </p>
                    <p className="hover:scale-[105%] transition-transform duration-300 ease-in-out">
                        <span className="font-semibold">N</span>o Excuse,
                    </p>
                    <p className="hover:scale-[105%] transition-transform duration-300 ease-in-out">
                        <span className="font-semibold">T</span>ake Charge,
                    </p>
                    <p className="hover:scale-[105%] transition-transform duration-300 ease-in-out">
                        <span className="font-semibold">J</span>ust Win.
                    </p>
                </div>

                <div className="mt-16 border-none shadow-none prose dark:prose-invert">
                    <h2>Projects</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectCard
                            title="dohyeoplim/blog"
                            description="일상과 공부 이야기"
                            tags={["Next.js"]}
                            link="https://github.com/dohyeoplim/blog"
                        />

                        <ProjectCard
                            title="jforcell.com"
                            description="회사 소개 페이지"
                            tags={["Next.js"]}
                            link="https://jforcell.com"
                            linkLabel="Visit Website"
                        />
                    </div>
                </div>

                <div className="mt-24 border-none shadow-none prose dark:prose-invert">
                    <h2>Experiences</h2>

                    <ProfileCard
                        imageSrc="/static/images/profile/exp_1.jpg"
                        reverse
                        vAlign="top"
                    >
                        <ProfileGeneralData
                            title="in-cosmetics korea 2024"
                            description_1="as a Marketing Assistant"
                            description_2="2024. 07. 24. - 2024. 07. 26."
                            tags={["Exhibition", "Internship"]}
                        />
                    </ProfileCard>
                </div>

                <div className="mt-24 border-none shadow-none prose dark:prose-invert">
                    <h2>Education</h2>

                    <ProfileGeneralData
                        title="Seoul National University of Science and Technology"
                        description_1="Dept. of Applied Artificial Intelligence"
                        description_2="2024. 03. - Present"
                    />
                </div>
            </main>
        </>
    );
};

const ProjectCard = ({
    title,
    description,
    tags,
    link,
    linkLabel,
}: {
    title: string;
    description?: string;
    tags?: string[];
    link?: string;
    linkLabel?: string;
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2">
                    <span className="md:text-xl text-lg font-bold">
                        {title}
                    </span>
                    <div className="flex md:space-x-2 space-x-1 md:text-base text-sm">
                        {tags?.map((tag) => (
                            <Badge key={tag} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col space-y-2 md:text-base text-sm font-light">
                    <span>{description}</span>
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

const ProfileGeneralData = ({
    title,
    description_1,
    description_2,
    tags,
}: {
    title: string;
    description_1?: string;
    description_2?: string;
    tags?: string[];
}) => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="md:text-xl text-lg font-bold">{title}</span>
            </div>
            {tags && (
                <div className="flex md:space-x-2 space-x-1 md:text-base text-sm">
                    <Badge variant="outline">Exhibition</Badge>
                    <Badge variant="outline">Internship</Badge>
                </div>
            )}
            <div className="flex flex-col md:text-base text-sm font-light">
                <span className="font-medium">{description_1}</span>
                <span>{description_2}</span>
            </div>
        </div>
    );
};

export default Me;
