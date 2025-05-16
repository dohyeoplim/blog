"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";

const BlogEditor = dynamic(() => import("@/components/Editor/BlogEditor"), {
    ssr: false,
});

export default function EditPostPage() {
    const params = useParams();
    const router = useRouter();
    const { isLoggedIn, token, loading: authLoading } = useAuth();

    const originalSlug =
        typeof params.slug === "string"
            ? params.slug
            : Array.isArray(params.slug)
            ? params.slug[0]
            : "";

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState(originalSlug);
    const [excerpt, setExcerpt] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [loadingPost, setLoadingPost] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [authLoading, isLoggedIn, router]);

    useEffect(() => {
        if (!originalSlug || !token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${originalSlug}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((post) => {
                setTitle(post.title);
                setSlug(post.slug);
                setExcerpt(post.excerpt);
                setContent(post.content);
                setTags(post.tags?.join(", ") ?? "");
                setPublished(post.published);
                setLoadingPost(false);
            })
            .catch(() => {
                alert("글을 불러오는 중 오류 발생");
                router.push("/dashboard");
            });
    }, [originalSlug, token, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/posts/${originalSlug}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        slug,
                        excerpt,
                        content,
                        tags: tags.split(",").map((tag) => tag.trim()),
                        post_type: "post",
                        published,
                    }),
                }
            );

            if (!res.ok) throw new Error("수정 실패");

            router.push("/dashboard");
        } catch (err) {
            alert("수정 중 오류 발생: " + (err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header title="글 수정" />
            <main className="w-full max-w-3xl mx-auto px-4 py-12">
                {loadingPost ? (
                    <div className="flex items-center justify-center h-72">
                        <p className="text-lg">로딩 중...</p>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">제목</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">슬러그</Label>
                            <Input
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="excerpt">요약</Label>
                            <Textarea
                                id="excerpt"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tags">태그 (쉼표 구분)</Label>
                            <Input
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="e.g. go, tiptap"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>본문</Label>
                            <BlogEditor value={content} onChange={setContent} />
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <input
                                type="checkbox"
                                id="published"
                                checked={published}
                                onChange={(e) => setPublished(e.target.checked)}
                            />
                            <Label
                                htmlFor="published"
                                className="cursor-pointer"
                            >
                                공개 상태
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            disabled={submitting}
                            className="w-full"
                        >
                            {submitting ? "수정 중..." : "수정 완료"}
                        </Button>
                    </form>
                )}
            </main>
        </>
    );
}
