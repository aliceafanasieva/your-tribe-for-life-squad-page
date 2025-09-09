<script>
  import SortBar from "$lib/components/SortBar.svelte";
  import FilterBar from "$lib/components/FilterBar.svelte";

  let { data } = $props();
  const members = data.members;

  let sort = $state("default");
  let filter = $state("all");

  const filteredMembers = $derived.by(() => {
    if (filter === "teachers") {
      return members.filter(
        (member) =>
          member.role.includes("co_teacher") ||
          member.role.includes("squad_leader")
      );
    }
    if (filter === "students") {
      return members.filter(
        (member) =>
          member.role.includes("member") &&
          !member.role.includes("co_teacher") &&
          !member.role.includes("squad_leader")
      );
    }
    return members;
  });

  const sortedMembers = $derived.by(() => {
    if (sort === "name") {
      return [...filteredMembers].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "", "nl", {
          sensitivity: "base",
        })
      );
    }
    if (sort === "age") {
      const t = (d) => (d ? new Date(d).getTime() : Infinity);
      return [...filteredMembers].sort(
        (a, b) => t(a.birthdate) - t(b.birthdate)
      );
    }
    return filteredMembers;
  });
</script>

<SortBar on:sort={(e) => (sort = e.detail.sortValue)} />
<FilterBar on:filter={(e) => (filter = e.detail.filterValue)} />

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
