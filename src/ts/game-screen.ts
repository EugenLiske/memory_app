import { getCardTemplate, getGameScreenTemplate } from './templates'
import { codeVibesTheme, gamingTheme, daProjectsTheme, foodsTheme } from './card-motifs-database'
import type { GameSettings } from './game-settings'

let currentCards: CardData[] = []

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

export function renderGameScreen(settings: GameSettings): void {
    if (!settings.theme || !settings.boardSize) {
        return
    }

    document.body.dataset.page = 'game'
    document.body.dataset.theme = settings.theme
    const screenContainer = document.getElementById('screen-content') as HTMLElement
    screenContainer.innerHTML = getGameScreenTemplate()

    initGameBoard(settings)
    initCardFlip()
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

        currentCards = shuffledCards

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

export function initCardFlip(): void {
    const gameBoardRef = document.getElementById('gameBoard')
    const flippedCards: HTMLElement[] = []

    if (gameBoardRef) {
        gameBoardRef.addEventListener('click', (event) => {
            const cardRef = (event.target as HTMLElement).closest('.memory-card')

            if (cardRef) {
                if (
                    cardRef.classList.contains('is-flipped') ||
                    cardRef.classList.contains('is-matched')
                ) {
                    return
                }

                if (flippedCards.length === 2) {
                    return
                }

                cardRef.classList.add('is-flipped')
                flippedCards.push(cardRef as HTMLElement)

                if (flippedCards.length === 2) {
                    compareCards(flippedCards)
                }
            }
        })
    }
}

function compareCards(flippedCards: HTMLElement[]): void {
    const firstCardRef = flippedCards[0]
    const secondCardRef = flippedCards[1]

    const firstCardId = Number(firstCardRef.dataset.cardId)
    const secondCardId = Number(secondCardRef.dataset.cardId)

    const firstCard = currentCards.find((card) => card.id === firstCardId)
    const secondCard = currentCards.find((card) => card.id === secondCardId)

    if (firstCard && secondCard) {
        if (firstCard.pairId === secondCard.pairId) {
            firstCardRef.classList.add('is-matched')
            secondCardRef.classList.add('is-matched')

            flippedCards.length = 0
        } else {
            setTimeout(() => {
                firstCardRef.classList.remove('is-flipped')
                secondCardRef.classList.remove('is-flipped')

                flippedCards.length = 0
            }, 1000)
        }
    }   
}

