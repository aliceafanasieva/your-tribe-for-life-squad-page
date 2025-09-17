<script>
  let { data } = $props();
  const member = data.member;
</script>

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
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #ffbad6 0%, #ffffff 100%);
    min-height: 100dvh; 
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .profile-card {
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 1.5rem;
    max-width: 95%;
    margin: 2rem auto;
    padding: 1.5rem;
    transition:
      transform 0.4s ease,
      box-shadow 0.4s ease,
      background 0.4s ease;
  }

  .profile-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(123, 44, 123, 0.35);
    background: linear-gradient(
      145deg,
      #f8e8f8,
      #e3c7e3
    ); /* subtle highlight عند hover */
  }

  .avatar-container {
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition:
      transform 0.4s ease,
      box-shadow 0.4s ease;
  }

  .avatar-container:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  }

  .avatar-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-info {
    text-align: center;
    max-width: 450px;
  }

  .profile-info h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: #4b0082;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .profile-info h2 {
    font-size: 1.2rem;
    color: #000000;
    line-height: 1.5;
    margin-bottom: 1.2rem;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
  }

  .profile-info h1:hover,
  .profile-info h2:hover {
    transform: translateY(-2px);
    color: #711667; /* hover */
  }

  .visitkaart-button {
    display: inline-block;
    padding: 0.6rem 1.2rem;
    background: #6a0dad;
    color: #ffffff;
    text-decoration: none;
    font-weight: 200;
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
      flex-direction: row;
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
