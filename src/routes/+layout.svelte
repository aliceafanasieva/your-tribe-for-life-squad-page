<script>
  import "$lib/styles/global.css";
  import favicon from "$lib/assets/favicon.svg";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <div class="topbar_inner">
    <p>squadpage</p>
    <p>fdnd</p>
    <p>2025</p>
    <p class="theme">D</p>
  </div>
</header>

<main>
  {@render children()}
</main>

<style>
  header {
    padding: 1rem 4rem;
    font-size: 0.95rem;
    line-height: 1;
  }

  .topbar_inner {
    display: flex;
    justify-items: start;
    justify-content: space-between;
    align-items: center;
  }

  .theme {
    display: inline-flex;
    width: 40px;
    height: 40px;
    line-height: 500px;
    border-radius: 50%;
    font-size: 20px;
    background: #000;
    align-items: center;
    justify-content: center;
    color: #ff95c1;
    line-height: 1;
  }
</style>
