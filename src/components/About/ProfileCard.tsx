import Image from "next/image";

export interface ProfileCardProps {
    imageSrc?: string;
    reverse?: boolean;
    children: React.ReactNode;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    imageSrc,
    reverse = false,
    children,
}) => {
    return (
        <div className="w-full flex flex-row items-center gap-4 sm:gap-6">
            {reverse ? (
                <>
                    <div className="w-2/3">{children}</div>
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
                </>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default ProfileCard;
