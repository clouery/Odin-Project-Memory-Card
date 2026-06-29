import cardBackImg from "./pics/cardBack.png"

export function Card({ pokemon, handleReveal}) {
    // const [revealed, setRevealed] = useState(false);

    // function handleFlip() {
    //     setRevealed(!revealed);
    // }

    return (
        <div
            className={`card ${pokemon.revealed ? "revealed" : ""}`}
            onClick={() => handleReveal(pokemon.cardId)}
        >


            <div className="inCard">
                <div className="cardBack">
                    <img src={cardBackImg} alt="back of the card" />
                </div>

                <div className="cardFront">
                    <img src={pokemon.image} alt={pokemon.name} onError={(e) => { e.target.style.display = 'none'; }} />
                    <p>{pokemon.name}</p>
                </div>
            </div>
        </div>
    )

}