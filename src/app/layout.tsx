import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { pretendard, firaCode } from "@/lib/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

import "./globals.css";

export const metadata: Metadata = {
    title: "dohyeoplim/blog",
    description: "임도협의 블로그!",
    keywords:
        "임도협, 도협, dohyeoplim, 개발자, 학생, blog, medium, AI, Machine Learning, Deep Learning, Data Science, Python, Next.js, JavaScript, TypeScript, React",
    icons: {
        icon: "/static/favicon.ico",
        apple: "/static/icon/apple-touch-icon.png",
        shortcut: "/static/icon/favicon-32x32.png",
    },
    openGraph: {
        title: "dohyeoplim/blog",
        description: "임도협의 블로그!",
        url: "https://www.dohyeoplim.me",
        siteName: "dohyeoplim/blog",
        images: [
            {
                url: "https://www.dohyeoplim.me/static/images/default-thumbnail.jpg",
                width: 1200,
                height: 630,
                alt: "dohyeoplim/blog",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "dohyeoplim/blog",
        description: "임도협의 블로그!",
        images: [
            "https://www.dohyeoplim.me/static/images/default-thumbnail.jpg",
        ],
    },
    alternates: {
        canonical: "https://www.dohyeoplim.me",
    },
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
                <head>
                    <meta
                        name="naver-site-verification"
                        content="ab717afc0437675b652ce93a8731bce6191113e0"
                    />
                </head>
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

                        <Analytics />
                    </ThemeProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
