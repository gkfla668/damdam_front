/** @type {import('next').NextConfig} */
const API = process.env.NEXT_PUBLIC_API

const path = require('path') // 1. path 선언
const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')], // 2. sassOptions 옵션 추가
	},
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	// next.js proxy
	async rewrites() {
		return [
			{
				source: '/@api/:path*',
				destination: `${API}/:path*`,
			},
		]
	},
	// SVG import setting
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test && rule.test.test('.svg'))
		fileLoaderRule.exclude = /\.svg$/
		config.module.rules.push({
			test: /\.svg$/,
			loader: require.resolve('@svgr/webpack'),
		})
		return config
	},
}

module.exports = nextConfig
