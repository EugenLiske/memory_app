import { getResultScreenTemplate } from './templates';
import type { ThemeKey } from './game-settings';
import { navigateToHome } from './navigation';

type GameResult = 'blue' | 'orange' | 'draw';

const RESULT_ICONS: Record<ThemeKey, Record<GameResult, string>> = {
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
};

/**
 * Determines the game result based on both players' scores.
 * @param blueScore - Score of the blue player.
 * @param orangeScore - Score of the orange player.
 * @returns The winning player or a draw.
 */
function getGameResult(blueScore: number, orangeScore: number): GameResult {
  if (blueScore > orangeScore) return 'blue';
  if (orangeScore > blueScore) return 'orange';
  return 'draw';
}

/**
 * Updates the result icon based on the selected theme and game result.
 * @param result - The game result.
 */
function updateResultIcon(result: GameResult): void {
  const selectedTheme = document.body.dataset.theme as ThemeKey;
  const resultIconRef = document.getElementById('resultIcon') as HTMLImageElement;

  resultIconRef.src = RESULT_ICONS[selectedTheme][result];
}

/**
 * Renders the result screen and initializes its interactive elements.
 * @param blueScore - Score of the blue player.
 * @param orangeScore - Score of the orange player.
 */
export function renderResultScreen(blueScore: number, orangeScore: number): void {
  const result = getGameResult(blueScore, orangeScore);
  document.body.dataset.page = 'result';

  const screenContainer = document.getElementById('screen-content') as HTMLElement;
  screenContainer.innerHTML = getResultScreenTemplate(result);

  updateResultIcon(result);
  initHomeButton();
}

/**
 * Initializes the home button to navigate back to the home screen.
 */
function initHomeButton(): void {
  const homeButtonRef = document.getElementById('homeButton') as HTMLButtonElement;

  homeButtonRef.addEventListener('click', navigateToHome);
}
