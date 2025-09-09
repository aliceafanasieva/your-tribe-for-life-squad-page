<script>
  let { data } = $props();

  const members = data.members;
</script>

<h1>Squadpage</h1>
<h2>2025-2026</h2>

{#each members as member}
  <div>
    <a href={member.id}>{member.name}</a>
    {#if member.mugshot}
      <img
        src={"https://fdnd.directus.app/assets/" + member.mugshot}
        alt={member.name}
        width="100"
      />
    {/if}
  </div>
{/each}

<style>
  a {
    border: none;
    text-decoration: none;
  }
</style>
