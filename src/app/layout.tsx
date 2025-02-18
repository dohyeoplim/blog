import type { Metadata } from "next";
import "./globals.css";
import { jetbrainsMono, pretendard } from "@/lib/fonts";

export const metadata: Metadata = {
    title: "blog",
    description: "dohyeoplim's blog",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ko"
            className={`antialiased min-h-screen ${pretendard.variable} ${jetbrainsMono.variable}`}
        >
            <body className={`max-w-2xl mx-auto ${pretendard.className}`}>
                <main>{children}</main>
                {/* Footer */}
            </body>
        </html>
    );
}
