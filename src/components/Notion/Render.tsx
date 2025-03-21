/**
 * Renderer component.
 * Renders a Notion page with header, meta info, and Notion content.
 *
 * @param recordMap - Notion page record map.
 * @param metadata - Page metadata.
 * @returns The rendered Notion page.
 */

"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import Header from "../Header";
import { PageInfo } from "@/lib/notion/notion-integration";
import PostMetaInfo from "@/components/Common/PostMetaInfo";

import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";
import ScrollProgress from "../Blog/ScrollProgress";

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
    Equation: dynamic(() =>
        import("react-notion-x/build/third-party/equation").then(
            (m) => m.Equation
        )
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
            <ScrollProgress />

            <Header title={metadata.title || "Blog"} bottomPadding={false} />

            <PostMetaInfo date={metadata.publishedDate} tags={metadata.tags} />

            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                hideBlockId={true}
                disableHeader={true}
                showTableOfContents={false}
                components={{
                    nextImage: Image,
                    nextLink: Link,
                    ...dynamicComponents,
                }}
                className="prose prose-img:rounded-md prose-sm dark:prose-invert"
            />
        </>
    );
};

export default Renderer;
