<script>
  let {
    value = $bindable(""),
    placeholder = "Search by a name . . .",
    ariaLabel = "Search by name",
    id = "search-input",
  } = $props();
</script>

<section class="search">
  <input
    {id}
    type="text"
    bind:value
    {placeholder}
    aria-label={ariaLabel}
    autocomplete="off"
    spellcheck="false"
  />
</section>

<style>
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
</style>
