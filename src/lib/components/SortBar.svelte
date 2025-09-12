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
    justify-content: center;
    align-items: baseline;
    gap: 1rem;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 0.9rem;
    margin: 0;
    flex-wrap: nowrap;
    line-height: 1;
  }
  .sortbar span {
    font-weight: 300;
    font-size: 0.9rem;
  }
  .sortbar button {
    background: none;
    border: none;
    padding: 0.3rem 0.6rem;
    font-size: 0.9rem;
    cursor: pointer;
    text-transform: lowercase;
    font-weight: 300;
    letter-spacing: 0.03rem;
    transition: all 0.1s ease;
  }
  .sortbar button.selected {
    font-weight: 300;
    border-bottom: 1px solid black;
  }
</style>
