import { useState } from "react"
import cardBackImg from "./pics/cardBack.png"

export function Card({ pokemon }) {
    const [revealed, setRevealed] = useState(false);

    function handleFlip() {
        setRevealed(!revealed);
    }

    return (
        <div
            className={`card ${revealed ? "revealed" : ""}`}
            onClick={handleFlip}
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