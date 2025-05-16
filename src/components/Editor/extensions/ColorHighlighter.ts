import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

export const ColorHighlighter = Extension.create({
    name: "colorHighlighter",

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    decorations(state) {
                        const decorations: Decoration[] = [];
                        const regex = /#[0-9A-Fa-f]{3,6}/g;
                        const { doc } = state;

                        doc.descendants((node, pos) => {
                            if (!node.isText) return;
                            const text = node.text || "";
                            let match;
                            while ((match = regex.exec(text))) {
                                const from = pos + match.index;
                                const to = from + match[0].length;
                                const color = match[0];

                                decorations.push(
                                    Decoration.inline(from, to, {
                                        style: `background-color: ${color}; border-radius: 2px; padding: 0 2px;`,
                                    })
                                );
                            }
                        });

                        return DecorationSet.create(doc, decorations);
                    },
                },
            }),
        ];
    },
});
