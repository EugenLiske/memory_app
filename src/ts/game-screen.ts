import { getCardTemplate } from './templates'
import { codeVibesTheme, gamingTheme, daProjectsTheme, foodsTheme } from './card-motifs-database'
import type { GameSettings } from './game-settings'

const themes = {
    codeVibes: codeVibesTheme,
    gaming: gamingTheme,
    DAProjects: daProjectsTheme,
    foods: foodsTheme
}

interface CardMotif {
    pairId: string
    frontImg: string
}
export interface CardData {
    id: number
    pairId: string
    frontImg: string
    backImg: string
}

class Card implements CardData {
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

function shuffleMotifs(motifs: CardMotif[]): CardMotif[] {

    const shuffledMotifs = [...motifs]

    for (let currentIndex = shuffledMotifs.length - 1; currentIndex > 0; currentIndex--) {

        const randomIndex = Math.floor(Math.random() * (currentIndex + 1))

        const temporaryMotif = shuffledMotifs[currentIndex]

        shuffledMotifs[currentIndex] = shuffledMotifs[randomIndex]

        shuffledMotifs[randomIndex] = temporaryMotif
    }

    return shuffledMotifs
}

function shuffleCards(cards: CardData[]): CardData[] {
    const shuffledCards = [...cards]

    for (let currentIndex = shuffledCards.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1))

        const temporaryCard = shuffledCards[currentIndex]

        shuffledCards[currentIndex] = shuffledCards[randomIndex]
        shuffledCards[randomIndex] = temporaryCard
    }

    return shuffledCards
}

export function initGameBoard(settings: GameSettings): void {
    if (!settings.theme || !settings.boardSize) {
        return
    }

    const selectedThemeKey = settings.theme
    const selectedBoardSize = settings.boardSize

    const gameBoardRef = document.getElementById('gameBoard')

    if (gameBoardRef) {
        const cards: Card[] = []
        let cardId = 1

        const selectedTheme = themes[selectedThemeKey]

        const numberOfPairs = selectedBoardSize / 2
        const shuffledMotifs = shuffleMotifs(selectedTheme.motifs)
        const selectedMotifs = shuffledMotifs.slice(0, numberOfPairs)

        selectedMotifs.forEach((motif) => {
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

        const shuffledCards = shuffleCards(cards)

        const cardTemplates = shuffledCards.map((card) => {
            return getCardTemplate(card, selectedThemeKey)
        })

        const cardsHTML = cardTemplates.join('')

        gameBoardRef.classList.remove(
            'game-board--4-columns',
            'game-board--6-columns'
        )

        if (selectedBoardSize === 16) {
            gameBoardRef.classList.add('game-board--4-columns')
        } else {
            gameBoardRef.classList.add('game-board--6-columns')
        }

        gameBoardRef.innerHTML = cardsHTML
    }
}

export function initCardFlip() {
    const gameBoardRef = document.getElementById('gameBoard')

    if (gameBoardRef) {
        gameBoardRef.addEventListener('click', (event) => {
            const cardRef = (event.target as HTMLElement).closest('.memory-card')

            if (cardRef) {
                cardRef.classList.toggle('is-flipped')
            }
        })
    }
}

