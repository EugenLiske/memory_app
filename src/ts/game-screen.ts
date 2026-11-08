
import { codeVibesTheme, gamingTheme, daProjectsTheme, foodsTheme } from './card-motifs-database';
import { renderGameOverScreen } from './game-over-screen';
import { gameSettings, type GameSettings, type PlayerKey, type ThemeKey, type BoardSizeKey } from './game-settings';
import { navigateToHome } from './navigation';
import { getCardTemplate, getGameScreenTemplate } from './templates';

const THEMES = {
  codeVibes: codeVibesTheme,
  gaming: gamingTheme,
  DAProjects: daProjectsTheme,
  foods: foodsTheme
};

const MATCH_DELAY_MS = 500;
const MISMATCH_DELAY_MS = 1000;
const GAME_OVER_DELAY_MS = 1000;
const CARDS_PER_PAIR = 2;
const FIRST_CARD_ID = 1;
const FOUR_COLUMN_BOARD_SIZE = 16;

let currentCards: CardData[] = [];
let currentPlayer: PlayerKey;
let bluePlayerScore = 0;
let orangePlayerScore = 0;

interface CardMotif {
  pairId: string;
  frontImg: string;
}

export interface CardData {
  id: number;
  pairId: string;
  frontImg: string;
  backImg: string;
}

class Card implements CardData {
  id: number;
  pairId: string;
  frontImg: string;
  backImg: string;

  /**
   * Creates a card with its ID, motif, and image paths.
   * @param id - Unique card ID.
   * @param pairId - Identifier shared by matching cards.
   * @param frontImg - Path to the front image.
   * @param backImg - Path to the back image.
   */
  constructor(id: number, pairId: string, frontImg: string, backImg: string) {
    this.id = id;
    this.pairId = pairId;
    this.frontImg = frontImg;
    this.backImg = backImg;
  }
}

/**
 * Resets the current cards, scores, and selected game settings.
 */
export function resetGameState(): void {
  currentCards = [];
  bluePlayerScore = 0;
  orangePlayerScore = 0;

  gameSettings.theme = null;
  gameSettings.player = null;
  gameSettings.boardSize = null;

  document.body.removeAttribute('data-theme');
}

/**
 * Shuffles the available card motifs.
 * @param motifs - Card motifs to shuffle.
 * @returns A shuffled copy of the motifs.
 */
function shuffleMotifs(motifs: CardMotif[]): CardMotif[] {
  const shuffledMotifs = [...motifs];

  for (let index = shuffledMotifs.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temporaryMotif = shuffledMotifs[index];
    shuffledMotifs[index] = shuffledMotifs[randomIndex];
    shuffledMotifs[randomIndex] = temporaryMotif;
  }

  return shuffledMotifs;
}

/**
 * Shuffles the generated cards.
 * @param cards - Cards to shuffle.
 * @returns A shuffled copy of the cards.
 */
function shuffleCards(cards: CardData[]): CardData[] {
  const shuffledCards = [...cards];

  for (let index = shuffledCards.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temporaryCard = shuffledCards[index];
    shuffledCards[index] = shuffledCards[randomIndex];
    shuffledCards[randomIndex] = temporaryCard;
  }

  return shuffledCards;
}

/**
 * Renders the game screen and initializes the game elements.
 * @param settings - Selected game settings.
 */
export function renderGameScreen(settings: GameSettings): void {
  if (!settings.theme || !settings.player || !settings.boardSize) return;

  currentPlayer = settings.player;
  document.body.dataset.page = 'game';
  document.body.dataset.theme = settings.theme;

  const screenContainer = document.getElementById('screen-content') as HTMLElement;
  screenContainer.innerHTML = getGameScreenTemplate();

  updateCurrentPlayerIcon();
  initGameBoard(settings);
  initCardFlip();
  initExitDialog();
}

/**
 * Updates the current player icon based on the selected theme.
 */
function updateCurrentPlayerIcon(): void {
  const playerIcon = document.getElementById('currentPlayerIcon') as HTMLImageElement;
  const currentTheme = document.body.dataset.theme;

  if (currentTheme === 'codeVibes') {
    playerIcon.src = `/assets/game-screen/icon_player_${currentPlayer}_arrow.svg`;
  } else {
    playerIcon.src = '/assets/game-screen/icon_current_player.svg';
  }

  playerIcon.dataset.player = currentPlayer;
}

/**
 * Switches the active player and updates the player icon.
 */
function switchPlayer(): void {
  if (currentPlayer === 'blue') {
    currentPlayer = 'orange';
  } else {
    currentPlayer = 'blue';
  }

  updateCurrentPlayerIcon();
}

/**
 * Generates and renders the game board.
 * @param settings - Selected game settings.
 */
export function initGameBoard(settings: GameSettings): void {
  if (!settings.theme || !settings.boardSize) return;

  const gameBoard = document.getElementById('gameBoard');
  if (!gameBoard) return;

  const cards = createGameCards(settings.theme, settings.boardSize);
  currentCards = shuffleCards(cards);

  renderGameCards(gameBoard, settings.theme);
  updateGameBoardLayout(gameBoard, settings.boardSize);
}

/**
 * Creates pairs of cards for the selected theme and board size.
 * @param themeKey - Selected game theme.
 * @param boardSize - Number of cards on the board.
 * @returns The generated card pairs.
 */
function createGameCards(themeKey: ThemeKey, boardSize: BoardSizeKey): CardData[] {
  const selectedTheme = THEMES[themeKey];
  const numberOfPairs = boardSize / CARDS_PER_PAIR;
  const shuffledMotifs = shuffleMotifs(selectedTheme.motifs);
  const selectedMotifs = shuffledMotifs.slice(0, numberOfPairs);
  const cards: CardData[] = [];

  selectedMotifs.forEach((motif, index) => {
    const firstCardId = index * CARDS_PER_PAIR + FIRST_CARD_ID;
    cards.push(new Card(firstCardId, motif.pairId, motif.frontImg, selectedTheme.backImg));
    cards.push(new Card(firstCardId + 1, motif.pairId, motif.frontImg, selectedTheme.backImg));
  });

  return cards;
}

/**
 * Renders the generated cards inside the game board.
 * @param gameBoard - Game board element.
 * @param themeKey - Selected game theme.
 */
function renderGameCards(gameBoard: HTMLElement, themeKey: ThemeKey): void {
  const cardTemplates = currentCards.map((card) => getCardTemplate(card, themeKey));
  gameBoard.innerHTML = cardTemplates.join('');
}

/**
 * Updates the number of columns based on the board size.
 * @param gameBoard - Game board element.
 * @param boardSize - Selected number of cards.
 */
function updateGameBoardLayout(gameBoard: HTMLElement, boardSize: BoardSizeKey): void {
  gameBoard.classList.remove('game-board--4-columns', 'game-board--6-columns');

  if (boardSize === FOUR_COLUMN_BOARD_SIZE) {
    gameBoard.classList.add('game-board--4-columns');
  } else {
    gameBoard.classList.add('game-board--6-columns');
  }
}

/**
 * Initializes click handling for the game cards.
 */
export function initCardFlip(): void {
  const gameBoard = document.getElementById('gameBoard');
  const flippedCards: HTMLElement[] = [];

  if (!gameBoard) return;

  gameBoard.addEventListener('click', (event: MouseEvent) => {
    handleCardClick(event, flippedCards);
  });
}

/**
 * Handles a card click and compares two flipped cards.
 * @param event - Mouse click event.
 * @param flippedCards - Currently flipped cards.
 */
function handleCardClick(event: MouseEvent, flippedCards: HTMLElement[]): void {
  const card = (event.target as HTMLElement).closest('.memory-card') as HTMLElement | null;

  if (!card || !canFlipCard(card, flippedCards)) return;

  card.classList.add('is-flipped');
  flippedCards.push(card);

  if (flippedCards.length === CARDS_PER_PAIR) {
    compareCards(flippedCards);
  }
}

/**
 * Checks whether a card can be flipped.
 * @param card - Card element to check.
 * @param flippedCards - Currently flipped cards.
 * @returns Whether the card can be flipped.
 */
function canFlipCard(card: HTMLElement, flippedCards: HTMLElement[]): boolean {
  const isFlipped = card.classList.contains('is-flipped');
  const isMatched = card.classList.contains('is-matched');
  const twoCardsFlipped = flippedCards.length === CARDS_PER_PAIR;

  return !isFlipped && !isMatched && !twoCardsFlipped;
}

/**
 * Compares two flipped cards and handles the result.
 * @param flippedCards - The two flipped card elements.
 */
function compareCards(flippedCards: HTMLElement[]): void {
  const firstCard = getCardData(flippedCards[0]);
  const secondCard = getCardData(flippedCards[1]);

  if (!firstCard || !secondCard) return;

  if (firstCard.pairId === secondCard.pairId) {
    handleMatchingCards(flippedCards);
  } else {
    handleMismatchedCards(flippedCards);
  }
}

/**
 * Finds the card data associated with a card element.
 * @param cardElement - Card element containing the card ID.
 * @returns The matching card data or undefined.
 */
function getCardData(cardElement: HTMLElement): CardData | undefined {
  const cardId = Number(cardElement.dataset.cardId);
  return currentCards.find((card) => card.id === cardId);
}

/**
 * Handles matching cards after a short delay.
 * @param flippedCards - The two matching card elements.
 */
function handleMatchingCards(flippedCards: HTMLElement[]): void {
  setTimeout(() => {
    flippedCards[0].classList.add('is-matched');
    flippedCards[1].classList.add('is-matched');
    addPlayerPoint();
    flippedCards.length = 0;
    checkGameOver();
  }, MATCH_DELAY_MS);
}

/**
 * Checks whether all pairs have been matched.
 */
function checkGameOver(): void {
  const matchedPairs = bluePlayerScore + orangePlayerScore;
  const totalPairs = currentCards.length / CARDS_PER_PAIR;

  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      renderGameOverScreen(bluePlayerScore, orangePlayerScore);
    }, GAME_OVER_DELAY_MS);
  }
}

/**
 * Flips mismatched cards back and switches the active player.
 * @param flippedCards - The two mismatched card elements.
 */
function handleMismatchedCards(flippedCards: HTMLElement[]): void {
  setTimeout(() => {
    flippedCards[0].classList.remove('is-flipped');
    flippedCards[1].classList.remove('is-flipped');
    switchPlayer();
    flippedCards.length = 0;
  }, MISMATCH_DELAY_MS);
}

/**
 * Adds one point to the current player's score.
 */
function addPlayerPoint(): void {
  if (currentPlayer === 'blue') {
    bluePlayerScore++;
    updatePlayerScore('blue', bluePlayerScore);
  } else {
    orangePlayerScore++;
    updatePlayerScore('orange', orangePlayerScore);
  }
}

/**
 * Updates the displayed score for a player.
 * @param player - Player whose score should be updated.
 * @param score - Current player score.
 */
function updatePlayerScore(player: PlayerKey, score: number): void {
  let scoreElementId: string;

  if (player === 'blue') {
    scoreElementId = 'bluePlayerCurrentScore';
  } else {
    scoreElementId = 'orangePlayerCurrentScore';
  }

  const scoreElement = document.getElementById(scoreElementId) as HTMLSpanElement;
  scoreElement.textContent = String(score);
}

/**
 * Initializes the exit dialog buttons.
 */
function initExitDialog(): void {
  const exitButton = document.querySelector('.game-screen__exit-button') as HTMLButtonElement;
  const exitDialog = document.getElementById('exitDialog') as HTMLDialogElement;
  const backButton = document.getElementById('backToGameButton') as HTMLButtonElement;
  const confirmButton = document.getElementById('confirmExitButton') as HTMLButtonElement;

  exitButton.addEventListener('click', () => {
    exitDialog.showModal();
  });
  backButton.addEventListener('click', () => {
    exitDialog.close();
  });
  confirmButton.addEventListener('click', navigateToHome);
}
