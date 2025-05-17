export const MAX_FILE_SIZE = 2 * 1024 * 1024;

export async function handleImageUpload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");

    return data.url;
}
