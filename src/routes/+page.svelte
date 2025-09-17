<script>
  import FilterSortBar from "$lib/components/FilterSortBar.svelte";
  import Search from "$lib/components/Search.svelte";

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

  function clickSquad(squadName) {
    selectedSquad = selectedSquad === squadName ? "" : squadName;
  }

  const rolesOf = (member) =>
    Array.isArray(member?.role)
      ? member.role.map((role) => String(role).toLowerCase())
      : [String(member?.role ?? "").toLowerCase()];

  const isTeacher = (member) => {
    const roles = normalizeRoles(member);
    return roles.includes("co_teacher") || roles.includes("squad_leader");
  };

  const isStudent = (member) => {
    const roles = normalizeRoles(member);
    return roles.includes("member") && !isTeacher(member);
  };

  const filteredMembers = $derived.by(() => {
    let list = members;

    if (filter === "teachers") list = list.filter(isTeacher);
    else if (list === "students") list = list.filter(isStudent);

    if (selectedSquad) {
      list = list.filter((member) =>
        member.squads?.some((squad) => squad?.squad_id?.name === selectedSquad)
      );
    }

    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter((member) =>
        (member.name ?? "").toLowerCase().includes(query)
      );
    }

    return list;
  });

  const sortedMembers = $derived.by(() => {
    if (sort === "name") {
      return [...filteredMembers].sort((memberA, memberB) =>
        (memberA.name ?? "").localeCompare(memberB.name ?? "", "nl", {
          sensitivity: "base",
        })
      );
    }

    if (sort === "age") {
      const toTimestamp = (dateString) =>
        dateString ? new Date(dateString).getTime() : Infinity;

      return [...filteredMembers].sort(
        (memberA, memberB) =>
          toTimestamp(memberA.birthdate) - toTimestamp(memberB.birthdate)
      );
    }
    return filteredMembers;
  });
</script>

<section class="hero">
  <div class="hero_wrap">
    <div class="hero_star">*</div>
    <h1 class="hero_title">Squadpage</h1>
    <div class="hero_year">2025-2026</div>
  </div>
</section>

<section class="intro-grid">
  <p class="intro left">
    <span class="strong mixed"><span class="dropcap">W</span>ELCOME!</span>
    <span class="tiny">THIS</span>
    <span class="strong">SQUADPAGE</span> <span class="tiny">WAS MADE</span>
    <span class="strong">BY</span> <span class="tiny">ALISA AND ABEER</span>
  </p>
  <p class="intro right">
    <span class="tiny">HERE YOU CAN</span>
    <span class="strong mixed"><span class="dropcap">D</span>ISCOVER</span>
    <span class="tiny">THE TWO</span> <span class="strong">SQUADS</span>
    <span class="tiny">FROM THE SECOND YEAR OF</span>
    <span class="strong">FDND</span> <span class="tiny">COURSE</span>
  </p>
</section>

<p class="discover">discover squads</p>

<section class="main-container">
  <Search bind:value={search} />

  <FilterSortBar bind:sort bind:filter bind:selectedSquad {availableSquads} />

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
    overflow: visible;
    padding: 0rem 5rem;
    margin-bottom: 1rem;
  }

  .hero_wrap {
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    min-block-size: clamp(10rem, 52vh, 40rem);
  }

  .hero_title {
    position: absolute;
    top: clamp(0.25rem, 2vw, 1rem);
    margin: 0;
    z-index: 3;
    font-family: "Milton One", Georgia, serif;
    font-weight: 700;
    color: #fff;
    text-align: left;
    margin: 0;
    font-size: clamp(7rem, 22vw, 30rem);
    line-height: 0.85;
    position: relative;
  }

  .hero_year {
    position: absolute;
    top: clamp(12rem, 10vh, 36rem);
    z-index: 1;
    font-family: "Codystar", system-ui, sans-serif;
    color: #fff0f6;
    font-size: clamp(8rem, 22vw, 17rem);
    line-height: 1;
    white-space: nowrap;
    max-inline-size: 100%;
  }

  .hero_star {
    position: absolute;
    right: clamp(0.5rem, 6vw, 7.5rem);
    top: clamp(0.5rem, 6vw, 7.5rem);
    font-family: "Codystar", system-ui, sans-serif;
    color: #fff;
    opacity: 0.85;
    font-size: clamp(2.5rem, 20vw, 15rem);
    pointer-events: none;
    z-index: 3;
  }

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(3rem, 12vw, 7rem);
    align-items: start;
    margin: clamp(12px, 2vw, 24px) 0;
    margin-inline: auto;
    inline-size: 75%;
    container-type: inline-size;
  }

  .intro {
    margin: 0;
    line-height: 1.15;
    font-weight: 300;
  }

  .tiny {
    font-size: clamp(10px, 0.9vw, 18px);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.9;
  }

  .strong {
    font-size: clamp(22px, 2.8vw, 25px);
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  .mixed {
    line-height: 20%;
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
    margin-bottom: 10rem;
  }

  .main-container {
    margin-inline: auto;
    inline-size: 80%;
    padding-block-start: clamp(5rem, 14vw, 10rem);
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
    .intro .tiny {
      font-size: clamp(13px, 2vw, 18px);
      letter-spacing: 0.02em;
    }
    .intro .strong {
      font-size: clamp(22px, 5vw, 36px);
      font-weight: 300;
      letter-spacing: 0.02em;
    }
    .dropcap {
      font-size: clamp(72px, 14vw, 100px);
      line-height: 1;
      margin-right: 0.09em;
      float: top;
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
