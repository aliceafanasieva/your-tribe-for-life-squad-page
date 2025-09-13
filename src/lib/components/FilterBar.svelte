<script>
  import { createEventDispatcher } from "svelte";
  export let active = "all";
  const dispatch = createEventDispatcher();

  function click(kind) {
    const next = active === kind ? "all" : kind;
    dispatch("filter", { value: next });
  }
</script>

<div class="filterbar">
  <span>filter:</span>
  <button
    class:selected={active === "teachers"}
    aria-pressed={active === "teachers"}
    on:click={() => click("teachers")}>teachers</button
  >

  <button
    class:selected={active === "students"}
    aria-pressed={active === "students"}
    on:click={() => click("students")}>students</button
  >
</div>

<style>
  .filterbar {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    gap: 1rem;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1;
    font-weight: inherit;
  }

  .filterbar button {
    background: none;
    border: none;
    padding: 0.3rem 0.6rem;
    font-size: 0.9rem;
    cursor: pointer;
    text-transform: lowercase;
    transition: all 0.1s ease;
    font: inherit;
  }
  .filterbar button.selected {
    border-bottom: 1px solid #000;
  }
</style>
