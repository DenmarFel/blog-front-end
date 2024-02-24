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
