// TODO - Metadata

import Header from "@/components/Header";
import PreviewList from "@/components/Blog/PreviewList";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";

const Home = () => {
    return (
        <>
            <Header />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
                <Link href="/about">
                    <div className="w-full p-4 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                        <h2 className="text-lg font-semibold">👋 About Me</h2>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm text-secondary-foreground mt-2">
                                제가 누군나면요..
                            </p>
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </Link>

                <Link href="/n">
                    <div className="w-full p-4 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                        <h2 className="text-lg font-semibold">
                            ✏️ 공부 기록 보기
                        </h2>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm text-secondary-foreground mt-2">
                                재밌는 것도 많아요
                            </p>
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </Link>
            </div>

            <h2 className="text-lg font-semibold mb-4 pl-4">최근 블로그 글</h2>

            <PreviewList />
        </>
    );
};

export default Home;
