import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { pretendard, firaCode } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

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
                <body
                    className={`w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 ${pretendard.className}`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <main className="text-sm sm:text-base">{children}</main>

                        <Footer />
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
