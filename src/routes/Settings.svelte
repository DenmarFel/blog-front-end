<script>
  import { onMount } from 'svelte';
  let status = '';
  onMount(async () => {
    const response = await fetch('http://localhost:3000/health_check');
    const data = await response.json();
    status = data['data'];
  });
</script>

<main>
  <p>REST API Status: {status}</p>
</main>