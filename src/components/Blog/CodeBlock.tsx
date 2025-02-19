"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

const CodeBlock = ({
    children,
    className = "",
    ...props
}: ComponentPropsWithoutRef<"code">) => {
    const [copied, setCopied] = useState(false);

    const language = className.replace("language-", "") || "txt";

    const codeString = typeof children === "string" ? children.trim() : "";

    const highlightedCode = highlight(codeString);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <div className="not-prose relative bg-zinc-900 text-white rounded-lg p-4 overflow-x-auto my-6">
            <span className="absolute top-4 left-4 text-xs text-gray-400 uppercase">
                {language}
            </span>

            <Button
                onClick={handleCopy}
                size="sm"
                className="absolute top-3 right-4 text-xs opacity-80 hover:opacity-100 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
            >
                {copied ? "Copied!" : "Copy"}
            </Button>

            <pre>
                <code
                    className="block whitespace-pre-wrap font-mono mt-8"
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    {...props}
                />
            </pre>
        </div>
    );
};

export default CodeBlock;
