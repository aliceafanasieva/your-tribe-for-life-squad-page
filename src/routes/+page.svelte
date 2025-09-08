<script>
  let { data } = $props();

  const members = data.members;

  
</script>

<h1>Welcome to Sqaudpage</h1>

{#each members as member}
  <a href={member.id}>{member.name}</a>
  
{/each}

<style>
  a {
    border: 2px solid plum;
  }
</style>
