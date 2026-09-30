import { getCardTemplate } from './templates'
import { codeVibesMotifs } from './card-motifs-database'

export interface CardData {
    id: number
    pairId: string
    frontImg: string
    backImg: string
}

export class Card implements CardData {
    id: number
    pairId: string
    frontImg: string
    backImg: string

    constructor(
        id: number,
        pairId: string,
        frontImg: string,
        backImg: string
    ) {
        this.id = id
        this.pairId = pairId
        this.frontImg = frontImg
        this.backImg = backImg
    }
}

export function initGameBoard() {
    const gameBoardRef = document.getElementById('gameBoard')

    if (gameBoardRef) {
        const cards: Card[] = []
        let cardId = 1

        codeVibesMotifs.forEach((motif) => {
            const firstCard = new Card(
                cardId,
                motif.pairId,
                motif.frontImg,
                '/assets/game-screen/themes/code-vibes/card-back.svg'
            )

            cardId++

            const secondCard = new Card(
                cardId,
                motif.pairId,
                motif.frontImg,
                '/assets/game-screen/themes/code-vibes/card-back.svg'
            )

            cardId++

            cards.push(firstCard, secondCard)
        })

        const cardTemplates = cards.map((card) => {
            return getCardTemplate(card)
        })

        const cardsHTML = cardTemplates.join('')

        gameBoardRef.innerHTML = cardsHTML

        gameBoardRef.addEventListener('click', (event) => {
            const cardRef = (event.target as HTMLElement).closest('.memory-card')

            if (cardRef) {
                cardRef.classList.toggle('is-flipped')
            }
        })

        console.log(cards)
        console.log(cardTemplates)
        console.log(cardsHTML)
    }
}

