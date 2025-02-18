import type { Metadata } from "next";
import "./globals.css";

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
                <main>{children}</main>
                {/* Footer */}
            </body>
        </html>
    );
}
