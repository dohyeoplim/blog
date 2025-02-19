import PreviewListItem from "./PreviewListItem";
import { getAllMdxMetadata } from "@/lib/mdxUtils";

const PreviewList = async () => {
    const { metadataList, error } = await getAllMdxMetadata("src/contents");

    if (error) {
        console.warn(`Failed to fetch metadata: ${error}`);
        return [];
    }

    metadataList.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <section className="space-y-12">
            {metadataList.map((meta) => (
                <PreviewListItem key={meta.slug} meta={meta} />
            ))}
        </section>
    );
};

export default PreviewList;
