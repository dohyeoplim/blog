import PreviewListItem from "./PreviewListItem";
import { Post } from "@/types/post";

interface PreviewListProps {
    posts?: Post[];
}

const PreviewList = ({ posts }: PreviewListProps) => {
    if (!posts) return <div>Loading...</div>;

    return (
        <section className="space-y-12">
            {posts.map((post) => (
                <PreviewListItem key={post.slug} post={post} />
            ))}
        </section>
    );
};

export default PreviewList;
