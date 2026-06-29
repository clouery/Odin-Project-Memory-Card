import { Card } from './Card'

export function RenderMain({ arr, handleReveal, difficulty }) {
    // arr is a prop of cards, we want to display it in line
    console.log("rendering main...")

    return(
        <>
           <div className={`cardsContainer ${difficulty}`}>
                {
                    arr.map((pokemon) => {
                        return <Card key={pokemon.cardId} pokemon={pokemon} handleReveal={handleReveal}/>
                    })
                }
            </div> 
        </>

    )
}