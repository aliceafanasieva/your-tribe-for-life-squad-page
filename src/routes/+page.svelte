<script>
  import SortBar from "$lib/components/SortBar.svelte";
  import FilterBar from "$lib/components/FilterBar.svelte";

  let { data } = $props();
  const members = data.members;

  let sort = $state("default");
  let filter = $state("all");

  function handleSort(event) {
    sort = event.detail.value;
  }
  function handleFilter(event) {
    filter = event.detail.value;
  }

  const filteredMembers = $derived.by(() => {
    if (filter === "teachers") {
      return members.filter(
        (m) => m.role.includes("co_teacher") || m.role.includes("squad_leader")
      );
    }
    if (filter === "students") {
      return members.filter(
        (m) =>
          m.role.includes("member") &&
          !m.role.includes("co_teacher") &&
          !m.role.includes("squad_leader")
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

<h1>Squadpage</h1>
<h2>2025-2026</h2>

<section class="filter-sort-bar">
  <SortBar active={sort} on:sort={handleSort} />
  <FilterBar active={filter} on:filter={handleFilter} />
</section>

<div class="members-grid">
  {#each sortedMembers as member}
    <article class="member-card">
      {#if member.mugshot}
        <img
          src={"https://fdnd.directus.app/assets/" +
            member.mugshot +
            "?width=300&height=300&fit=cover"}
          alt={member.name}
        />
      {/if}
      <a href={member.id}>{member.name}</a>
    </article>
  {/each}
</div>

<style>
  :global(body) {
    margin: 0;
    color: var(--text, #0d0d21);
    background: transparent;
    font-family:
      "Inter",
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Arial,
      sans-serif;
    font-weight: 300;
    position: relative;
  }

  :global(body)::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(to bottom, #ffa6ca 0%, #fffeff 60%);
  }

  h1 {
    font-family: "Snell Roundhand", cursive;
    font-size: 6rem;
    font-weight: 100;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 0;
  }

  h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 3rem;
  }

  .filter-sort-bar {
    display: flex;
    flex-direction: row;
  }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(1, 220px);
    gap: 2rem 0.5rem;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto 4rem;
  }

  .member-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 200px;
  }

  .member-card img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .member-card a {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 300;
    text-decoration: none;
    color: black;
    text-align: center;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 8rem;
    }

    .members-grid {
      grid-template-columns: repeat(2, 220px);
    }
  }

  @media (min-width: 900px) {
    .members-grid {
      grid-template-columns: repeat(3, 220px);
    }
  }

  @media (min-width: 1200px) {
    .members-grid {
      grid-template-columns: repeat(4, 220px);
    }
  }
</style>
