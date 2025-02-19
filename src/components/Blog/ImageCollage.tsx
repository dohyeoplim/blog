interface ImageData {
    src: string;
    alt: string;
}

interface ImageCollageProps {
    leftImage: ImageData;
    rightImage: ImageData;
}

const Collage = ({ leftImage, rightImage }: ImageCollageProps) => {
    return (
        <div style={{ display: "flex", width: "100%" }}>
            <img
                src={leftImage.src}
                alt={leftImage.alt}
                style={{ width: "50%", height: "auto", objectFit: "contain" }}
            />
            <img
                src={rightImage.src}
                alt={rightImage.alt}
                style={{ width: "50%", height: "auto", objectFit: "contain" }}
            />
        </div>
    );
};

export default Collage;
