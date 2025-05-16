"use client";

import { Link } from "next-view-transitions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Footer = () => {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <footer className="w-full text-center pb-16 pt-32 text-sm text-gray-600 dark:text-gray-400">
            <div className="mb-2 space-x-4">
                {isLoggedIn ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="underline hover:text-foreground"
                        >
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="underline hover:text-foreground"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        href="/login"
                        className="underline hover:text-foreground"
                    >
                        Login
                    </Link>
                )}
            </div>
            © {new Date().getFullYear()} Dohyeop Lim
        </footer>
    );
};

export default Footer;
