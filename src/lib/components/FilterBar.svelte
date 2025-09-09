<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function filter(kind) {
    dispatch("filter", { filterValue: kind });
  }
</script>

<div class="filterbar">
  <span>filter:</span>
  <button on:click={() => filter("teachers")}>teachers</button>
  <button on:click={() => filter("students")}>students</button>
</div>

<style>
  .filterbar {
    margin-bottom: 1rem;
  }

  button.selected {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
