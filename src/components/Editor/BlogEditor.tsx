"use client";

import { useState } from "react";
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
import { useDropzone } from "react-dropzone";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/blog-utils";

const lowlight = createLowlight(all);

type Props = {
    value: string;
    onChange: (json: string) => void;
};

export default function TiptapEditor({ value, onChange }: Props) {
    const [showUploader, setShowUploader] = useState(false);

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

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            alert("파일이 너무 커요");
            return;
        }

        try {
            const url = await handleImageUpload(file);
            editor?.chain().focus().setImage({ src: url }).run();
            setShowUploader(false);
        } catch (err) {
            alert((err as Error).message);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
        maxFiles: 1,
    });

    if (!editor) return null;

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
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUploader((s) => !s)}
                >
                    Add Image
                </Button>
            </div>

            {showUploader && (
                <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-400 rounded p-6 text-center bg-gray-50 dark:bg-gray-800 cursor-pointer"
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>이미지를 여기에 놓아주세요…</p>
                    ) : (
                        <p>이미지를 드래그하거나 클릭하여 업로드</p>
                    )}
                </div>
            )}

            <div className="border rounded-md p-4 bg-background">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
