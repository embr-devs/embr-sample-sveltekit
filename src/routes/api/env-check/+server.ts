import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async () => {
  return json({
    probe: env.EMBR_SAMPLE_ENV_PROBE ?? null,
    nodeEnv: env.NODE_ENV ?? null,
    port: env.PORT ?? null
  });
};
