"use client";

import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "" }) => {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <header className="pt-24 mb-16">
            <h1 className="text-4xl font-bold">
                {isHome ? (
                    <span style={{ viewTransitionName: "name" }}>
                        @dohyeoplim
                    </span>
                ) : (
                    <Link
                        href="/"
                        className="text-xl font-semibold text-secondary-foreground hover:underline"
                    >
                        <span style={{ viewTransitionName: "name" }}>
                            @dohyeoplim
                        </span>
                    </Link>
                )}
            </h1>
            {!isHome && <h1 className="text-4xl font-bold">{title}</h1>}
        </header>
    );
};

export default Header;
