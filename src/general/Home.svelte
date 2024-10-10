<script lang="ts">
  import { onMount } from 'svelte';
  let helloWorldMessage = '';
  onMount(async () => {
    const response = await fetch('http://localhost:3000/health_check');
    const data = await response.json();
    helloWorldMessage = data['data'];
  });
</script>

<main>
    <h1>Denmar Feliciano</h1>
    <p>Software Engineer at Amazon</p>
    <p>Bachelors in Computer Science from University of California, Irvine</p>
    <p>What is the meaning of life? {helloWorldMessage}</p>
</main>
