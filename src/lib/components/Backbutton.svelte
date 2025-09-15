<script>
    let { data } = $props();
    const member = data.member;
</script>

<a href="/" class="back-button">← Terug naar overzicht</a>

<style>

.back-button {
  display: inline-block;
  margin: 1rem 1rem;
  text-decoration: none;
  color: #000000;
  font-weight: 600;
  transition: color 0.2s;
}

.back-button:hover {
  color: #a14ed1;
}

</style>
