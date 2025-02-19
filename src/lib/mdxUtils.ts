import fs from "fs";
import path from "path";
import JSON5 from "json5";
import BlogMeta from "@/types/PostMeta";

/**
 * Extract metadata object from the given MDX content.
 * @param content - MDX 파일의 전체 텍스트 내용
 * @returns BlogMeta 객체 또는 추출 실패 시 null
 */
function extractMetadata(content: string): BlogMeta | null {
    const regex = /export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\});/;
    const match = content.match(regex);
    if (match && match[1]) {
        const metadataStr = match[1];
        try {
            // JSON5를 이용하여 object literal strings를 parse.
            const metadata = JSON5.parse(metadataStr) as BlogMeta;
            return metadata;
        } catch (error) {
            console.error("Error parsing metadata:", error);
            return null;
        }
    }
    return null;
}

/**
 * Recursively search for MDX files in the given directory.
 * @param dir - 탐색할 디렉토리 경로
 * @returns MDX 파일의 절대 경로 배열
 */
function getMdxFilePaths(dir: string): string[] {
    let results: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getMdxFilePaths(fullPath));
        } else if (entry.isFile() && fullPath.endsWith(".mdx")) {
            results.push(fullPath);
        }
    }
    return results;
}

/**
 * From the given root directory, extract metadata from all MDX files.
 * @param rootDir - MDX 파일을 포함하는 최상위 디렉토리
 * @returns BlogMeta 객체 배열
 */
export function getAllMdxMetadata(rootDir: string): BlogMeta[] {
    const mdxPaths = getMdxFilePaths(rootDir);
    const metadataList: BlogMeta[] = [];

    for (const filePath of mdxPaths) {
        try {
            const content = fs.readFileSync(filePath, "utf-8");
            const meta = extractMetadata(content);
            if (meta !== null) {
                metadataList.push(meta);
            }
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
        }
    }
    return metadataList;
}
