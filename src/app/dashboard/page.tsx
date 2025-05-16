"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Link from "next/link";

export default function DashboardPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            router.push("/login");
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(setPosts)
            .catch(() => router.push("/login"))
            .finally(() => setLoading(false));
    }, [router]);

    return (
        <>
            <Header title="Dashboard" />

            <div>
                <div className="w-full flex justify-end items-center pb-8">
                    <Link href="/dashboard/new">
                        <Button>글 작성하기</Button>
                    </Link>
                </div>

                {loading ? (
                    <DashboardSkeleton />
                ) : posts && posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {posts.map((post) => (
                            <Card key={post.id}>
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {post.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-xs text-gray-400">
                                        {post.published
                                            ? "✅ 공개"
                                            : "🚧 비공개"}{" "}
                                        |{" "}
                                        {new Date(
                                            post.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                    <div className="flex gap-2 mt-2">
                                        <Link
                                            href={`/dashboard/edit/${post.slug}`}
                                        >
                                            <Button variant="outline" size="sm">
                                                수정
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(post.slug)
                                            }
                                        >
                                            삭제
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-72">
                        <p className="text-lg font-semibold text-gray-500">
                            작성된 글이 없습니다.
                        </p>
                    </div>
                )}
            </div>
        </>
    );

    function handleDelete(id: string) {
        const token = localStorage.getItem("jwt");
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("삭제 실패");
                setPosts((prev) => prev.filter((p) => p.id !== id));
            })
            .catch((err) => alert(err.message));
    }
}

function DashboardSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-5 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
