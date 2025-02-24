import Image from "next/image";

interface ProfileCardProps {
    imageSrc?: string;
    reverse?: boolean;
    vAlign?: "top" | "center" | "bottom";
    children: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    imageSrc,
    reverse = false,
    vAlign = "bottom",
    children,
}) => {
    return (
        <div
            className={`w-full flex ${
                reverse ? "flex-row-reverse" : "flex-row space-x-4 sm:space-x-6"
            } ${
                vAlign === "top"
                    ? "items-start"
                    : vAlign === "center"
                    ? "items-center"
                    : "items-end"
            }`}
        >
            <div className="w-1/3">
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt="Profile Image"
                        width={1086}
                        height={1086}
                        className="rounded-sm object-cover m-0"
                    />
                )}
            </div>

            <div className="w-2/3">{children}</div>
        </div>
    );
};

export default ProfileCard;
