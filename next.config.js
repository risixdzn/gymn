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
};

const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
    dest: "public",
    disable: !isProd,
});

module.exports = withPWA(nextConfig);
