import path from "path";
import { getAllMdxMetadata } from "@/lib/mdx-loader";
import PreviewListItem from "./PreviewListItem";
import PostMeta from "@/types/PostMeta";

const PreviewList = async () => {
    const POST_DIR = path.join(process.cwd(), "src", "app", "blog");
    const posts: PostMeta[] = getAllMdxMetadata(POST_DIR);

    posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <section className="space-y-12">
            {posts.map((meta) => (
                <PreviewListItem key={meta.slug} meta={meta} />
            ))}
        </section>
    );
};

export default PreviewList;
