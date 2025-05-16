"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function NewPostPage() {
    const { isLoggedIn, token, loading: authLoading } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            router.push("/login");
        }
    }, [authLoading, isLoggedIn, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                {
                    method: "POST",
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

            if (!res.ok) throw new Error("작성 실패");
            router.push("/dashboard");
        } catch (err) {
            alert("글 생성 실패: " + (err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header title="글 작성" />
            <main className="w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
                        <Input
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. study, react"
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
                        <Label htmlFor="published" className="cursor-pointer">
                            게시 여부
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full"
                    >
                        {submitting ? "작성 중..." : "게시하기"}
                    </Button>
                </form>
            </main>
        </>
    );
}
