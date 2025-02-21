"use client";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import Header from "../Header";

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

const Renderer = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
    const title =
        recordMap?.block[Object.keys(recordMap.block)[0]]?.value?.properties
            ?.title[0][0];

    return (
        <>
            <Header title={title || "Blog"} />

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
