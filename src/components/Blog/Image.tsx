import Image from "next/image";

/**
 * ImageData: Represents data for a single image.
 * @property src - The image URL.
 * @property alt - The alternate text.
 * @property width - The width of the image.
 * @property height - The height of the image.
 */
interface ImageData {
    src: string;
    alt: string;
    width: number;
    height: number;
}

/**
 * ImageCollageProps: Represents props for an image collage.
 * @property leftImage - Data for the left image.
 * @property rightImage - Data for the right image.
 */
interface ImageCollageProps {
    leftImage: ImageData;
    rightImage: ImageData;
}

type ImageProps = ImageData | ImageCollageProps;

/**
 * MDXImage: Renders an image or an image collage in MDX content.
 * If both leftImage and rightImage are provided, renders a side-by-side collage;
 * otherwise, renders a single image.
 *
 * @param props - Either ImageData or ImageCollageProps.
 * @returns The rendered image element.
 */
const MDXImage = (props: ImageProps) => {
    if ("leftImage" in props && "rightImage" in props) {
        return (
            <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%", position: "relative" }}>
                    <Image
                        src={props.leftImage.src}
                        alt={props.leftImage.alt}
                        width={props.leftImage.width}
                        height={props.leftImage.height}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
                    />
                </div>
                <div style={{ width: "50%", position: "relative" }}>
                    <Image
                        src={props.rightImage.src}
                        alt={props.rightImage.alt}
                        width={props.rightImage.width}
                        height={props.rightImage.height}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ position: "relative", width: "100%" }}>
                <Image
                    src={props.src}
                    alt={props.alt}
                    width={props.width}
                    height={props.height}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
                />
            </div>
        );
    }
};

export default MDXImage;
