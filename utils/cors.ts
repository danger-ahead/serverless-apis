import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from '../utils/index';

const whiteList = ['https://www.nextjsdevfolio.vercel.app'];

if (process.env.NEXT_APP_ENV) {
	whiteList.push('http://localhost:3000');
}

function checkOrigin(origin: any) {
	if (process.env.NEXT_APP_ENV) {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			return true;
		}
	} else {
		if (whiteList.indexOf(origin) !== -1) {
			return true;
		}
	}
}

const cors = Cors({
	methods: ['GET'],
	origin: function (origin: any, callback) {
		if (checkOrigin(origin)) {
			callback(null, true);
		} else {
			callback(Error('request not allowed / authorised'), false);
		}
	},
});

export function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
	return new Promise((resolve, reject) => {
		cors(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result.message);
			}

			return resolve(result);
		});
	});
}
