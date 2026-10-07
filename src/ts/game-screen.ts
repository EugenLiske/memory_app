import { getCardTemplate } from './templates'
import { codeVibesTheme, gamingTheme, daProjectsTheme, foodsTheme } from './card-motifs-database'
import type { GameSettings } from './game-settings'

const themes = {
    codeVibes: codeVibesTheme,
    gaming: gamingTheme,
    DAProjects: daProjectsTheme,
    foods: foodsTheme
}

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

export function initGameBoard(settings: GameSettings) {
    if (!settings.theme) {
        return
    }

    const selectedThemeKey = settings.theme

    const gameBoardRef = document.getElementById('gameBoard')

    if (gameBoardRef) {
        const cards: Card[] = []
        let cardId = 1
        
        const selectedTheme = themes[selectedThemeKey]

        selectedTheme.motifs.forEach((motif) => {
            const firstCard = new Card(
                cardId,
                motif.pairId,
                motif.frontImg,
                selectedTheme.backImg
            )

            cardId++

            const secondCard = new Card(
                cardId,
                motif.pairId,
                motif.frontImg,
                selectedTheme.backImg
            )

            cardId++

            cards.push(firstCard, secondCard)
        })

        const cardTemplates = cards.map((card) => {
            return getCardTemplate(card, selectedThemeKey)
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

