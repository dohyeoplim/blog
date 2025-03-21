import { getPublishedPages } from "@/lib/notion/notion-integration";
import Header from "@/components/Header";
import PreviewList from "@/components/Common/PreviewList";
import { PreviewMeta } from "@/components/Common/PreviewListItem";

export const revalidate = 60;

const Home = async () => {
    const { blogs, studies } = await getPublishedPages();

    const blogPreviewMetaList: PreviewMeta[] = blogs.map((page) => ({
        id: page.id,
        title: page.title,
        description: page.excerpt,
        date: page.publishedDate,
        tags: page.tags,
        postType: page.postType,
        link: `/n/${page.id}`,
    }));

    const studyPreviewMetaList: PreviewMeta[] = studies.map((page) => ({
        id: page.id,
        title: page.title,
        description: page.excerpt,
        date: page.publishedDate,
        tags: page.tags,
        postType: page.postType,
        link: `/n/${page.id}`,
    }));

    return (
        <>
            <Header />
            {/* Blog */}
            <section>
                <div className="mb-6">
                    <h2 className="text-md font-medium">최근 블로그 🦊</h2>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                        일상..
                    </p>
                </div>
                <PreviewList metaList={blogPreviewMetaList} />
            </section>

            <hr className="mb-8 mt-4" />

            {/* Study */}
            <section>
                <div className="mb-6">
                    <h2 className="text-md font-medium">공부 노트 😵‍💫</h2>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                        기록용
                    </p>
                </div>
                <PreviewList metaList={studyPreviewMetaList} />
            </section>
        </>
    );
};

export default Home;
