import { GoogleAnalytics } from "@next/third-parties/google";

const Analytics = () => {
    return (
        <>
            <GoogleAnalytics
                gaId={process.env.NEXT_PUBLIC_GA_TRACKING_ID as string}
            />
        </>
    );
};

export default Analytics;
