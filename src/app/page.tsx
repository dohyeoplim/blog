import Header from "@/components/Header";
import PreviewList from "@/components/Common/PreviewList";
import LinkCard from "@/components/Common/LinkCard";
import { getAllMdxMetadata } from "@/lib/mdxUtils";

export const revalidate = 60;

const Home = async () => {
    const { metadataList, error } = await getAllMdxMetadata("src/contents");

    if (error) {
        console.warn(`Failed to fetch metadata: ${error}`);
        return (
            <>
                <Header />
                <p>Error loading metadata.</p>
            </>
        );
    }

    metadataList.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const previewMetaList = metadataList.map((meta) => ({
        id: meta.slug,
        title: meta.title,
        description: meta.description,
        date: meta.date,
        tags: meta.tags,
        link: `/blog/${meta.slug}`,
    }));

    return (
        <>
            <Header />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
                <LinkCard
                    href="/about"
                    title="👋 About Me"
                    description="제가 누군나면요.."
                />
                <LinkCard
                    href="/n"
                    title="✏️ 공부 기록 보기"
                    description="재밌는 것도 많아요"
                />
            </div>

            <h2 className="text-lg font-semibold mb-4 pl-4">최근 블로그 글</h2>

            <PreviewList metaList={previewMetaList} />
        </>
    );
};

export default Home;
