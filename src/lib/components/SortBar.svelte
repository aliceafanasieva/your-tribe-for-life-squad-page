<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function sort(kind) {
    dispatch("sort", { sortValue: kind });
  }
</script>

<div class="sortbar">
  <span>sort:</span>
  <button on:click={() => sort("name")}>A–Z</button>
  <button on:click={() => sort("age")}>age</button>
</div>
