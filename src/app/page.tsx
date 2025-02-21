// TODO - Metadata

import Header from "@/components/Header";
import PreviewList from "@/components/Blog/PreviewList";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";

const Home = () => {
    return (
        <>
            <Header />

            <Link href="/n">
                <div className="w-full p-4 mb-10 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                    <h2 className="text-lg font-semibold">✏️ 공부 기록</h2>
                    <div className="w-full flex items-center justify-between">
                        <p className="text-sm text-secondary-foreground mt-2">
                            재밌는 거도 많아요
                        </p>
                        <ArrowRight size={16} />
                    </div>
                </div>
            </Link>

            <PreviewList />
        </>
    );
};

export default Home;
