<script>
  import SortBar from "$lib/components/SortBar.svelte";
  import FilterBar from "$lib/components/FilterBar.svelte";

  let {
    sort = $bindable("default"),
    filter = $bindable("all"),
    selectedSquad = $bindable(""),
    availableSquads = ["2E", "2F"],
  } = $props();

  function handleSort(e) {
    sort = e.detail.value;
  }
  function handleFilter(e) {
    filter = e.detail.value;
  }
  function clickSquad(sq) {
    selectedSquad = selectedSquad === sq ? "" : sq;
  }
</script>

<section class="filter-sort-bar">
  <SortBar active={sort} on:sort={handleSort} />
  <FilterBar active={filter} on:filter={handleFilter} />

  <div class="squadbar">
    <span>squad:</span>
    {#each availableSquads as squad}
      <button
        class:selected={selectedSquad === squad}
        aria-pressed={selectedSquad === squad}
        type="button"
        onclick={() => clickSquad(squad)}
      >
        {squad}
      </button>
    {/each}
  </div>
</section>

<style>
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
</style>
