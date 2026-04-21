<script lang="ts">
  let count = $state(0);
</script>

<button onclick={() => count++} data-testid="counter">
  clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
  button {
    font: inherit;
    padding: 0.5rem 1rem;
    border: 1px solid #111;
    background: #fff;
    cursor: pointer;
    border-radius: 0.375rem;
  }
  button:hover {
    background: #f3f3f3;
  }
</style>
