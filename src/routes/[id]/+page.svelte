<!-- <script>
  let { data } = $props();

  const member = data.member;

</script>

<a href="/">Terug naar overzicht</a>

<section>
  <div></div>

  <img
      src="https://fdnd.directus.app/assets/{member.mugshot}?fit=cover&width=500"
      alt={member.name}
    />

  <h1>{member.name}</h1>
  <h2>{member.bio}</h2>
  <h3>Link naar mijn visitkaartje</h3>

</section>



 -->

 <script>
  let { data } = $props();
  const member = data.member;
</script>

<a href="/" class="back-button">← Terug naar overzicht</a>

<section class="profile-card">
  <div class="avatar-container">
    <img
      src="https://fdnd.directus.app/assets/{member.mugshot}?fit=cover&width=1600"
      alt={member.name}
    />
  </div>

  <div class="profile-info">
    <h1>{member.name}</h1>
    <h2>{member.bio}</h2>
    <a href="#" class="visitkaart-button">Bekijk mijn visitkaartje</a>
  </div>
</section>

<style>
:global(html, body) {
  height: 100%;
  margin: 0;
}

:global(body) {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to bottom, #FFBAD6 0%, #FFFFFF 100%);
  min-height: 100dvh;           /* يغطي كامل ارتفاع الشاشة على الموبايل */
  background-attachment: fixed; /* ثابت عند السكروول */
  background-repeat: no-repeat;
  background-size: cover;
}

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

/* Mobile-First: صورة فوق + نص تحت */
.profile-card {
  display: flex;
  flex-direction: column; /* عمودي */
  align-items: center;
  gap: 1.5rem;
  max-width: 95%;
  margin: 2rem auto;
  padding: 1.5rem;
  transition: transform 0.3s;
}

/* .profile-card:hover {
  transform: translateY(-3px);
} */

.avatar-container {
  width: 200px;
  height: 200px;
  border-radius: 10%;
  margin-bottom: 1rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  overflow: hidden;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  text-align: center;
}

.profile-info h1 {
  margin: 0;
  font-size: 1.6rem;
  color: #000000;
}

.profile-info h2 {
  font-size: 1rem;
  color: #000000;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.4;
}

.visitkaart-button {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: #6a0dad;
  color: #ffffff;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
}

.visitkaart-button:hover {
  background: #a14ed1;
  transform: translateY(-2px);
}

/* Tablets */
@media (min-width: 600px) {
  .avatar-container {
    width: 220px;
    height: 220px;
  }

  .profile-info h1 {
    font-size: 1.8rem;
  }

  .profile-info h2 {
    font-size: 1.1rem;
  }
}

/* Desktop */
@media (min-width: 900px) {
  .profile-card {
    flex-direction: row;     /* صورة يسار + نص يمين */
    align-items: center;
    justify-content: center;
    max-width: 900px;
    padding: 3rem;
    gap: 2rem;
  }

  .avatar-container {
    width: 250px;
    height: 250px;
    margin: 0;
  }

  .profile-info {
    text-align: left;
  }

  .profile-info h1 {
    font-size: 2rem;
  }

  .profile-info h2 {
    font-size: 1.2rem;
  }

  .visitkaart-button {
    padding: 0.7rem 1.5rem;
  }
}
</style>
