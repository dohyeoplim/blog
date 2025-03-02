import Image from "next/image";

/**
 * ImageData: 단일 이미지에 대한 데이터를 표현한다.
 * @property src - 이미지 URL.
 * @property alt - 대체 텍스트.
 * @property width - 이미지의 너비.
 * @property height - 이미지의 높이.
 */
interface ImageData {
    src: string;
    alt: string;
    width: number;
    height: number;
}

/**
 * ImageCollageProps: 이미지 콜라주에 대한 데이터를 표현한다.
 * @property leftImage - 왼쪽 이미지 데이터.
 * @property rightImage - 오른쪽 이미지 데이터.
 */
interface ImageCollageProps {
    leftImage: ImageData;
    rightImage: ImageData;
}

/**
 * SingleImageProps: 단일 이미지에 대해 선택적으로 페이지 너비의 몇 %를 차지할지 설정하는 prop을 포함한다.
 * @property widthPercent - 이미지 컨테이너가 차지할 페이지 너비의 백분율.
 */
interface SingleImageProps extends ImageData {
    widthPercent?: number;
}

/**
 * ImageProps: 단일 이미지(SingleImageProps) 또는 이미지 콜라주(ImageCollageProps)를 나타낸다.
 */
type ImageProps = SingleImageProps | ImageCollageProps;

/**
 * MDXImage: MDX 컨텐츠 내에서 단일 이미지 또는 이미지 콜라주를 렌더링한다.
 * 두 이미지(leftImage, rightImage)가 제공되면 사이드바이사이드 콜라주로 렌더링하고,
 * 그렇지 않으면 단일 이미지를 렌더링한다.
 *
 * 단일 이미지의 경우, 선택적으로 widthPercent prop을 통해 이미지 컨테이너의 너비를 조절할 수 있다.
 *
 * @param props - SingleImageProps 또는 ImageCollageProps.
 * @returns 렌더링된 이미지 요소.
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
        // 단일 이미지의 경우, 선택적으로 widthPercent에 따른 컨테이너 너비를 적용한다.
        const containerWidth =
            "widthPercent" in props && props.widthPercent
                ? `${props.widthPercent}%`
                : "100%";
        return (
            <div style={{ position: "relative", width: containerWidth }}>
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
