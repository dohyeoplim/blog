"use client";
import { useEffect, useRef } from "react";

const ScrollProgress: React.FC = () => {
    // DOM 요소 참조를 위한 ref 생성
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 스크롤 진행률을 업데이트하는 함수
        const updateProgressBar = () => {
            if (!progressBarRef.current) return;

            // 스크롤 가능한 총 높이 계산
            const scrollableHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            if (scrollableHeight <= 0) return;

            // 스크롤 진행률 계산 (0에서 1 사이)
            const scrollFraction = Math.min(
                window.scrollY / scrollableHeight,
                1
            );

            // transform 속성을 사용하여 바 업데이트 (React 상태 사용 없음)
            // scaleX는 DOM 조작과 reflow를 최소화하여 성능 향상
            progressBarRef.current.style.transform = `scaleX(${scrollFraction})`;
        };

        // 초기 업데이트
        updateProgressBar();

        // passive 옵션으로 스크롤 이벤트 리스너 등록
        window.addEventListener("scroll", updateProgressBar, { passive: true });
        window.addEventListener("resize", updateProgressBar, { passive: true });

        return () => {
            window.removeEventListener("scroll", updateProgressBar);
            window.removeEventListener("resize", updateProgressBar);
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-muted dark:bg-muted"
            aria-hidden="true"
        >
            <div
                ref={progressBarRef}
                className="h-full w-full bg-primary dark:bg-primary origin-left"
                style={{
                    transform: "scaleX(0)",
                    willChange: "transform",
                    transition: "transform 50ms ease-out",
                }}
            />
        </div>
    );
};

export default ScrollProgress;
