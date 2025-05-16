import type { PostSummary } from "@/types/post";
import PreviewListItem from "./PreviewListItem";

interface PreviewListProps {
    posts: PostSummary[];
}

const PreviewList = ({ posts }: PreviewListProps) => (
    <section className="space-y-6">
        {posts.map((post) => (
            <PreviewListItem key={post.id} post={post} />
        ))}
    </section>
);

export default PreviewList;
