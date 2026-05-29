/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	trailingSlash: true,
	basePath: process.env.NODE_ENV === "production" ? "/thumap" : "",
	assetPrefix: process.env.NODE_ENV === "production" ? "/thumap/" : "",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;