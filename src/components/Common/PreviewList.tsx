import PreviewListItem, { PreviewMeta } from "./PreviewListItem";

export interface PreviewListProps {
    metaList: PreviewMeta[];
}

const PreviewList = ({ metaList }: PreviewListProps) => {
    return (
        <section className="space-y-12">
            {metaList.map((meta) => (
                <PreviewListItem key={meta.id} meta={meta} />
            ))}
        </section>
    );
};

export default PreviewList;
