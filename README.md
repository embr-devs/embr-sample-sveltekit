# Embr × SvelteKit sample

A minimal SvelteKit SSR sample for
[Embr](https://github.com/coreai-microsoft/embr), using
[`@sveltejs/adapter-node`](https://svelte.dev/docs/kit/adapter-node) so the app
runs as a long-lived Node server (not a static export, not serverless).

Exercises:

- **Request-time SSR** via `+page.server.ts` `load` with `prerender = false`
- **Client-side hydration** via a Svelte 5 runes `$state` counter
- A dedicated **`/api/health`** route (`+server.ts`) for Embr's health check

Companion samples:

- [Next.js App Router](https://github.com/embr-devs/embr-sample-nextjs-app-router)
- [Next.js Pages Router](https://github.com/embr-devs/embr-sample-nextjs-pages)

## Deploy to Embr

```bash
npm install -g @coreai-microsoft/embr-cli
embr login
embr quickstart deploy <your-user>/embr-sample-sveltekit
```

## `embr.yaml`

```yaml
platform: nodejs
autoDeploy: true
run:
  port: 3000
  startCommand: "npm start"          # package.json → "node build/index.js"
healthCheck:
  enabled: true
  path: "/api/health"                 # must be a backend route, not a page
  expectedStatusCode: 200
```

### Why these choices

- `platform: nodejs` — Oryx auto-detects from `package.json` and picks a Node
  LTS. **Do not set `buildCommand`**: an explicit `buildCommand` bypasses
  Oryx's Node pipeline and breaks `npm install` / `npm run build` wiring on
  Embr today (see embr#670).
- `run.startCommand: "npm start"` — resolves to `node build/index.js`, the
  server emitted by `adapter-node`. The adapter reads `PORT` from env, which
  Embr injects.
- `run.port: 3000` — matches `adapter-node`'s default and the Embr-exposed port.
- `healthCheck.path: "/api/health"` — a frontend `+page.svelte` would always
  return 200 and hide crashes. Use a `+server.ts` route handler.

## What to check after deploy

1. `curl https://<deployment>/` twice — the timestamp + nonce on the homepage
   should change each request (proves SSR is hitting the server on every hit).
2. `curl https://<deployment>/api/health` — `{"status":"ok",…}` with HTTP 200.
3. Open the site in a browser — the "clicked N times" button should increment
   (proves hydration is intact through Embr's reverse proxy).

## Local dev

```bash
npm install
npm run dev
```

## Build + run like production

```bash
npm install
npm run build        # → ./build (adapter-node output)
npm start            # → node build/index.js, listens on $PORT (default 3000)
```

## SvelteKit-on-Embr gotchas

- **Use `adapter-node`, not `adapter-auto`.** `adapter-auto` probes for
  Vercel/Netlify/Cloudflare at install time and falls back to a warning build
  on Embr — you'll ship a container that can't `npm start`.
- **Don't set `buildCommand` in `embr.yaml`.** Let Oryx run `npm ci && npm run
  build` itself from `package.json`. Setting `buildCommand` explicitly today
  bypasses the Node pipeline.
- **Don't `prerender` the SSR route.** SvelteKit will happily prerender a page
  whose `load` has no dynamic input; if you want to prove SSR, set
  `export const prerender = false` on `+page.server.ts` (this sample does).
