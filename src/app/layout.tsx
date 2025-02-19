import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { pretendard, firaCode } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
    title: "dohyeoplim/blog",
    description: "dohyeoplim's blog",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html
                lang="ko"
                className={`antialiased min-h-screen ${pretendard.variable} ${firaCode.variable}`}
                suppressHydrationWarning
            >
                <body className={`max-w-2xl mx-auto ${pretendard.className}`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <main>{children}</main>
                        {/* Footer */}
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
