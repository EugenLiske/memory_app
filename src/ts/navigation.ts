import { resetGameState } from './game-screen'
import { renderHomeScreen, initPlayButton } from './home-screen'

export function navigateToHome(): void {
    resetGameState()
    renderHomeScreen()
    initPlayButton()
}