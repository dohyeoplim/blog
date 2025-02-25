/**
 * PreviewList: Renders a list of preview items.
 * @param metaList - Array of preview metadata.
 */
import PreviewListItem, { PreviewMeta } from "./PreviewListItem";

export interface PreviewListProps {
    metaList: PreviewMeta[];
}

const PreviewList = ({ metaList }: PreviewListProps) => (
    <section className="space-y-12">
        {metaList.map((meta) => (
            <PreviewListItem key={meta.id} meta={meta} />
        ))}
    </section>
);

export default PreviewList;
