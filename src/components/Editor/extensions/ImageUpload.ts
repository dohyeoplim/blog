import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";
import { handleImageUpload } from "@/lib/blog-utils";

export const ImageUpload = Extension.create({
    name: "dragImageUpload",

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDrop(view, event, _slice, moved) {
                        const hasFiles = event.dataTransfer?.files?.length;

                        if (!hasFiles) return false;

                        const images = Array.from(
                            event.dataTransfer!.files
                        ).filter((file) => /image/i.test(file.type));

                        if (images.length === 0) return false;

                        event.preventDefault();

                        const { schema, tr } = view.state;
                        const coordinates = view.posAtCoords({
                            left: event.clientX,
                            top: event.clientY,
                        });

                        if (!coordinates) return false;

                        images.forEach(async (image) => {
                            try {
                                const url = await handleImageUpload(image);
                                const imageNode = schema.nodes.image.create({
                                    src: url,
                                });

                                const transaction = tr.insert(
                                    coordinates.pos,
                                    imageNode
                                );
                                view.dispatch(transaction);
                            } catch (err) {
                                console.error("Image upload failed:", err);
                            }
                        });

                        return true;
                    },
                },
            }),
        ];
    },
});
