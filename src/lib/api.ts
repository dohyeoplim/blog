const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPosts() {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}

export async function createPost(data: any, token: string) {
    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
}
