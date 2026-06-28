import { useState, useEffect } from 'react'
import { pokeData } from './PokeData'
import { RenderMain } from './RenderMain';


function Game() {
    // initial state is empty
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function loadPokemon(){
            const data = await pokeData();
            console.log(data);

            const dup = [
                ...data,
                ...data
            ];

            const cardsWithID = dup.map((card, idx) => {
                return {
                    ...card,
                    cardId: idx
                };
            });

            setCards(cardsWithID);

        }
        loadPokemon();
    }, []) 


    return (
        <>
            <header>
                POKEMON 
            </header> 
        
            <main>
                <h1>Number of cards: {cards.length}</h1>
                <RenderMain arr={cards} />
            </main>

            <footer>
            </footer>
        </>
    )
}

export default Game