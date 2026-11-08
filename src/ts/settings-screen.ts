
import { renderGameScreen } from './game-screen';
import {
  gameSettings,
  type GameSettings,
  type ThemeKey,
  type PlayerKey,
  type BoardSizeKey
} from './game-settings';
import { getSettingsScreenTemplate } from './templates';

const PREVIEW_IMAGES: Record<ThemeKey, string> = {
  codeVibes: '/assets/settings-screen/preview_code_vibes_theme.jpg',
  gaming: '/assets/settings-screen/preview_gaming_theme.jpg',
  DAProjects: '/assets/settings-screen/preview_da_projects_theme.jpg',
  foods: '/assets/settings-screen/preview_foods_theme.jpg'
};

/**
 * Renders the settings screen and initializes its interactive elements.
 */
export function renderSettingsScreen(): void {
  document.body.dataset.page = 'settings';

  const screenContainer = document.getElementById('screen-content') as HTMLElement;
  screenContainer.innerHTML = getSettingsScreenTemplate();

  initGameThemeSelection();
  initPlayerSelection();
  initBoardSizeSelection();
  setupThemePreview();
  initStartGameButton();
}

/**
 * Initializes the game theme selection.
 */
function initGameThemeSelection(): void {
  const options = document.querySelectorAll('input[name="theme"]') as NodeListOf<HTMLInputElement>;
  const summaryBar = document.getElementById('theme') as HTMLElement;

  setupSettingSelection(options, summaryBar, 'theme');
}

/**
 * Initializes the player selection.
 */
function initPlayerSelection(): void {
  const options = document.querySelectorAll('input[name="player"]') as NodeListOf<HTMLInputElement>;
  const summaryBar = document.getElementById('player') as HTMLElement;

  setupSettingSelection(options, summaryBar, 'player');
}

/**
 * Initializes the board size selection.
 */
function initBoardSizeSelection(): void {
  const options = document.querySelectorAll('input[name="board-size"]') as NodeListOf<HTMLInputElement>;
  const summaryBar = document.getElementById('boardSize') as HTMLElement;

  setupSettingSelection(options, summaryBar, 'boardSize');
}

/**
 * Registers change listeners for a group of setting options.
 * @param options - Available radio button options.
 * @param summaryBar - Element displaying the selected option.
 * @param settingKey - Property to update in the game settings.
 */
function setupSettingSelection(options: NodeListOf<HTMLInputElement>, summaryBar: HTMLElement, settingKey: keyof GameSettings): void {
  options.forEach((option) => {
    option.addEventListener('change', () => {
      handleSettingChange(option, summaryBar, settingKey);
    });
  });
}

/**
 * Updates the selected setting, summary text, and start button state.
 * @param option - The selected radio button.
 * @param summaryBar - Element displaying the selected option.
 * @param settingKey - Property to update in the game settings.
 */
function handleSettingChange(option: HTMLInputElement, summaryBar: HTMLElement, settingKey: keyof GameSettings): void {
  const label = document.querySelector(`label[for="${option.id}"]`) as HTMLElement;
  summaryBar.innerText = label.innerText;

  updateGameSetting(settingKey, option.value);
  updateStartButtonState();
}

/**
 * Stores the selected value in the game settings.
 * @param settingKey - Setting to update.
 * @param value - Selected radio button value.
 */
function updateGameSetting(settingKey: keyof GameSettings, value: string): void {
  if (settingKey === 'theme') {
    gameSettings.theme = value as ThemeKey;
  } else if (settingKey === 'player') {
    gameSettings.player = value as PlayerKey;
  } else if (settingKey === 'boardSize') {
    gameSettings.boardSize = Number(value) as BoardSizeKey;
  }
}

/**
 * Enables the start button when all required settings are selected.
 */
function updateStartButtonState(): void {
  const startButton = document.getElementById('startGameButton') as HTMLButtonElement;
  const theme = document.querySelector('input[name="theme"]:checked');
  const player = document.querySelector('input[name="player"]:checked');
  const boardSize = document.querySelector('input[name="board-size"]:checked');

  if (theme && player && boardSize) {
    startButton.disabled = false;
  }
}

/**
 * Initializes the theme preview and its selection listeners.
 */
function setupThemePreview(): void {
  const previewImage = document.getElementById('themePreviewImage') as HTMLImageElement;
  const options = document.querySelectorAll('input[name="theme"]') as NodeListOf<HTMLInputElement>;
  const containers = document.querySelectorAll('.setting-option:has(input[name="theme"])') as NodeListOf<HTMLDivElement>;

  initThemeHoverPreview(containers, options, previewImage);
  initSelectedThemePreview(options, previewImage);
}

/**
 * Registers hover listeners for the theme preview.
 * @param containers - Theme option containers.
 * @param options - Theme radio buttons.
 * @param previewImage - Image element displaying the preview.
 */
function initThemeHoverPreview(containers: NodeListOf<HTMLDivElement>, options: NodeListOf<HTMLInputElement>, previewImage: HTMLImageElement): void {
  containers.forEach((container, index) => {
    container.addEventListener('mouseenter', () => {
      previewImage.src = PREVIEW_IMAGES[options[index].value as ThemeKey];
    });
    container.addEventListener('mouseleave', () => {
      restoreSelectedThemePreview(options, previewImage);
    });
  });
}

/**
 * Restores the selected theme preview after hovering.
 * @param options - Theme radio buttons.
 * @param previewImage - Image element displaying the preview.
 */
function restoreSelectedThemePreview(options: NodeListOf<HTMLInputElement>, previewImage: HTMLImageElement): void {
  const selectedOption = Array.from(options).find((option) => option.checked);

  if (selectedOption) {
    previewImage.src = PREVIEW_IMAGES[selectedOption.value as ThemeKey];
  } else {
    previewImage.removeAttribute('src');
  }
}

/**
 * Updates the preview when a theme is selected.
 * @param options - Theme radio buttons.
 * @param previewImage - Image element displaying the preview.
 */
function initSelectedThemePreview(options: NodeListOf<HTMLInputElement>, previewImage: HTMLImageElement): void {
  options.forEach((option) => {
    option.addEventListener('change', () => {
      previewImage.src = PREVIEW_IMAGES[option.value as ThemeKey];
    });
  });
}

/**
 * Initializes the start button to launch the game.
 */
function initStartGameButton(): void {
  const startButton = document.getElementById('startGameButton') as HTMLButtonElement;

  startButton.addEventListener('click', () => {
    renderGameScreen(gameSettings);
  });
}
