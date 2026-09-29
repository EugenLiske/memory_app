export function initGameBoard(){
    const gameBoardRef = document.getElementById('gameBoard')

    if(gameBoardRef){
        console.log(gameBoardRef)
        gameBoardRef.addEventListener('click', (event) => {
            const cardRef = (event.target as HTMLElement).closest('.memory-card')

            if(cardRef){
                cardRef.classList.toggle('is-flipped')
            }
        })
    }
}