export default async function getImages(count) {
  let pokemonIds = [];
  let cleanedData = [];

  const cleanData = (data) => {
    return {
      id: data.id,
      name: capitalize(data.name),
      first_src: data.sprites.other.dream_world.front_default,
      second_src: data.sprites.other['official-artwork'].front_default,
    };
  };

  while (pokemonIds.length < count) {
    const id = Math.floor(Math.random() * 1000 + 1);
    !pokemonIds.includes(id) && pokemonIds.push(id);
  }

  for (const pokemonId of pokemonIds) {
    try {
      const APIresponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        { mode: 'cors' }
      );
      const response = await APIresponse.json();
      const data = cleanData(response);
      cleanedData.push(data);
    } catch (error) {
      console.log(`Error for id ${pokemonId} :`, error);
    }
  }

  return cleanedData;
}

function capitalize(string) {
  if (typeof string !== 'string' || string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
