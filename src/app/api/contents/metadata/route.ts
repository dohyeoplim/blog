import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getAllMdxMetadata } from "@/lib/mdxUtils";

export async function GET() {
    try {
        const CONTENT_DIR = path.join(process.cwd(), "src/contents");

        if (!fs.existsSync(CONTENT_DIR)) {
            return NextResponse.json(
                { error: "Content directory not found." },
                { status: 404 }
            );
        }

        const metadataList = getAllMdxMetadata(CONTENT_DIR);

        return NextResponse.json(metadataList);
    } catch (error: unknown) {
        console.error("Error fetching blog metadata:", error);

        return NextResponse.json(
            {
                error: "Failed to fetch blog metadata.",
                message:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
