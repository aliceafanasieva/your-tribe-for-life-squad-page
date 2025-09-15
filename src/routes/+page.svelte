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
        <span class="strong"><span class="dropcap">W</span>ELCOME!</span>
        <span class="tiny">THIS</span>
        <span class="strong">SQUADPAGE</span> <span class="tiny">WAS MADE</span>
        <span class="strong">BY</span> <span class="tiny">ALISA AND ABEER</span>
      </p>
      <p class="intro right">
        <span class="tiny">HERE YOU CAN</span>
        <span class="strong"><span class="dropcap">D</span>ISCOVER</span>
        <span class="tiny">THE TWO</span> <span class="strong">SQUADS</span>
        <span class="tiny">FROM THE SECOND YEAR OF</span>
        <span class="strong">FDND</span> <span class="tiny">COURSE</span>
      </p>
    </div>
  </section>

  <p class="discover">discover squads</p>

  <section class="search">
    <input
      type="text"
      placeholder="Search by a name . . ."
      bind:value={search}
      aria-label="Search by name"
    />
  </section>

  <section class="filter-sort-bar">
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
          <span class="member-name">
            <a href={"/" + member.id}>{member.name}</a>
          </span>
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
    --text: #000000;
  }
  :global(body) {
    margin: 0;
    color: var(--text);
    background: transparent;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 200;
    position: relative;
  }
  :global(body)::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: linear-gradient(to bottom, #ff95c1 0%, #fffeff 70%);
  }

  p {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 200;
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
    margin-inline: auto;
    inline-size: 80%;
    padding-inline: 0;
    padding-block-start: clamp(48px, 8vw, 100px);
    container-type: inline-size;
    container-name: page;
  }

  .main-container
    > :where(.intro-grid, .discover, .search, .filter-sort-bar, .members-grid) {
    inline-size: 100%;
  }

  @media (min-width: 900px) {
    .main-container {
      inline-size: 75%;
    }
  }
  @media (min-width: 1200px) {
    .main-container {
      inline-size: 70%;
    }
  }
  @media (min-width: 1400px) {
    .main-container {
      inline-size: 65%;
    }
  }

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(24px, 6vw, 80px);
    align-items: start;
    margin: clamp(12px, 2vw, 24px) 0;
  }

  .intro {
    margin: 0;
    line-height: 1.15;
    font-weight: 300;
  }

  .intro .tiny {
    font-size: clamp(10px, 0.9vw, 18px);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.9;
  }

  .intro .strong {
    font-size: clamp(22px, 2.8vw, 25px);
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  .dropcap {
    font-family: "Milton One", Georgia, serif;
    font-style: italic;
    font-weight: 700;
    font-size: clamp(72px, 12vw, 80px);
    line-height: 1;
    margin-right: 0.06em;
    float: top;
  }

  .discover {
    font-family: "Times New Roman", Times, serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(14px, 1.2vw, 20px);
    text-align: center;
    letter-spacing: 0.02em;
    margin-block: clamp(7rem, 6vw, 20rem);
  }

  .filter-sort-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: flex-start;
    gap: clamp(0.75rem, 3vw, 3rem);
    margin: 2rem 0;
    font-weight: 400;
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
    font-size: 0.8rem;
    margin: 0;
    flex-wrap: nowrap;
    line-height: 1;
  }

  .squadbar button {
    background: none;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    text-transform: uppercase;
  }

  .squadbar button.selected {
    border-bottom: 1px solid black;
  }

  .search {
    display: flex;
    margin: 2rem 0;
  }

  .search input {
    width: min(300px, 100%);
    padding: 6px 4px;
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    background: transparent;
    outline: none;
    font-size: 0.8rem;
  }

  .search input::placeholder {
    color: #000;
    font-style: italic;
    letter-spacing: 0.02em;
  }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(clamp(220px, 24vw, 320px), 1fr)
    );
    gap: clamp(16px, 2vw, 32px);
    justify-content: center;
    margin-bottom: 10rem;
    inline-size: 100%;
  }

  @media (min-width: 768px) {
    .members-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 900px) {
    .members-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1100px) {
    .members-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .member-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    inline-size: 100%;
    max-width: none;
  }

  .member-card img {
    display: block;
    inline-size: 100%;
    height: auto;
    object-fit: cover;
  }

  .member-name {
    margin-top: 0.5rem;
  }

  .member-name a {
    font-size: 0.9rem;
    font-weight: 400;
    text-decoration: none;
    color: rgb(0, 0, 0);
    text-align: center;
  }
</style>
