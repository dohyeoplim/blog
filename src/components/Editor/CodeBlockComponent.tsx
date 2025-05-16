"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default function CodeBlockComponent({
    node: {
        attrs: { language: defaultLanguage },
    },
    updateAttributes,
    extension,
}: any) {
    return (
        <NodeViewWrapper className="code-block relative">
            <select
                contentEditable={false}
                defaultValue={defaultLanguage}
                onChange={(e) => updateAttributes({ language: e.target.value })}
                className="absolute top-1 right-1 bg-white dark:bg-zinc-900 text-xs rounded border px-2 py-1"
            >
                <option value="null">auto</option>
                <option disabled>—</option>
                {extension.options.lowlight
                    .listLanguages()
                    .map((lang: string, i: number) => (
                        <option key={i} value={lang}>
                            {lang}
                        </option>
                    ))}
            </select>
            <pre>
                <NodeViewContent as="code" />
            </pre>
        </NodeViewWrapper>
    );
}
