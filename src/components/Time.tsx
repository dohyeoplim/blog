"use client";

import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("ko", {
    relativeTime: {
        future: "%s 후",
        past: "%s 전",
        s: "몇 초",
        m: "1분",
        mm: "%d분",
        h: "1시간",
        hh: "%d시간",
        d: "하루",
        dd: "%d일",
        M: "한 달",
        MM: "%d달",
        y: "1년",
        yy: "%d년",
    },
});

interface TimeProps {
    date: string | number | Date;
}

/**
 * Time Component
 *
 * This component displays the given date as either:
 * - A relative time (e.g., "3분 전") if less than 7 days have passed, or
 * - An absolute date in the "YYYY.MM.DD" format if 7 days or more have passed.
 *
 * @param {TimeProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered time element.
 */
const Time: React.FC<TimeProps> = ({ date }) => {
    const parsedDate = dayjs(date);

    if (!parsedDate.isValid()) {
        return (
            <time className="text-muted-foreground">유효하지 않은 날짜</time>
        );
    }

    const daysDiff = dayjs().diff(parsedDate, "day");
    const formattedTime =
        daysDiff >= 7 ? parsedDate.format("YYYY.MM.DD") : parsedDate.fromNow();

    return (
        <time className="text-muted-foreground text-xs sm:text-sm">
            {formattedTime}
        </time>
    );
};

export default Time;
