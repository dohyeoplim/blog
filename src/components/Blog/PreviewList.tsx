import PreviewListItem from "./PreviewListItem";
import PostMeta from "@/types/PostMeta";

const PreviewList = async () => {
    const res = await fetch("http://localhost:3000/api/contents/metadata", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch metadata");
    }

    const metadataList: PostMeta[] = await res.json();

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
