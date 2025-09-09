<script>
  let { data } = $props();
  const members = data.members;

  let sort = $state("default");
  let filter = $state("all");

  function toggleSort(kind) {
    sort = sort === kind ? "default" : kind;
  }

  function toggleFilter(kind) {
    filter = filter === kind ? "all" : kind;
  }

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

<div class="sortbar">
  <span>sort:</span>
  <button class:selected={sort === "name"} on:click={() => toggleSort("name")}
    >A–Z</button
  >
  <button class:selected={sort === "age"} on:click={() => toggleSort("age")}
    >age</button
  >

  <span>filter:</span>
  <button
    class:selected={filter === "teachers"}
    on:click={() => toggleFilter("teachers")}>teachers</button
  >
  <button
    class:selected={filter === "students"}
    on:click={() => toggleFilter("students")}>students</button
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
