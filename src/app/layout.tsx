import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";

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
        <html lang="en" className="antialiased dark min-h-screen">
            <body className="max-w-2xl mx-auto">
                <Header />
                <main className="mt-16">{children}</main>
                {/* Footer */}
            </body>
        </html>
    );
}
