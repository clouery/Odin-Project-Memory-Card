import { useState, useEffect } from 'react'
import { pokeData } from './PokeData'
import { RenderMain } from './RenderMain';


function Game() {
    // initial state is empty
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [difficulty, setDifficulty] = useState(null);

    const [totalCards, setTotalCards] = useState(0);
    const [totalMatch, setTotalMatch] = useState(0);
    const [isWon, setIsWon] = useState(false);


    const difficultyMap = {
        "easy": 5,
        "medium": 10,
        "hard": 12
    }

    let numPoke = difficultyMap[difficulty];
    console.log(numPoke);

    function shuffleArray(array) {
        const shuffled = [...array]; // Create a shallow copy to respect immutability
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        return shuffled;
    };

    function handleMatch(first, second) {
        console.log("handle match")
        setCards((prev) =>
            prev.map((card) => {
                if ((card.cardId === first.cardId || card.cardId === second.cardId) && (first.cardId !== second.cardId)) {
                    return { ...card, matched: true };
                }
                return card;
            })
        );
        setTotalMatch((prev) => prev + 2);

    }

    useEffect(() => {
        if(!difficulty) return;

        async function loadPokemon() {
            setTotalMatch(0);
            const data = await pokeData(numPoke);
            console.log(data);

            const dup = [
                // Chat says this is not good since this way they are the same object
                // ...data,
                // ...data

                // we clone instead
                ...data.map(pokemon => ({ ...pokemon })),
                ...data.map(pokemon => ({ ...pokemon }))
            ];

            const cardsWithID = dup.map((card, idx) => {
                return {
                    ...card,
                    cardId: idx,
                    revealed: true,

                    // if the card is matched with the same card
                    matched: false
                };
            });

            const shuffled = shuffleArray(cardsWithID);
            setCards(shuffled);
            setTotalCards(shuffled.length);

            setTimeout(() => {
                setCards((prevCards) =>
                    prevCards.map(card => ({
                        ...card,
                        revealed: false
                    }))
                );
            }, 5000);

        }
        loadPokemon();
    }, [difficulty, numPoke])

    useEffect(() => {
        if (selectedCards.length === 2) {
            const firstCard = selectedCards[0];
            const secondCard = selectedCards[1];

            if (firstCard.name === secondCard.name) {
                // handleMatch
                console.log("Player found a match!");
                handleMatch(firstCard, secondCard);
                setSelectedCards([]);
            } else {
                // we want to wait 1 second and close the cards
                setTimeout(() => {
                    setCards(prev =>
                        prev.map(card => {

                            if (card.cardId === firstCard.cardId || card.cardId === secondCard.cardId) {
                                return {
                                    ...card,
                                    revealed: false
                                };
                            }

                            return card;
                        })
                    );
                }, 1000)

                // clear selectedCards
                setSelectedCards([]);
            }
        }
    }, [selectedCards])

    useEffect(() => {
        if(totalCards > 0 && totalCards === totalMatch) {
            setIsWon(true);
        }
    }, [totalMatch, totalCards])

    function handleReveal(id) {
        const clickedCard = cards.find((card) => card.cardId === id);

        // prevent clicking the same card or matched card
        if (clickedCard.revealed || clickedCard.matched) {
            return;
        }

        setCards(prevCards =>
            prevCards.map(card => {
                if (card.cardId === id) {
                    // we set revealed = true
                    return {
                        ...card,
                        revealed: true
                    };
                }
                return card;
            })
        )
        // we cannot do this since we need an array of 2 cards
        // setSelectedCards(clickedCard);
        setSelectedCards((prev) => {
            return [
                ...prev,
                clickedCard
            ];
        });
    }


    return (
        <div className={`container ${difficulty ? "gameScreen" : "selectScreen"}`}>
            {
                difficulty !== null && isWon && (
                    <div className="win">
                        <ol>Good Job! You Won</ol>
                        <ol>Yay!</ol>
                        <button className="reset" onClick={() => window.location.reload()}>Play Again?</button>
                    </div>
                )
            }

            {
                difficulty === null && !isWon &&(
                    <>
                        <header>
                            POKEMON Memory Card Game
                        </header>
                        <div className="difficulty">
                            <h2>Select difficulty</h2>
                            <div className="btns">
                                <button onClick={() => setDifficulty("easy")}>Easy</button>
                                <button onClick={() => setDifficulty("medium")}>Medium</button>
                                <button onClick={() => setDifficulty("hard")}>Hard</button>
                            </div>
                            <div className="rules">
                                <h3>🎴 How to Play</h3>
                                <ol>
                                    <li>Memorise the cards during the 5-second preview.</li>
                                    <li>Flip two cards at a time.</li>
                                    <li>Match the same Pokémon to keep them revealed.</li>
                                    <li>Wrong matches will be hidden again.</li>
                                    <li>Find all pairs to win!</li>
                                </ol>
                                <p>Good luck, Trainer! ⚡</p>
                            </div>
                        </div>
                    </>
                )
            }

            {
                difficulty !== null && !isWon && (
                    <>
                        <main>
                            <h1>Number of cards: {cards.length}</h1>
                            <RenderMain
                                arr={cards}
                                handleReveal={handleReveal}
                                difficulty={difficulty}
                            />
                        </main>
                        <div className="spacer">

                        </div>
                    </>
                )
            }

            <footer>
                Made By <a href="https://github.com/clouery">Xiang Zhi</a>
            </footer>
        </div>
    )
}

export default Game
