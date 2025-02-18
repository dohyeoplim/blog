"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const cycleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={cycleTheme}
            aria-label="Toggle theme"
        >
            <Sun
                className={`h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === "light"
                        ? "scale-100 rotate-0"
                        : "scale-0 -rotate-90"
                }`}
            />
            <Moon
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === "dark"
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-90"
                }`}
            />
            <Cpu
                className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                    theme === "system"
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-90"
                }`}
            />
        </Button>
    );
}
