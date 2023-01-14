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
			{
				source: '/api/gh_repo',
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{
						key: 'Access-Control-Allow-Origin',
						value: `${process.env.NEXT_PUBLIC_GH_REPO_ALLOW_ORIGIN}`,
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value:
							'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
