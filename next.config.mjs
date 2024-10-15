/** @type {import('next').NextConfig} */
const nextConfig = {
    env: { BACKEND_API_URI: process.env.BACKEND_API_URI },
};

export default nextConfig;
