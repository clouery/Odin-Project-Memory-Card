export async function pokeData(numOfCards) {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    // response is a promise, so we change to Json first 
    let data = await response.json();

    const allPokemon = data.results;


    const selectedIndex= [];

    for (let i = 0; i < numOfCards; i++) {
        let rand = Math.floor(Math.random() * allPokemon.length);

        while (selectedIndex.includes(rand)) {
            rand = Math.floor(Math.random() * allPokemon.length);
        }
        selectedIndex.push(rand);
    }


    const pokeList = await Promise.all(
        selectedIndex.map(async (index) => {
            let response = await fetch(allPokemon[index].url);

            const data = await response.json();

            return {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
                // we dont need a clicked as i added reveled on Game.jsx
                // clicked: false
            };
        })
    );
    return pokeList;
}