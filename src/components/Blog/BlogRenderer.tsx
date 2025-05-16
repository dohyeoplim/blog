"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { all, createLowlight } from "lowlight";

import CodeBlockComponent from "../Editor/CodeBlockComponent";

const lowlight = createLowlight(all);

type Props = {
    content: string;
};

export default function TiptapRenderer({ content }: Props) {
    const editor = useEditor({
        editable: false,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none dark:prose-invert",
            },
        },
        extensions: [
            StarterKit,
            Typography,
            Highlight,
            Image,
            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlockComponent);
                },
            }).configure({ lowlight }),
        ],
        content: content ? JSON.parse(content) : "",
    });

    if (!editor) return null;

    return <EditorContent editor={editor} />;
}
