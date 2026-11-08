
import { resetGameState } from './game-screen';
import { renderHomeScreen, initPlayButton } from './home-screen';

/**
 * Resets the game state, renders the home screen,
 * and initializes the play button.
 */
export function navigateToHome(): void {
  resetGameState();
  renderHomeScreen();
  initPlayButton();
}
