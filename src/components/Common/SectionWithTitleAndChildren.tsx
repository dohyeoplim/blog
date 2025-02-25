/**
 * SectionProps defines the props for the SectionWithTitleAndChildren component.
 * @property {string} title - The section's title.
 * @property {React.ReactNode} children - The section's content.
 */
export interface SectionProps {
    title: string;
    children: React.ReactNode;
}

/**
 * SectionWithTitleAndChildren renders a section with a title and children content.
 * It applies predefined styles for layout and typography.
 *
 * @param {SectionProps} props - The props for the section.
 * @returns {JSX.Element} A styled section element.
 */
const SectionWithTitleAndChildren = ({ title, children }: SectionProps) => {
    return (
        <section className="mt-24 border-none shadow-none prose dark:prose-invert">
            <h2>{title}</h2>
            {children}
        </section>
    );
};

export default SectionWithTitleAndChildren;
