import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async () => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 1; i <= 5; i++) {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({ chunk: i, timestamp: new Date().toISOString() }) + '\n'
          )
        );
        if (i < 5) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'content-type': 'application/x-ndjson',
      'cache-control': 'no-store',
      'x-accel-buffering': 'no'
    }
  });
};
