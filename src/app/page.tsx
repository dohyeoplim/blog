import { getPublishedPages } from "@/lib/notion/notion-integration";
import Header from "@/components/Header";
import PreviewList from "@/components/Common/PreviewList";
import { PreviewMeta } from "@/components/Common/PreviewListItem";

export const revalidate = 60;

const Home = async () => {
    const { results: pages } = await getPublishedPages();

    const previewMetaList: PreviewMeta[] = pages.map((page) => ({
        id: page.id,
        title: page.title,
        description: page.excerpt,
        date: page.publishedDate,
        tags: page.tags,
        link: `/n/${page.id}`,
    }));

    return (
        <>
            <Header />
            <h2 className="text-lg font-semibold mb-4">최근 블로그 글</h2>
            <PreviewList metaList={previewMetaList} />
        </>
    );
};

export default Home;
