<script>
  import Router from 'svelte-spa-router';
  import Home from './Home.svelte';
  import Countdown from './Countdown.svelte';
  import Photos from './Photos.svelte';
  import Registry from './Registry.svelte';

  const routes = {
    '/': Home,
    '/countdown': Countdown,
    '/photos': Photos,
    '/registry': Registry,
  }
</script>

<main>
  <nav>
    <a href="#/">Home</a>
    <a href="#/countdown">Countdown</a>
    <a href="#/photos">Photos</a>
    <a href="#/registry">Registry</a>
  </nav>

  <Router {routes} />
</main>

<style>
  nav a {
    margin-right: 10px;
  }
</style>
