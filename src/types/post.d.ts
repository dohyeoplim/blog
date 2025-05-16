export type Post = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    post_type: string;
    published: boolean;
    created_at: string;
    updated_at: string;
};

export type PostSummary = {
    id: string;
    title: string;
    excerpt: string;
    created_at: string;
    updated_at: string;
    tags: string[];
    post_type: string;
    slug: string;
};

export type CreatePostPayload = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    post_type: string;
    published: boolean;
};
