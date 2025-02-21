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

    const renderSubTitle = () => {
        if (isHome) {
            return (
                <span style={{ viewTransitionName: "dohyeoplim" }}>
                    dohyeoplim/blog
                </span>
            );
        }

        return (
            <div className="flex items-center space-x-3 text-sm sm:text-base font-semibold text-secondary-foreground">
                <div className="flex items-center space-x-1">
                    <Link href="/">
                        <ArrowLeft className="size-3 sm:size-4" />
                    </Link>
                    <Link href="/" className="hover:underline">
                        <span style={{ viewTransitionName: "dohyeoplim" }}>
                            dohyeoplim/blog
                        </span>
                    </Link>
                </div>
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
        );
    };

    const renderMainTitle = () => {
        if (!isHome) {
            return isN ? (
                <h1 className="text-3xl sm:text-4xl font-bold">
                    <span style={{ viewTransitionName: "n" }}>
                        ✏️ 공부 기록
                    </span>
                </h1>
            ) : (
                <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
            );
        }
        return null;
    };

    return (
        <header
            className={`pt-24 w-full flex justify-between items-center ${
                bottomPadding ? "pb-12" : ""
            }`}
        >
            <div>
                {isHome && <Quote />}
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                    {renderSubTitle()}
                </h1>
                {renderMainTitle()}
            </div>
            <div style={{ viewTransitionName: "mode" }}>
                <ModeToggle />
            </div>
        </header>
    );
};

export default Header;
