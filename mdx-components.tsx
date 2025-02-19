import Link from "next/link";
import CodeBlock from "@/components/Blog/CodeBlock";

const MDXComponents = {
    a: ({
        href,
        children,
        ...props
    }: {
        href?: string;
        children: React.ReactNode;
    }) => {
        if (href?.startsWith("/")) {
            return (
                <Link href={href} {...props}>
                    {children}
                </Link>
            );
        }
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                {children}
            </a>
        );
    },
    code: CodeBlock,
    pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
};

declare global {
    type MDXProvidedComponents = typeof MDXComponents;
}

export function useMDXComponents(): MDXProvidedComponents {
    return { ...MDXComponents };
}
