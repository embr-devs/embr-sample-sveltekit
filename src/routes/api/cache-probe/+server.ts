import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, s-maxage=60, stale-while-revalidate=300'
  });
  return json({
    timestamp: new Date().toISOString(),
    generatedAtMs: Date.now()
  });
};
