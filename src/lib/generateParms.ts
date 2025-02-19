import fs from "fs";
import path from "path";

interface SlugResult {
    slugs: { slug: string }[];
    error?: string;
}

export async function generateBlogContentsSlugs(): Promise<SlugResult> {
    const CONTENT_DIR = path.join(process.cwd(), "src/contents");

    try {
        if (!fs.existsSync(CONTENT_DIR)) {
            return {
                slugs: [],
                error: "Content directory not found.",
            };
        }

        const mdxFiles = fs
            .readdirSync(CONTENT_DIR)
            .filter((file) => file.endsWith(".mdx"))
            .map((file) => ({
                slug: path.parse(file).name,
            }));

        return { slugs: mdxFiles };
    } catch (error: unknown) {
        return {
            slugs: [],
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred.",
        };
    }
}
