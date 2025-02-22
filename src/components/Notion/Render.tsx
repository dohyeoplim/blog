"use client";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import Header from "../Header";
import { PageInfo } from "@/lib/notion/notion-integration";
import Time from "../Time";
import { Badge } from "../ui/badge";

import "prismjs/themes/prism-tomorrow.css";

const NotionRenderer = dynamic(
    () => import("react-notion-x").then((mod) => mod.NotionRenderer),
    { ssr: false }
);

const dynamicComponents = {
    Code: dynamic(() =>
        import("react-notion-x/build/third-party/code").then(async (mod) => {
            await Promise.all([
                import("prismjs/components/prism-python.js"),
                import("prismjs/components/prism-c.js"),
            ]);
            return mod.Code;
        })
    ),
};

const Renderer = ({
    recordMap,
    metadata,
}: {
    recordMap: ExtendedRecordMap;
    metadata: PageInfo;
}) => {
    return (
        <>
            <Header title={metadata.title || "Blog"} bottomPadding={false} />

            <div className="flex items-center justify-start space-x-2 sm:space-x-3 mt-4 mb-8">
                <p>
                    <Time date={metadata.publishedDate} />
                </p>

                {metadata.tags && metadata.tags.length > 0 && (
                    <div className="flex space-x-1 sm:space-x-2">
                        {metadata.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                hideBlockId={true}
                disableHeader={true}
                showTableOfContents={false}
                components={dynamicComponents}
                className="prose prose-sm sm:prose-base dark:prose-invert"
            />
        </>
    );
};

export default Renderer;
