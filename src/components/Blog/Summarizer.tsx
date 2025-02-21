"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FlaskConical } from "lucide-react";

interface SummarizerProps {
    text: string;
}

const Summarizer = ({ text }: SummarizerProps) => {
    const [summary, setSummary] = useState("");
    const [progressMsg, setProgressMsg] = useState("");
    const [progressValue, setProgressValue] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            workerRef.current = new Worker(
                new URL("./summarization.worker.js", import.meta.url)
            );

            workerRef.current.onmessage = (e: MessageEvent) => {
                const data = e.data;
                if (!data) return;

                const { status, output, message } = data;

                if (status === "progress") {
                    setProgressMsg(message || "");
                    const match = message.match(/(\d+)%/);
                    if (match) {
                        setProgressValue(Number(match[1]));
                    } else {
                        setProgressValue(null);
                    }
                } else if (status === "complete") {
                    if (output && Array.isArray(output)) {
                        setSummary(output[0]?.summary_text || "실패~ 🥲");
                    }
                    setIsLoading(false);
                    setProgressMsg("");
                    setProgressValue(null);
                } else if (status === "error") {
                    setError(message);
                    setIsLoading(false);
                    setProgressMsg("");
                    setProgressValue(null);
                }
            };
        }

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const handleSummarize = () => {
        if (!text) {
            setError("텍스트를 읽을 수 없어요 🥲");
            return;
        }
        if (!workerRef.current) {
            setError("이 브라우저에서는 지원하지 않는 것 같아요🥲");
            return;
        }

        setIsLoading(true);
        setSummary("");
        setError(null);
        setProgressMsg("모델을 다운받고 있어요 🕢");

        workerRef.current.postMessage({ text: text });
    };

    return (
        <div className="p-4 mb-6 rounded-md bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">글 요약하기</h2>

                <div className="flex items-center justify-center text-xs rounded-full py-1 px-3 bg-slate-800 text-white dark:bg-gray-700">
                    <FlaskConical size={9.5} />
                    <span className="ml-[2px]">Beta</span>
                </div>
            </div>

            {progressMsg && (
                <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>{progressMsg}</p>
                    {progressValue !== null && (
                        <progress
                            className="w-full mt-1"
                            value={progressValue}
                            max={100}
                        />
                    )}
                </div>
            )}

            {error && <p className="text-sm mb-2 text-red-500">{error}</p>}

            {summary && (
                <p className="text-sm mb-2 whitespace-pre-line">{summary}</p>
            )}

            {!summary && !isLoading && !progressMsg && !error && (
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
                    KoBART 모델을 사용하여 글을 요약해보세요.
                </p>
            )}

            <Button
                onClick={handleSummarize}
                disabled={isLoading}
                variant={"outline"}
            >
                {isLoading ? "요약 중..." : "시작"}
            </Button>
        </div>
    );
};

export default Summarizer;
