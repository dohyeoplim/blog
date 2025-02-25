import ProfileCard from "@/components/About/ProfileCard";
import Header from "@/components/Header";
import ProjectCard from "@/components/About/ProjectCard";
import ProfileGeneralData from "@/components/About/ProfileGeneralData";
import SocialLinks from "@/components/About/SocialLinks";
import Slogan from "@/components/About/Slogan";
import Section from "@/components/Common/SectionWithTitleAndChildren";
import {
    profileContent,
    sloganContent,
    projectsContent,
    experiencesContent,
    educationContent,
} from "@/myInfo";

const AboutMe = () => {
    return (
        <>
            <Header title="👋 About Me" />
            <main>
                <ProfileCard imageSrc={profileContent.imageSrc}>
                    <div className="flex flex-col space-y-2">
                        <div>
                            <p className="md:text-2xl text-xl font-bold">
                                {profileContent.name}
                            </p>
                            <p className="text-base md:text-lg text-secondary-foreground">
                                {profileContent.englishName}
                            </p>
                        </div>
                        <div>
                            <p className="md:text-base text-sm font-medium">
                                {profileContent.organization}
                            </p>
                            <p className="md:text-sm text-xs font-light text-secondary-foreground">
                                {profileContent.role}
                            </p>
                        </div>
                        <SocialLinks links={profileContent.socialLinks} />
                    </div>
                </ProfileCard>

                <Slogan texts={sloganContent} />

                <Section title="Projects">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projectsContent.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                </Section>

                <Section title="Experiences">
                    {experiencesContent.map((exp, index) => (
                        <ProfileCard
                            key={index}
                            imageSrc={exp.imageSrc}
                            reverse={exp.reverse}
                        >
                            <ProfileGeneralData {...exp.data} />
                        </ProfileCard>
                    ))}
                </Section>

                <Section title="Education">
                    <ProfileGeneralData {...educationContent} />
                </Section>
            </main>
        </>
    );
};

export default AboutMe;
