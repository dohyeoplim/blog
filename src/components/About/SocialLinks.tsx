import { SocialLink } from "@/types/about";

export interface SocialLinksProps {
    links: SocialLink[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
    return (
        <ul className="flex space-x-4 pt-2 md:text-base text-sm">
            {links.map((link) => (
                <li key={link.label}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SocialLinks;
