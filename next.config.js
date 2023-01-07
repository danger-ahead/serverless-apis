/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/api/wakatime_code_stats',
				headers: [
					{
						key: 'Content-Type',
						value: 'image/svg+xml',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
