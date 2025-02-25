/**
 * LinkCard: A clickable card with title, description, and an arrow icon.
 * @param href - Destination URL.
 * @param title - Card title.
 * @param description - Card description.
 */
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";

export interface LinkCardProps {
    href: string;
    title: string;
    description: string;
}

const LinkCard = ({ href, title, description }: LinkCardProps) => (
    <Link href={href}>
        <div className="w-full py-4 px-4 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="w-full flex items-center justify-between">
                <p className="text-sm text-secondary-foreground mt-2">
                    {description}
                </p>
                <ArrowRight size={16} />
            </div>
        </div>
    </Link>
);

export default LinkCard;
