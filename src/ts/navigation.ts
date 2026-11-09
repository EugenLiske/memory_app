
import { resetGameState } from './game-screen';
import { renderHomeScreen, initPlayButton } from './home-screen';
import { renderSettingsScreen } from './settings-screen';

/**
 * Resets the game state, renders the home screen,
 * and initializes the play button.
 */
export function navigateToHome(): void {
  resetGameState();
  renderHomeScreen();
  initPlayButton();
}

/**
 * Resets the game state and navigates to the settings screen.
 */
export function navigateToSettings(): void {
  resetGameState();
  renderSettingsScreen();
}
