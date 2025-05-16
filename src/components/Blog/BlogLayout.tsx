"use client";

import Header from "@/components/Header";
import PostMetaInfo from "@/components/Common/PostMetaInfo";
import ScrollProgress from "@/components/Blog/ScrollProgress";
import BlogRenderer from "./BlogRenderer";
import type { Post } from "@/types/post";

type Props = {
    post: Post;
};

export default function BlogLayout({ post }: Props) {
    return (
        <>
            <ScrollProgress />

            <Header title={post.title || "Blog"} bottomPadding={false} />

            <PostMetaInfo date={post.created_at} tags={post.tags} />

            <BlogRenderer content={post.content} />
        </>
    );
}
