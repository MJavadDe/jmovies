/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "daisyui.com",
                pathname:"/images/**",
            }
        ]
    }
};

export default nextConfig;
