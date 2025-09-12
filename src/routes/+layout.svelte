<script>
  import "$lib/styles/global.css";
  import favicon from "$lib/assets/favicon.svg";
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<slot />
