/* needs github personal access token in .env with appropriate scopes */

import {
	NextApiRequest,
	NextApiResponse,
	runMiddleware,
	RespError,
	github,
} from '../../utils/index';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<RespError>
) {
	try {
		await runMiddleware(req, res);
	} catch (e) {
		return res.status(405).json({ error: `${e}` });
	}

	const requestHeaders: HeadersInit = new Headers();
	requestHeaders.set('Content-Type', 'application/json');
	requestHeaders.set('Authorization', `Bearer ${process.env.GH_PAT}`);

	const result = await fetch(
		`${github}repos/${req.body.owner}/${req.body.repo}`,
		{
			method: 'GET',
			headers: requestHeaders,
		}
	);

	const data = await result.json();

	const responseData = {
		name: data['name'],
		description: data['description'],
		star_gazers: data['stargazers_count'],
		forks: data['forks'],
		forks_count: data['forks_count'],
		html_url: data['html_url'],
		homepage: data['homepage'],
		language: data['language'],
		open_issues: data['open_issues'],
	};

	return res
		.status(result.status)
		.json(JSON.parse(JSON.stringify(responseData)));
}
