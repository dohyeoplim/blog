import NotFound from "@/components/NotFound";
import Renderer from "@/components/Notion/Render";
import {
    getPageRecordMap,
    getPublishedPages,
} from "@/lib/notion/notion-integration";

export async function generateStaticParams() {
    const { results } = await getPublishedPages();
    return results.map((page) => ({ pageId: page.id }));
}

export const revalidate = 60;
export const dynamicParams = true;

const NotionPage = async ({
    params,
}: {
    params: Promise<{ pageId: string }>;
}) => {
    const { pageId } = await params;
    try {
        const page = await getPageRecordMap(pageId);
        if (!page || Object.keys(page).length === 0) {
            return <NotFound />;
        }
        return <Renderer recordMap={page} />;
    } catch (error) {
        console.error("페이지 데이터를 불러오는 도중 오류 발생: ", error);
        return <NotFound />;
    }
};
export default NotionPage;
