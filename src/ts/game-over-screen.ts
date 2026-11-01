import { getGameOverScreenTemplate } from './templates'
import { renderResultScreen } from './result-screen'

export function renderGameOverScreen(blueScore: number,orangeScore: number): void {
    document.body.dataset.page = 'game-over'

    const screenContainer = document.getElementById('screen-content') as HTMLElement

    screenContainer.innerHTML = getGameOverScreenTemplate(blueScore, orangeScore)

    setTimeout(() => {
        renderResultScreen(blueScore, orangeScore)
    }, 2000)
}