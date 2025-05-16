"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { all, createLowlight } from "lowlight";

import { Button } from "@/components/ui/button";
import { ColorHighlighter } from "./extensions/ColorHighlighter";
import CodeBlockComponent from "./CodeBlockComponent";

const lowlight = createLowlight(all);

type Props = {
    value: string;
    onChange: (json: string) => void;
};

export default function TiptapEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Typography,
            Highlight,
            Image,
            ColorHighlighter,
            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlockComponent);
                },
            }).configure({ lowlight }),
        ],

        content: value ? JSON.parse(value) : "",
        onUpdate({ editor }) {
            const json = JSON.stringify(editor.getJSON());
            onChange(json);
        },
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert min-h-[300px] outline-none",
            },
        },
    });

    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt("이미지 URL을 입력하세요");
        if (url) editor.chain().focus().setImage({ src: url }).run();
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-muted">
                <Button
                    type="button"
                    variant={editor.isActive("bold") ? "default" : "outline"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("italic") ? "default" : "outline"}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </Button>
                <Button
                    type="button"
                    variant={
                        editor.isActive("heading", { level: 2 })
                            ? "default"
                            : "outline"
                    }
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    H2
                </Button>
                <Button
                    type="button"
                    variant={
                        editor.isActive("bulletList") ? "default" : "outline"
                    }
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    Bullet
                </Button>
                <Button
                    type="button"
                    variant={
                        editor.isActive("codeBlock") ? "default" : "outline"
                    }
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                >
                    Code
                </Button>
                <Button type="button" variant="outline" onClick={addImage}>
                    Add Image
                </Button>
            </div>

            <div className="border rounded-md p-4 bg-background">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
