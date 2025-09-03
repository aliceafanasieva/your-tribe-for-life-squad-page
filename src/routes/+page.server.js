export async function load({ url }) {
  const membersResponse = await fetch('https://fdnd.directus.app/items/person?');
  const membersData = await membersResponse.json();

  return {members: membersData.data};
}
