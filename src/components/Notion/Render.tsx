"use client";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import Header from "../Header";
const NotionRenderer = dynamic(
    () => import("react-notion-x").then((mod) => mod.NotionRenderer),
    { ssr: false }
);

const dynamicComponents = {
    Code: dynamic(() =>
        import("react-notion-x/build/third-party/code").then((mod) => mod.Code)
    ),
    Collection: dynamic(() =>
        import("react-notion-x/build/third-party/collection").then(
            (mod) => mod.Collection
        )
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
                components={dynamicComponents}
            />
        </>
    );
};

export default Renderer;
