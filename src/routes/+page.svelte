<script>
  import SortBar from "$lib/components/SortBar.svelte";
  import FilterBar from "$lib/components/FilterBar.svelte";

  let { data } = $props();
  const members = data?.members ?? [];

  const availableSquads = ["2E", "2F"];

  let sort = $state("default");
  let filter = $state("all");
  let search = $state("");
  let selectedSquad = $state("");

  function handleSort(event) {
    sort = event.detail.value;
  }
  function handleFilter(event) {
    filter = event.detail.value;
  }

  function clickSquad(sq) {
    selectedSquad = selectedSquad === sq ? "" : sq;
  }

  const rolesOf = (m) =>
    Array.isArray(m?.role)
      ? m.role.map((r) => String(r).toLowerCase())
      : [String(m?.role ?? "").toLowerCase()];

  const isTeacher = (m) => {
    const r = rolesOf(m);
    return r.includes("co_teacher") || r.includes("squad_leader");
  };
  const isStudent = (m) => {
    const r = rolesOf(m);
    return r.includes("member") && !isTeacher(m);
  };

  const filteredMembers = $derived.by(() => {
    let list = members;

    if (filter === "teachers") list = list.filter(isTeacher);
    else if (filter === "students") list = list.filter(isStudent);

    if (selectedSquad) {
      list = list.filter((m) =>
        m.squads?.some((s) => s?.squad_id?.name === selectedSquad)
      );
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((m) => (m.name ?? "").toLowerCase().includes(q));
    }

    return list;
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

<header class="topbar">
  <div class="container topbar__inner">
    <span class="topbar_brand">squadpage</span>
    <span class="topbar_center">fdnd</span>
    <div class="topbar_right">
      <span>2025</span>
      <span class="dot">D</span>
    </div>
  </div>
</header>

<section class="hero">
  <div class="container hero__wrap">
    <div class="hero_star">*</div>
    <h1 class="hero_title">Squadpage</h1>
    <div class="hero_year">2025–2026</div>
  </div>
</section>

<section class="main-container">
  <section>
    <div class="intro-grid">
      <p class="intro left">
        <span class="kicker">WELCOME!</span> <span class="tiny">THIS</span>
        <span class="strong">SQUADPAGE</span> <span class="tiny">WAS MADE</span>
        <span class="tiny">BY</span> <span class="strong">ALISA AND ABEER</span>
      </p>
      <p class="intro right">
        <span class="tiny">HERE YOU CAN</span>
        <span class="strong">DISCOVER</span>
        <span class="tiny">THE TWO</span> <span class="strong">SQUADS</span>
        <span class="tiny">FROM THE SECOND YEAR OF</span>
        <span class="strong">FDND</span> <span class="tiny">COURSE</span>
      </p>
    </div>
  </section>

  <p class="discover">discover squads</p>

  <section class="search container">
    <input
      type="text"
      placeholder="Search by name..."
      bind:value={search}
      aria-label="Search by name"
    />
  </section>

  <section class="filter-sort-bar container">
    <SortBar active={sort} on:sort={handleSort} />
    <FilterBar active={filter} on:filter={handleFilter} />

    <div class="squadbar">
      <span>squad:</span>
      {#each availableSquads as squad}
        <button
          class:selected={selectedSquad === squad}
          aria-pressed={selectedSquad === squad}
          on:click={() => clickSquad(squad)}
        >
          {squad}
        </button>
      {/each}
    </div>
  </section>

  <div class="members-grid">
    {#if sortedMembers.length > 0}
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
          <a href={"/" + member.id}>{member.name}</a>
        </article>
      {/each}
    {:else}
      <p class="empty">No members found</p>
    {/if}
  </div>
</section>

<style>
  @font-face {
    font-family: "Milton One";
    src: url("/fonts/Milton_One_Bold.otf") format("opentype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Codystar";
    src: url("/fonts/Codystar-Light.ttf") format("truetype");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  :global(:root) {
    --container: 1200px;
    --text: #0d0d21;
  }
  :global(body) {
    margin: 0;
    color: var(--text);
    background: transparent;
    font-family: "Helvetica Neue", sans-serif;
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

  .topbar {
    padding: 12px 0;
    font-size: 0.95rem;
    line-height: 1;
  }
  .topbar__inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
  }
  .topbar_brand {
    justify-self: start;
    text-transform: lowercase;
    letter-spacing: 0.02em;
  }
  .topbar_center {
    justify-self: center;
    text-transform: lowercase;
  }
  .topbar_right {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .dot {
    display: inline-flex;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid var(--text);
    align-items: center;
    justify-content: center;
    font-weight: 700;
    line-height: 1;
  }

  .hero {
    position: relative;
    padding-block: 2.5rem 1rem;
  }
  .hero__wrap {
    position: relative;
  }
  .hero_title {
    font-family: "Milton One", Georgia, serif;
    color: #fff;
    font-weight: 700;
    font-size: clamp(80px, 12vw, 500px);
    line-height: 0.9;
    text-align: center;
    margin: 0.4rem 0 0.6rem;
  }
  .hero_year {
    position: absolute;
    inset-inline: 0;
    top: clamp(-30px, -4vw, -60px);
    text-align: center;
    font-family: "Codystar", system-ui, sans-serif;
    font-size: clamp(80px, 7.5vw, 300px);
    color: #fff;
    opacity: 0.55;
    letter-spacing: 0.06em;
    pointer-events: none;
  }
  .hero_star {
    position: absolute;
    right: clamp(10px, 6vw, 120px);
    top: clamp(10px, 6vw, 120px);
    font-family: "Codystar";
    font-size: clamp(40px, 6vw, 140px);
    color: #fff;
    opacity: 0.85;
    pointer-events: none;
  }

  .main-container {
    margin: auto;
    max-width: 48%;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 100px;
  }

  .filter-sort-bar {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: nowrap;
    margin: 1rem 0;
    font-weight: 350;
    font-synthesis-weight: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .filter-sort-bar :where(button, span) {
    font: inherit;
  }

  .filter-sort-bar
    :is(
      .sortbar button.selected,
      .filterbar button.selected,
      .squadbar button.selected
    ) {
    border-bottom: 1px solid #000;
  }

  .squadbar {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;
    font-size: 0.9rem;
    margin: 0;
    flex-wrap: nowrap;
    line-height: 1;
  }

  .squadbar button {
    background: none;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
  }

  .squadbar button.selected {
    border-bottom: 1px solid black;
  }

  .search {
    display: flex;
    gap: 0.75rem;
    place-items: start;
    margin: 1rem 0rem;
    max-width: var(--container);
  }

  .search input {
    width: min(300px, 100%);
    padding: 6px 4px;
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    background: transparent;
    outline: none;
    font-size: clamp(15px, 0.7rem, 18px);
  }

  .search input::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-style: italic;
    letter-spacing: 0.02em;
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
    font-weight: 100;
    text-decoration: none;
    color: black;
    text-align: center;
  }
  .empty {
    text-align: center;
    color: gray;
    font-style: italic;
    grid-column: 1 / -1;
  }

  @media (min-width: 768px) {
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
