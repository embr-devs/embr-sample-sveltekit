<script lang="ts">
  import Counter from '$lib/Counter.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<main>
  <h1>Embr × SvelteKit</h1>
  <p>
    Minimal SvelteKit SSR sample running on <a href="https://github.com/coreai-microsoft/embr">Embr</a>
    via <code>@sveltejs/adapter-node</code>.
  </p>

  <section>
    <h2>Server-rendered payload</h2>
    <p>
      This block is rendered on every request from <code>+page.server.ts</code>.
      Refresh and the values change — that proves the request hit the Node server,
      not a static cache.
    </p>
    <dl>
      <dt>Timestamp</dt>
      <dd data-testid="timestamp">{data.timestamp}</dd>
      <dt>Nonce</dt>
      <dd data-testid="nonce">{data.nonce}</dd>
      <dt>Process uptime (s)</dt>
      <dd>{data.uptimeSeconds}</dd>
    </dl>
  </section>

  <section>
    <h2>Client hydration canary</h2>
    <p>
      The counter below is a Svelte 5 runes component. If hydration works, the
      button increments; if SSR returned but JS never loaded, you'll see "0" and
      clicks will do nothing.
    </p>
    <Counter />
  </section>

  <section>
    <h2>Health</h2>
    <p>
      Embr probes <a href="/api/health"><code>/api/health</code></a> every minute.
    </p>
  </section>
</main>

<style>
  :global(body) {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    max-width: 44rem;
    margin: 2rem auto;
    padding: 0 1rem;
    line-height: 1.5;
    color: #111;
  }
  dl {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0.25rem 1rem;
  }
  dt {
    font-weight: 600;
  }
  dd {
    margin: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  section {
    margin-top: 2rem;
  }
</style>
