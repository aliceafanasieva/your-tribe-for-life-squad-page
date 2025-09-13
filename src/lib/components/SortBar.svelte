<script>
  import { createEventDispatcher } from "svelte";
  export let active = "default";
  const dispatch = createEventDispatcher();

  function click(kind) {
    const next = active === kind ? "default" : kind;
    dispatch("sort", { value: next });
  }
</script>

<div class="sortbar">
  <span>sort:</span>
  <button
    class:selected={active === "name"}
    aria-pressed={active === "name"}
    on:click={() => click("name")}>A–Z</button
  >

  <button
    class:selected={active === "age"}
    aria-pressed={active === "age"}
    on:click={() => click("age")}>age</button
  >
</div>

<style>
  .sortbar {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    gap: 1rem;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 0.8rem;
    margin: 0;
    line-height: 1;
    font-weight: inherit;
  }

  .sortbar button {
    background: none;
    border: none;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    transition: all 0.1s ease;
    font: inherit;
  }

  .sortbar button.selected {
    border-bottom: 1px solid #000;
  }
</style>
