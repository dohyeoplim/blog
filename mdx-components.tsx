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
    code: (props: React.ComponentPropsWithoutRef<"code">) => {
        // CodeBlock
        if (props.className && props.className.startsWith("language-")) {
            return <CodeBlock {...props} />;
        }
        // Inline code
        return (
            <code className="bg-gray-100 dark:bg-gray-800 rounded font-mono px-1 py-0.5">
                {props.children}
            </code>
        );
    },
    pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
};

declare global {
    type MDXProvidedComponents = typeof MDXComponents;
}

export function useMDXComponents(): MDXProvidedComponents {
    return { ...MDXComponents };
}
