import { randomBytes } from 'node:crypto';
import type { PageServerLoad } from './$types';

export const prerender = false;
export const ssr = true;

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({ 'cache-control': 'no-store' });
  return {
    timestamp: new Date().toISOString(),
    nonce: randomBytes(8).toString('hex'),
    uptimeSeconds: Math.round(process.uptime())
  };
};
