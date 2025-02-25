import { getPublishedPages } from "@/lib/notion/notion-integration";
import { Link } from "next-view-transitions";
import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostMetaInfo from "@/components/Common/PostMetaInfo";

export const revalidate = 60;

const PublishedNotionPages = async () => {
    const { results: pages } = await getPublishedPages();
    return (
        <>
            <Header />
            <section className="space-y-12">
                {pages.map((page) => (
                    <article
                        key={page.id}
                        role="article"
                        className="list-none flex flex-col space-y-2"
                    >
                        <div className="flex flex-col items-start justify-start space-y-2">
                            <header>
                                <Link href={`/n/${page.id}`}>
                                    <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                                        {page.title}
                                    </h2>
                                </Link>
                            </header>

                            {page.excerpt && (
                                <p className="text-sm text-secondary-foreground">
                                    {page.excerpt}
                                </p>
                            )}
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <PostMetaInfo
                                date={page.publishedDate}
                                tags={page.tags}
                                badgeClassName="text-xs"
                                containerClassName=""
                            />
                            <Link href={`/n/${page.id}`}>
                                <Button variant="ghost">
                                    <ArrowRight />
                                </Button>
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </>
    );
};

export default PublishedNotionPages;
