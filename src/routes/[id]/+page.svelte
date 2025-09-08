<script>
  let { data } = $props();

  const member = data.member;

</script>

<a href="/">Terug naar overzicht</a>

<section>
  <div></div>

  <img
      src="https://fdnd.directus.app/assets/{member.mugshot}?fit=cover&width=1600"
      alt={member.name}
    />

  <h1>{member.name}</h1>
  <h2>{member.bio}</h2>
  <h3>Link naar mijn visitkaartje</h3>

</section>




