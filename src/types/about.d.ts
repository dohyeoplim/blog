export interface SocialLink {
    label: string;
    url: string;
}

export interface Project {
    title: string;
    description?: string;
    tags?: string[];
    link?: string;
    linkLabel?: string;
}

export interface GeneralData {
    title: string;
    description_1?: string;
    description_2?: string;
    tags?: string[];
}

export interface Experience {
    imageSrc: string;
    reverse?: boolean;
    data: GeneralData;
}

export interface ProfileCardProps {
    imageSrc?: string;
    reverse?: boolean;
    children: React.ReactNode;
}
