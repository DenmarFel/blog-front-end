<<<<<<< HEAD
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
=======
<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Settings from "./routes/Settings.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/settings">Settings</Link>
  </nav>
  <div>
    <Route path="/settings" component={Settings} />
    <Route path="/"><Home /></Route>
  </div>
</Router>
>>>>>>> b557d30772ab9254e019d9128c90718b3dff2321
