import { getGameOverScreenTemplate } from './templates';
import { renderResultScreen } from './result-screen';

const SCREEN_ANIMATION_MS = 1000;
const GAME_OVER_DISPLAY_MS = 3000;

/**
 * Renders the game-over screen and displays the game result after two seconds.
 * @param blueScore - Score of the blue player.
 * @param orangeScore - Score of the orange player.
 */
export function renderGameOverScreen(blueScore: number, orangeScore: number): void {
  document.body.dataset.page = 'game-over';

  const screenContainer = document.getElementById('screen-content') as HTMLElement;
  screenContainer.innerHTML = getGameOverScreenTemplate(blueScore, orangeScore);

  setTimeout(() => {
    renderResultScreen(blueScore, orangeScore);
  }, SCREEN_ANIMATION_MS + GAME_OVER_DISPLAY_MS);
}
