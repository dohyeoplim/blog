"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import PreviewList from "@/components/Common/PreviewList";
import { Skeleton } from "@/components/ui/skeleton";

import type { PostSummary } from "@/types/post";

const Home = () => {
    const [posts, setPosts] = useState<PostSummary[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/posts`
                );
                if (!res.ok) throw new Error("Failed to fetch");

                const data: PostSummary[] = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("게시글 로딩 실패:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    return (
        <>
            <Header />
            <section>
                <div className="mb-6">
                    <h2 className="text-md font-medium">최근 블로그 🦊</h2>
                </div>
                {loading ? (
                    <div className="space-y-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-6 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : error || posts === null ? (
                    <p className="text-sm text-muted-foreground">
                        아직 게시된 글이 없습니다.
                    </p>
                ) : posts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        아직 게시된 글이 없습니다.
                    </p>
                ) : (
                    <PreviewList posts={posts} />
                )}
            </section>
        </>
    );
};

export default Home;
