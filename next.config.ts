import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

    experimental: {
        mdxRs: true,
    },

    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "onnxruntime-node$": false,
        };
        return config;
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.notion.so",
                port: "",
                pathname: "/images/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
