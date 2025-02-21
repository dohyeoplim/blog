import { getPublishedPages } from "@/lib/notion/notion-integration";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Header from "@/components/Header";

const PublishedNotionPages = async () => {
    const { results: pages } = await getPublishedPages();

    return (
        <>
            <Header title="✏️ 공부" />

            <div className="grid gap-8 md:grid-cols-2">
                {pages.map((page) => (
                    <article
                        key={page.id}
                        className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <Link href={`/n/${page.id}`}>
                            <div className="relative h-48">
                                {page.cover && (
                                    <Image
                                        src={page.cover}
                                        alt={page.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                )}
                            </div>

                            <div className="p-6">
                                <time className="text-sm text-gray-500">
                                    {new Date(
                                        page.publishedDate
                                    ).toLocaleDateString()}
                                </time>
                                <h2 className="text-2xl font-semibold mt-2 mb-3">
                                    {page.title}
                                </h2>
                                {page.excerpt && (
                                    <p className="text-gray-600 line-clamp-3">
                                        {page.excerpt}
                                    </p>
                                )}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
};

export default PublishedNotionPages;
