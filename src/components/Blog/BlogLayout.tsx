import Header from "@/components/Header";

const BlogLayout = ({
    children,
    metadata,
}: Readonly<{ children: React.ReactNode; metadata: any }>) => {
    return (
        <div>
            <Header title={metadata?.title} />
            {children}
        </div>
    );
};

export default BlogLayout;
