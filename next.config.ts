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
            {
                protocol: "https",
                hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "s3.us-west-2.amazonaws.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: false,
        contentSecurityPolicy: "default-src 'self'",
    },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
