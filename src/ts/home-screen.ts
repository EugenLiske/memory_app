import { renderSettingsScreen } from './settings-screen';
import { getHomeTemplate } from './templates';

/**
 * Renders the home screen.
 */
export function renderHomeScreen(): void {
  document.body.dataset.page = 'home';

  const screenContainer = document.getElementById('screen-content') as HTMLElement;
  screenContainer.innerHTML = getHomeTemplate();
}

/**
 * Initializes the play button and opens the settings screen when clicked.
 */
export function initPlayButton(): void {
  const playButton = document.getElementById('playGameButton') as HTMLButtonElement;

  playButton.addEventListener('click', renderSettingsScreen);
}