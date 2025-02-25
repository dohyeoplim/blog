import NotFound from "@/components/NotFound";
import Renderer from "@/components/Notion/Render";
import {
    getPageRecordMap,
    getPublishedPages,
} from "@/lib/notion/notion-integration";
import { Metadata } from "next";

export async function generateStaticParams() {
    const { results } = await getPublishedPages();
    return results.map((page) => ({ pageId: page.id }));
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ pageId: string }>;
}): Promise<Metadata> {
    const { pageId } = await params;
    try {
        const { metadata } = await getPageRecordMap(pageId);
        return {
            title: metadata?.title || "dohyeoplim/blog",
            description: metadata?.excerpt || "임도협의 블로그!",
            openGraph: {
                title: metadata?.title || "dohyeoplim/blog",
                description: metadata?.excerpt || "임도협의 블로그!",
                images: [
                    {
                        url:
                            metadata?.cover ||
                            "https://www.dohyeoplim.me/static/images/default-thumbnail.jpg",
                        width: 1200,
                        height: 630,
                        alt: metadata?.title || "dohyeoplim/blog",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: metadata?.title || "dohyeoplim/blog",
                description: metadata?.excerpt || "임도협의 블로그!",
                images: [
                    metadata?.cover ||
                        "https://www.dohyeoplim.me/static/images/default-thumbnail.jpg",
                ],
            },
            alternates: {
                canonical: `https://www.dohyeoplim.me/n/${pageId}`,
            },
        };
    } catch (error) {
        console.error("메타데이터 생성 에러: ", error);
        return {
            title: "페이지를 찾을 수 없습니다.",
            description: "해당 페이지는 존재하지 않거나 오류가 발생했습니다.",
        };
    }
}

const NotionPage = async ({
    params,
}: {
    params: Promise<{ pageId: string }>;
}) => {
    const { pageId } = await params;
    try {
        const { recordMap, metadata } = await getPageRecordMap(pageId);
        if (!recordMap || Object.keys(recordMap).length === 0) {
            return <NotFound />;
        }
        return <Renderer recordMap={recordMap} metadata={metadata} />;
    } catch (error) {
        console.error("페이지 데이터를 불러오는 도중 오류 발생: ", error);
        return <NotFound />;
    }
};
export default NotionPage;
