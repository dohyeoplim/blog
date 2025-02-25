export interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const SectionWithTitleAndChildren = ({ title, children }: SectionProps) => {
    return (
        <section className="mt-24 border-none shadow-none prose dark:prose-invert">
            <h2>{title}</h2>
            {children}
        </section>
    );
};

export default SectionWithTitleAndChildren;
