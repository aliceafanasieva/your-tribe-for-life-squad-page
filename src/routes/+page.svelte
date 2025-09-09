<script>
  let { data } = $props();
  const members = data.members;

  let sort = $state("default");

  function toggleSort(kind) {
    sort = sort === kind ? "default" : kind;
  }

  const sortedMembers = $derived.by(() => {
    if (sort === "name") {
      return [...members].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "", "nl", {
          sensitivity: "base",
        })
      );
    }
    if (sort === "age") {
      return [...members].sort((a, b) => {
        const da = a.birthdate ? new Date(a.birthdate).getTime() : Infinity;
        const db = b.birthdate ? new Date(b.birthdate).getTime() : Infinity;
        return da - db;
      });
    }
    return members;
  });
</script>

<div class="sortbar">
  <span>sort:</span>
  <button class:selected={sort === "name"} on:click={() => toggleSort("name")}
    >A–Z</button
  >
</div>

<h1>Squadpage</h1>
<h2>2025-2026</h2>

{#each sortedMembers as member}
  <div>
    {#if member.mugshot}
      <img
        src={"https://fdnd.directus.app/assets/" +
          member.mugshot +
          "?width=300&height=300&fit=cover"}
        alt={member.name}
      />
    {/if}
    <a href={member.id}>{member.name}</a>
  </div>
{/each}

<style>
  a {
    border: none;
    text-decoration: none;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
  }
</style>
