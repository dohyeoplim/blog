import Header from "@/components/Header";
import PostMeta from "@/types/PostMeta";

const BlogLayout = ({
    children,
    metadata,
}: Readonly<{ children: React.ReactNode; metadata: PostMeta }>) => {
    return (
        <div>
            <Header title={metadata?.title} />
            {children}
        </div>
    );
};

export default BlogLayout;
