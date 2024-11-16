<script>
import Router from 'svelte-spa-router';
import {location} from 'svelte-spa-router';
import Home from './general/Home.svelte';
import Wedding from './wedding/Wedding.svelte';
import Photos from './wedding/Photos.svelte';
import Registry from './wedding/Registry.svelte';
import FAQ from './wedding/FAQ.svelte';
import RSVP from './wedding/RSVP.svelte';
import StyleGuide from './wedding/StyleGuide.svelte';
import threeJsHome from './threeJsJourney/threeJsHome.svelte';
import chapter3 from './threeJsJourney/chapter3.svelte';
import chapter4 from './threeJsJourney/chapter4.svelte';
import chapter5 from './threeJsJourney/chapter5.svelte';
import chapter6 from './threeJsJourney/chapter6.svelte';
import chapter7 from './threeJsJourney/chapter7.svelte';
import chapter8 from './threeJsJourney/chapter8.svelte';
import chapter9 from './threeJsJourney/chapter9.svelte';
import chapter10 from './threeJsJourney/chapter10.svelte';
import chapter11 from './threeJsJourney/chapter11.svelte';

const routes = {
  '/': Home,
  '/threeJsJourney': threeJsHome,
  '/threeJsJourney/chapter3': chapter3,
  '/threeJsJourney/chapter4': chapter4,
  '/threeJsJourney/chapter5': chapter5,
  '/threeJsJourney/chapter6': chapter6,
  '/threeJsJourney/chapter7': chapter7,
  '/threeJsJourney/chapter8': chapter8,
  '/threeJsJourney/chapter9': chapter9,
  '/threeJsJourney/chapter10': chapter10,
  '/threeJsJourney/chapter11': chapter11,
  '/wedding': Wedding,
  '/wedding/photos': Photos,
  '/wedding/registry': Registry,
  '/wedding/FAQ': FAQ,
  '/wedding/RSVP': RSVP,
  '/wedding/style-guide': StyleGuide
}
</script>

<nav>
  {#if $location === '/'}
  <a href="#/">Home</a>
  <a href="#/threeJsJourney">threeJS Journey</a>
  <a href="#/wedding">Wedding</a>
  {/if}

  {#if $location.startsWith('/threeJsJourney')}
  <a href="#/">Home</a>
  <a href="#/threeJsJourney">threeJS Journey</a>
  {/if}

  {#if $location.startsWith('/wedding') }
  <a href="#/wedding">Wedding</a>
  <a href="#/wedding/photos">Photos</a>
  <a href="#/wedding/registry">Registry</a>
  <a href="#/wedding/FAQ">FAQ</a>
  <a href="#/wedding/style-guide">Style Guide</a>
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
