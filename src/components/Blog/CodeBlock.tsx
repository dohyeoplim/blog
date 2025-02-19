// "use client";

// import { useState } from "react";
import { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

const CodeBlock = ({
    children,
    className = "",
    ...props
}: ComponentPropsWithoutRef<"code">) => {
    // const [copied, setCopied] = useState(false);

    const language = className.replace("language-", "") || "txt";

    const codeString = typeof children === "string" ? children.trim() : "";

    const highlightedCode = highlight(codeString);

    // const handleCopy = async () => {
    //     try {
    //         await navigator.clipboard.writeText(codeString);
    //         setCopied(true);
    //         setTimeout(() => setCopied(false), 2000);
    //     } catch (error) {
    //         console.error("Failed to copy:", error);
    //     }
    // };

    return (
        <div className="not-prose relative bg-zinc-900 text-white rounded-lg p-8">
            <span className="absolute top-4 left-4 text-xs text-gray-400 uppercase pointer-events-none">
                {language}
            </span>

            {/* <Button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded"
            >
                {copied ? "Copied!" : "Copy"}
            </Button> */}

            <div className="overflow-x-auto">
                <pre className="p-0 m-0 bg-transparent">
                    <code
                        className="block whitespace-pre font-mono"
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                        {...props}
                    />
                </pre>
            </div>
        </div>
    );
};

export default CodeBlock;
