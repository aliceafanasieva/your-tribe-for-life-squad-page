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

    <p class="discover">discover squads</p>
  </div>
</section>

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
    font-weight: 400;
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

  .container {
    max-width: var(--container);
    width: min(100% - 32px, var(--container));
    margin-inline: auto;
  }

  .topbar {
    padding: 12px 0;
    font-size: 0.95rem;
    line-height: 1;
  }

  /* 3 gelijke kolommen -> echte center alignment */
  .topbar_inner {
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
    justify-self: center; /* zit echt in het midden van de container */
    text-transform: lowercase;
  }

  .topbar_right {
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 18px;
  }

  /* ronde “D”-badge */
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
  .hero_wrap {
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
    font-family: "Codystar", system-ui, sans-serif;
    font-size: clamp(40px, 6vw, 140px);
    color: #fff;
    opacity: 0.85;
    pointer-events: none;
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
