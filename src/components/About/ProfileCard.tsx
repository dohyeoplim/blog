/**
 * ProfileCard component.
 * Arranges a profile image alongside children content.
 * The layout reverses if the `reverse` prop is true.
 *
 * @param {string} [imageSrc] - The URL of the profile image.
 * @param {boolean} [reverse=false] - If true, displays children on the left and image on the right.
 * @param {React.ReactNode} children - The content to display alongside the profile image.
 */

import Image from "next/image";

export interface ProfileCardProps {
    imageSrc?: string;
    reverse?: boolean;
    children: React.ReactNode;
}

const ProfileCard = ({
    imageSrc,
    reverse = false,
    children,
}: ProfileCardProps) => {
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
