import { getResultScreenTemplate } from './templates'
import { renderHomeScreen, initPlayButton } from './home-screen'
import type { ThemeKey } from './game-settings'
import { resetGameState } from './game-screen'

type GameResult = 'blue' | 'orange' | 'draw'

const resultIcons: Record<ThemeKey, Record<GameResult, string>> = {
    codeVibes: {
        blue: '/assets/winner-and-draw-screen/icon-winner-blue-player-code-vibes-theme.svg',
        orange: '/assets/winner-and-draw-screen/icon-winner-orange-player-code-vibes-theme.svg',
        draw: '/assets/winner-and-draw-screen/icon-draw-code-vibes-theme.svg'
    },

    gaming: {
        blue: '/assets/winner-and-draw-screen/icon-winner-orange-and-blue-player-gaming-theme.svg',
        orange: '/assets/winner-and-draw-screen/icon-winner-orange-and-blue-player-gaming-theme.svg',
        draw: '/assets/winner-and-draw-screen/icon-draw-gaming-theme.svg'
    },

    DAProjects: {
        blue: '/assets/winner-and-draw-screen/icon-winner-blue-player-da-projects-theme.svg',
        orange: '/assets/winner-and-draw-screen/icon-winner-orange-player-da-projects-theme.svg',
        draw: '/assets/winner-and-draw-screen/icon-draw-da-projects-theme.svg'
    },

    foods: {
        blue: '/assets/winner-and-draw-screen/icon-winner-blue-player-foods-theme.svg',
        orange: '/assets/winner-and-draw-screen/icon-winner-orange-player-foods-theme.svg',
        draw: '/assets/winner-and-draw-screen/icon-draw-foods-theme.svg'
    }
}

export function renderResultScreen(blueScore: number, orangeScore: number): void {
    let result: GameResult

    if (blueScore > orangeScore) {
        result = 'blue'
    } else if (orangeScore > blueScore) {
        result = 'orange'
    } else {
        result = 'draw'
    }

    document.body.dataset.page = 'result'

    const screenContainer = document.getElementById('screen-content') as HTMLElement

    screenContainer.innerHTML = getResultScreenTemplate(result)

    const selectedTheme = document.body.dataset.theme as ThemeKey

    const resultIconRef = document.getElementById('resultIcon') as HTMLImageElement
    resultIconRef.src = resultIcons[selectedTheme][result]

    initHomeButton()
}

function initHomeButton(): void {
    const homeButtonRef = document.getElementById('homeButton') as HTMLButtonElement

    homeButtonRef.addEventListener('click', () => {
        resetGameState()
        renderHomeScreen()
        initPlayButton()
    })
}