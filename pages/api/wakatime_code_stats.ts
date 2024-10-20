/* needs wakatime secret api key in .env in base64 encoded format */

import {
	NextApiRequest,
	NextApiResponse,
	wakatime,
	generateSVG,
} from '../../utils/index';

// In-memory cache
let cache = {
	data: null as Map<String, String> | null,
	timestamp: 0,
};

// 24 hours
const CACHE_DURATION = 86400 * 1000;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { background_color, header_color, value_color, border_color } =
		req.query;

	const now = Date.now();
	if (cache.data && now - cache.timestamp < CACHE_DURATION) {
		const svg = generateSVG({
			data: cache.data,
			background_color,
			header_color,
			value_color,
			border_color,
		});
		return res.status(200).send(svg);
	}

	const result = new Map<String, String>();

	const fetchMostUsedLanguage = async () => {
		const res = await fetch(
			`${wakatime}users/current/insights/languages/last_year`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Basic ${process.env.WAKATIME_API_KEY}`,
				},
			}
		);
		const json = await res.json();
		result.set('most_used_language', json['data']['languages'][0]['name']);
		result.set(
			'most_used_language_time',
			json['data']['languages'][0]['total_seconds']
		);
	};

	const fetchDailyAverageAndTotalTime = async () => {
		const res = await fetch(
			`${wakatime}users/current/insights/daily_average/last_year`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Basic ${process.env.WAKATIME_API_KEY}`,
				},
			}
		);
		const json = await res.json();
		result.set(
			'daily_average',
			json['data']['current_user']['daily_average']['text']
		);
		result.set('total_time', json['data']['current_user']['total']['text']);
	};

	await Promise.all([fetchDailyAverageAndTotalTime(), fetchMostUsedLanguage()]);

	cache.data = result;
	cache.timestamp = now;

	const svg = generateSVG({
		data: result,
		background_color,
		header_color,
		value_color,
		border_color,
	});

	return res.status(200).send(svg);
}
