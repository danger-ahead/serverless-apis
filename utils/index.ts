export type { NextApiRequest, NextApiResponse } from 'next';
export { runMiddleware } from './cors';
export type { RespError } from '../models/Errors';
export const github = 'https://api.github.com/';
export const wakatime = 'https://wakatime.com/api/v1/';
export { generateSVG } from '../utils/svg_gen';
