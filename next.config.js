/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bkeiikprhrwohskvmxkd.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/avatars/*",
            },
        ],
    },
    // Configure `pageExtensions`` to include MDX files
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    // Optionally, add any other Next.js config below
};

const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
    dest: "public",
    disable: !isProd,
});

const withMDX = require("@next/mdx")();

module.exports = withPWA(withMDX(nextConfig));
