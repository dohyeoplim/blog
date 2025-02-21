"use client";

import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { ModeToggle } from "./ThemeSwitch";
import Quote from "./Quote";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
    title?: string;
    bottomPadding?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title = "",
    bottomPadding = true,
}) => {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const MainTitle = "dohyeoplim/blog";

    return (
        <header
            className={`pt-24 w-full flex justify-between items-center ${
                bottomPadding ? "pb-12" : ""
            }`}
        >
            <div>
                {isHome && <Quote />}
                <h1 className="text-3xl sm:text-4xl font-bold">
                    {isHome ? (
                        <span style={{ viewTransitionName: "name" }}>
                            {MainTitle}
                        </span>
                    ) : (
                        <div className="flex items-center space-x-1">
                            <Link href="/">
                                <ArrowLeft className="size-3 sm:size-4" />
                            </Link>
                            <Link
                                href="/"
                                className="text-sm sm:text-base font-semibold text-secondary-foreground hover:underline"
                            >
                                <span style={{ viewTransitionName: "name" }}>
                                    {MainTitle}
                                </span>
                            </Link>
                        </div>
                    )}
                </h1>
                {!isHome && (
                    <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                        {title}
                    </h1>
                )}
            </div>

            <div style={{ viewTransitionName: "mode" }}>
                <ModeToggle />
            </div>
        </header>
    );
};

export default Header;
