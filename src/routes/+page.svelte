<script>

  // let { data } = $props();
  export let data;

  
  // const members = data.members;
  const members = data?.members || [];

  let search = "";

  let selectedSquad = "";

  let showTeachers = false;

  const filterSquads = ["2E", "2F"];

  // Filters
  $: filteredMembers = members.filter(
    (m) =>
      (!search || m.name?.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedSquad ||
        m.squads?.some((s) => s.squad_id?.name === selectedSquad)) &&
      (!showTeachers ||
        m.role?.some((r) =>
          ["co_teacher", "squad_leader"].includes(r.toLowerCase()),
        )),
  );
</script>

<h1>Welcome to Sqaudpage</h1>

<!-- Zoekbulk en filterknoppen -->

<section class="search-container">
  <input type="text" placeholder="Search bij name..." bind:value={search} />

  <div class="squad-buttons">
    <button
      on:click={() => {
        selectedSquad = "";
        showTeachers = false;
      }}>All</button
    >
    {#each filterSquads as squad}
      <button
        on:click={() => {
          selectedSquad = squad;
          showTeachers = false;
        }}>{squad}</button
      >
    {/each}
    <button
      on:click={() => {
        selectedSquad = "";
        showTeachers = true;
      }}>Teachers</button
    >
  </div>
</section>

<!-- {#each members as member}
  <a href={member.id}>{member.name}</a>
  
{/each}
{/each} -->


<div class="results">
  {#if filteredMembers.length > 0}
    {#each filteredMembers as member}
      <a href={"/" + member.id}>{member.name}</a>
    {/each}
  {:else}
    <p>No members found</p>
  {/if}
</div>

<style>
  h1 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.8rem;
    text-align: center;
  }

  .search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 2rem auto;
    max-width: 400px;
  }

  input {
    width: 100%;
    padding: 8px 12px;
    border: 2px solid plum;
    border-radius: 8px;
    font-size: 1rem;
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  a {
    border: 2px solid plum;
    padding: 8px;
    border-radius: 6px;
    text-decoration: none;
    color: #333;
    transition: background 0.2s;
  }

  a:hover {
    background: plum;
    color: white;
  }

  p {
    text-align: center;
    color: gray;
    font-style: italic;
  }
</style>
