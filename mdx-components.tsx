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
            className="font-semibold text-xl pt-12 text-foreground"
            {...props}
        />
    ),
    h2: (props: HeadingProps) => (
        <h2 className="text-primary font-medium mt-8 mb-3" {...props} />
    ),
    h3: (props: HeadingProps) => (
        <h3 className="text-primary font-medium mt-8 mb-3" {...props} />
    ),
    h4: (props: HeadingProps) => (
        <h4 className="font-medium text-foreground" {...props} />
    ),
    p: (props: ParagraphProps) => (
        <p className="text-muted-foreground leading-relaxed" {...props} />
    ),
    ol: (props: ListProps) => (
        <ol
            className="list-decimal pl-5 space-y-2 text-muted-foreground"
            {...props}
        />
    ),
    ul: (props: ListProps) => (
        <ul
            className="list-disc pl-5 space-y-1 text-muted-foreground"
            {...props}
        />
    ),
    li: (props: ListItemProps) => (
        <li className="pl-1 text-foreground" {...props} />
    ),
    em: (props: ComponentPropsWithoutRef<"em">) => (
        <em className="font-medium text-foreground" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
        <strong className="font-medium text-foreground" {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
        const className =
            "text-primary hover:text-primary-foreground underline-offset-2";
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
                className="bg-muted text-foreground px-1 py-0.5 rounded"
                dangerouslySetInnerHTML={{ __html: codeHTML }}
                {...props}
            />
        );
    },
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
        <table className="w-full border-collapse border border-border">
            <thead>
                <tr className="bg-muted">
                    {data.headers.map((header, index) => (
                        <th
                            key={index}
                            className="border border-border px-4 py-2 text-left"
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
                                className="border border-border px-4 py-2"
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
            className="ml-1 border-l-4 border-muted pl-4 text-muted-foreground"
            {...props}
        />
    ),
};

declare global {
    type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
    return components;
}
