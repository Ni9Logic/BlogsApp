/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '', // Optional: Specify a port if needed
                pathname: '/**', // This allows all paths from this hostname
            },
        ],
    },
};

export default nextConfig;
