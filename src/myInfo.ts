import { SocialLink, Project, Experience, GeneralData } from "@/types/about";

export const profileContent = {
    imageSrc: "/static/images/profile.jpg",
    name: "임도협",
    englishName: "Dohyeop Lim",
    organization: "SeoulTech | AI",
    role: "Undergraduate Student",
    socialLinks: [
        { label: "Github", url: "https://github.com/dohyeoplim" },
        { label: "Blog", url: "https://dohyeoplim.me" },
        { label: "Mail", url: "mailto:dhlim0817@gmail.com" },
    ] as SocialLink[],
};

export const sloganContent = [
    "Execute,",
    "No Excuse,",
    "Take Charge,",
    "Just Win.",
];

export const projectsContent: Project[] = [
    {
        title: "dohyeoplim/blog",
        description: "일상과 공부 이야기",
        tags: ["Next.js"],
        link: "https://github.com/dohyeoplim/blog",
    },
    {
        title: "jforcell.com",
        description: "회사 소개 페이지",
        tags: ["Next.js"],
        link: "https://jforcell.com",
        linkLabel: "Visit Website",
    },
];

export const experiencesContent: Experience[] = [
    {
        imageSrc: "/static/images/profile/exp_1.jpg",
        reverse: true,
        data: {
            title: "in-cosmetics korea 2024",
            description_1: "as a Marketing Assistant",
            description_2: "2024. 07. 24. - 2024. 07. 26.",
            tags: ["Exhibition", "Internship"],
        },
    },
];

export const educationContent: GeneralData = {
    title: "Seoul National University of Science and Technology",
    description_1: "Dept. of Applied Artificial Intelligence",
    description_2: "2024. 03. - Present",
};
