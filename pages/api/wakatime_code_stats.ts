/* needs wakatime secret api key in .env in base64 encoded format */

import {
	NextApiRequest,
	NextApiResponse,
	wakatime,
	generateSVG,
} from '../../utils/index';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const result = new Map<String, String>();

	const fetchAllTimeBestDay = async () => {
		const res = await fetch(
			`${wakatime}users/current/insights/best_day/all_time`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: `Basic ${process.env.WAKATIME_API_KEY}`,
				},
			}
		);
		const json = await res.json();
		result.set('best_day', json['data']['best_day']['text']);
	};

	const fetchDailyAverageAndTotalTime = async () => {
		const res = await fetch(
			`${wakatime}users/current/insights/daily_average/all_time`,
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
		result.set('start_date', json['data']['human_readable_range'].substring(5));
	};

	await Promise.all([fetchDailyAverageAndTotalTime(), fetchAllTimeBestDay()]);

	const svg = generateSVG(result);

	return res.status(200).send(svg);
}
