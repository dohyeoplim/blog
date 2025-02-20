import Image from "next/image";

interface ImageData {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface ImageCollageProps {
    leftImage: ImageData;
    rightImage: ImageData;
}

type ImageProps = ImageData | ImageCollageProps;

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
