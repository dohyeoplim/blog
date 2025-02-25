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
    const isN = pathname === "/n";
    const isInN = pathname.startsWith("/n/");

    const renderHeaderContent = () => {
        if (isHome) {
            return (
                <>
                    <Quote />
                    <h1
                        className="text-3xl sm:text-4xl font-bold"
                        style={{ viewTransitionName: "dohyeoplim" }}
                    >
                        dohyeoplim/blog
                    </h1>
                </>
            );
        }

        return (
            <>
                <div className="flex items-center space-x-3 text-sm sm:text-base font-semibold text-secondary-foreground">
                    <Link href="/">
                        <ArrowLeft className="size-3 sm:size-4" />
                    </Link>
                    <Link href="/" className="hover:underline">
                        <span style={{ viewTransitionName: "dohyeoplim" }}>
                            dohyeoplim/blog
                        </span>
                    </Link>
                    {isInN && (
                        <div className="flex items-center space-x-3">
                            <span>/</span>
                            <Link href="/n" className="hover:underline">
                                <span style={{ viewTransitionName: "n" }}>
                                    ✏️ 공부 기록
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
                {isN ? (
                    <h1
                        className="text-3xl sm:text-4xl font-bold"
                        style={{ viewTransitionName: "n" }}
                    >
                        ✏️ 공부 기록
                    </h1>
                ) : (
                    <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
                )}
            </>
        );
    };

    return (
        <header
            className={`pt-24 w-full flex justify-between items-center ${
                bottomPadding ? "pb-12" : ""
            }`}
        >
            <div>{renderHeaderContent()}</div>
            <div style={{ viewTransitionName: "mode" }}>
                <ModeToggle />
            </div>
        </header>
    );
};

export default Header;
