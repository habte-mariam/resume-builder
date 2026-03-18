/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // build በሚደረግበት ጊዜ የ ESLint ስህተት ቢኖርም እንዲያልፍ ያደርገዋል
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
