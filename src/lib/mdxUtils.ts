import fs from "fs";
import path from "path";
import JSON5 from "json5";
import PostMeta from "@/types/PostMeta";

interface MetadataResult {
    metadataList: PostMeta[];
    error?: string;
}

interface SlugResult {
    slugs: { slug: string }[];
    error?: string;
}

function extractMetadata(content: string): PostMeta | null {
    const regex = /export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\});/;
    const match = content.match(regex);

    if (!match?.[1]) return null;

    try {
        return JSON5.parse(match[1]) as PostMeta;
    } catch (error) {
        console.error("Error parsing metadata:", error);
        return null;
    }
}

export async function getAllMdxMetadata(
    rootDir: string
): Promise<MetadataResult> {
    try {
        if (!fs.existsSync(rootDir)) {
            return { metadataList: [], error: "Content directory not found." };
        }

        const mdxFiles = fs
            .readdirSync(rootDir)
            .filter((file) => file.endsWith(".mdx"))
            .map((file) => path.join(rootDir, file));

        const metadataList: PostMeta[] = mdxFiles
            .map((filePath) => {
                try {
                    const content = fs.readFileSync(filePath, "utf-8");
                    return extractMetadata(content);
                } catch (error) {
                    console.error(`Error reading file ${filePath}:`, error);
                    return null;
                }
            })
            .filter((meta): meta is PostMeta => meta !== null);

        return { metadataList: metadataList };
    } catch (error: unknown) {
        return {
            metadataList: [],
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred.",
        };
    }
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
