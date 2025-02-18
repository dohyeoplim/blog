import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
    h1: (props: HeadingProps) => (
        <h1
            className="font-medium text-gray-900 dark:text-zinc-100"
            style={{ paddingTop: "3rem", marginBottom: "0" }}
            {...props}
        />
    ),
    h2: (props: HeadingProps) => (
        <h2
            className="text-gray-800 dark:text-zinc-200 font-medium"
            style={{ marginTop: "2rem", marginBottom: "0.75rem" }}
            {...props}
        />
    ),
    h3: (props: HeadingProps) => (
        <h3
            className="text-gray-800 dark:text-zinc-200 font-medium"
            style={{ marginTop: "2rem", marginBottom: "0.75rem" }}
            {...props}
        />
    ),
    h4: (props: HeadingProps) => (
        <h4
            className="font-medium text-gray-800 dark:text-zinc-200"
            {...props}
        />
    ),
    p: (props: ParagraphProps) => (
        <p
            className="text-gray-800 dark:text-zinc-300 leading-snug"
            style={{ marginBottom: "1rem" }}
            {...props}
        />
    ),
    ol: (props: ListProps) => (
        <ol
            className="text-gray-800 dark:text-zinc-300"
            style={{
                paddingLeft: "1.25rem",
                listStyleType: "decimal",
                marginBottom: "0.5rem",
            }}
            {...props}
        />
    ),
    ul: (props: ListProps) => (
        <ul
            className="text-gray-800 dark:text-zinc-300"
            style={{
                paddingLeft: "1.25rem",
                listStyleType: "disc",
                marginBottom: "0.5rem",
            }}
            {...props}
        />
    ),
    li: (props: ListItemProps) => (
        <li
            className="text-gray-800 dark:text-zinc-300"
            style={{ paddingLeft: "0.25rem" }}
            {...props}
        />
    ),
    em: (props: ComponentPropsWithoutRef<"em">) => (
        <em
            className="font-medium text-gray-800 dark:text-zinc-300"
            {...props}
        />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
        <strong
            className="font-medium text-gray-900 dark:text-zinc-100"
            {...props}
        />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        const className =
            "text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800";
        if (href?.startsWith("/")) {
            return (
                <Link href={href} className={className} {...props}>
                    {children}
                </Link>
            );
        }
        if (href?.startsWith("#")) {
            return (
                <a href={href} className={className} {...props}>
                    {children}
                </a>
            );
        }
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                {...props}
            >
                {children}
            </a>
        );
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
        const codeHTML = highlight(children as string);
        return (
            <code
                className="bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 px-1 py-0.5 rounded"
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                {...props}
            />
        );
    },
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
        <table
            className="text-gray-800 dark:text-zinc-300"
            style={{
                borderCollapse: "collapse",
                width: "100%",
                marginTop: "1rem",
                marginBottom: "1rem",
            }}
        >
            <thead>
                <tr style={{ backgroundColor: "#E5E7EB" }}>
                    {data.headers.map((header, index) => (
                        <th
                            key={index}
                            style={{
                                border: "1px solid #D1D5DB",
                                padding: "0.5rem",
                                textAlign: "left",
                            }}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                style={{
                                    border: "1px solid #D1D5DB",
                                    padding: "0.5rem",
                                }}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ),
    blockquote: (props: BlockquoteProps) => (
        <blockquote
            className="text-gray-700 dark:text-zinc-300"
            style={{
                marginLeft: "0.075em",
                borderLeft: "3px solid #D1D5DB",
                paddingLeft: "1rem",
            }}
            {...props}
        />
    ),
};

declare global {
    type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
    return { ...components };
}
