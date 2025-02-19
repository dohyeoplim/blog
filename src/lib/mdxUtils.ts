import fs from "fs";
import path from "path";
import JSON5 from "json5";
import BlogMeta from "@/types/PostMeta";

interface SlugResult {
    slugs: { slug: string }[];
    error?: string;
}

function extractMetadata(content: string): BlogMeta | null {
    const regex = /export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\});/;
    const match = content.match(regex);

    if (!match?.[1]) return null;

    try {
        return JSON5.parse(match[1]) as BlogMeta;
    } catch (error) {
        console.error("Error parsing metadata:", error);
        return null;
    }
}

function getMdxFilePaths(dir: string): string[] {
    const results: string[] = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                results.push(...getMdxFilePaths(fullPath));
            } else if (entry.isFile() && fullPath.endsWith(".mdx")) {
                results.push(fullPath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }
    return results;
}

export function getAllMdxMetadata(rootDir: string): BlogMeta[] {
    const mdxPaths = getMdxFilePaths(rootDir);
    return mdxPaths
        .map((filePath) => {
            try {
                const content = fs.readFileSync(filePath, "utf-8");
                return extractMetadata(content);
            } catch (error) {
                console.error(`Error reading file ${filePath}:`, error);
                return null;
            }
        })
        .filter((meta): meta is BlogMeta => meta !== null);
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
