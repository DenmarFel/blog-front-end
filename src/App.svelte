<script>
import Router from 'svelte-spa-router';
import {location} from 'svelte-spa-router';
import Home from './general/Home.svelte';
import Wedding from './wedding/Wedding.svelte';
import Photos from './wedding/Photos.svelte';
import Registry from './wedding/Registry.svelte';
import FAQ from './wedding/FAQ.svelte';
import RSVP from './wedding/RSVP.svelte';

const routes = {
  '/': Home,
  '/wedding': Wedding,
  '/wedding/photos': Photos,
  '/wedding/registry': Registry,
  '/wedding/FAQ': FAQ,
  '/wedding/RSVP': RSVP
}
</script>

<nav>
  {#if $location === '/'}
  <a href="#/">Home</a>
  <a href="#/wedding">Wedding</a>
  {/if}

  {#if $location.startsWith('/wedding') }
  <a href="#/wedding">Wedding</a>
  <a href="#/wedding/photos">Photos</a>
  <a href="#/wedding/registry">Registry</a>
  <a href="#/wedding/FAQ">FAQ</a>
  {/if}
</nav>

<main>
  <Router {routes} />
</main>

<style>
  nav a {
    margin-right: 10px;
  }
</style>
