 import type { CardData } from './game-screen'
 import type { ThemeKey } from './game-settings'


/**
 * Returns the HTML template for the home screen.
 * @returns The home screen HTML.
 */
export function getHomeTemplate(): string {
  return `
    <main class="home-screen">
      <div class="home-screen__heading">
        <p class="home-screen__subtitle">
          It's play time.
        </p>

        <h1 class="home-screen__title">
          Ready to play?
        </h1>
      </div>

      <button id="playGameButton" class="action-button action-button--homescreen">
        <img class="action-button__controller" src="./assets/home-screen/button_controller.svg" alt="">

        <span class="action-button__label">Play</span>

        <span class="action-button__arrow-wrapper">
          <img
            class="action-button__arrow action-button__arrow--default"
            src="./assets/home-screen/button_arrow.svg"
            alt=""
          >

          <img
            class="action-button__arrow action-button__arrow--hover"
            src="./assets/home-screen/button_arrow_hover.svg"
            alt=""
          >
        </span>
      </button>

      <img
        class="home-screen__decorative-controller"
        src="./assets/home-screen/tilted_controller.svg"
        alt=""
      >
    </main>
  `;
}







/**
 * Returns the HTML template for the settings screen.
 * @returns The settings screen HTML.
 */
export function getSettingsScreenTemplate(): string {
  return `
    <main class="settings-screen">
      <div class="settings-screen__title-wrapper">
        <h1 class="settings-screen__title">Settings</h1>
        <img class="settings-screen__title-decoration" src="./assets/settings-screen/headline_decoration.svg" alt="">
      </div>

      <div class="settings-screen__content">
        <form class="settings-screen__settings-area">
          <fieldset class="settings-screen__group">
            <legend class="settings-screen__group-title">
              Game themes
              <img class="settings-screen__group-title-icon" src="./assets/settings-screen/icon-game-themes.svg" alt="">
            </legend>

            <div class="setting-option">
              <input class="setting-option__input" id="codeVibesTheme" type="radio" name="theme" value="codeVibes"/>
              <label class="setting-option__label" for="codeVibesTheme">Code vibes theme</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>

            <div class="setting-option">
              <input class="setting-option__input" id="gamingTheme" type="radio" name="theme" value="gaming"/>
              <label class="setting-option__label" for="gamingTheme">Gaming theme</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>

            <div class="setting-option">
              <input class="setting-option__input" id="DAProjectsTheme" type="radio" name="theme" value="DAProjects"/>
              <label class="setting-option__label" for="DAProjectsTheme">DA Projects theme</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>

            <div class="setting-option">
              <input class="setting-option__input" id="foodsTheme" type="radio" name="theme" value="foods"/>
              <label class="setting-option__label" for="foodsTheme">Foods theme</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>
          </fieldset>

          <fieldset class="settings-screen__group">
            <legend class="settings-screen__group-title">
              Choose player
              <img class="settings-screen__group-title-icon" src="./assets/settings-screen/icon-choose-player.svg" alt="">
            </legend>

            <div class="setting-option">
              <input class="setting-option__input" id="bluePlayer" type="radio" name="player" value="blue"/>
              <label class="setting-option__label" for="bluePlayer">Blue</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>

            <div class="setting-option">
              <input class="setting-option__input" id="orangePlayer" type="radio" name="player" value="orange"/>
              <label class="setting-option__label" for="orangePlayer">Orange</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>
          </fieldset>

          <fieldset class="settings-screen__group">
            <legend class="settings-screen__group-title">
              Board size
              <img class="settings-screen__group-title-icon" src="./assets/settings-screen/icon-board-size.svg" alt="">
            </legend>

            <div class="setting-option">
              <input class="setting-option__input" id="board16" type="radio" name="board-size" value="16"/>
              <label class="setting-option__label" for="board16">16 cards</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>

            <div class="setting-option">
              <input class="setting-option__input" id="board24" type="radio" name="board-size" value="24"/>
              <label class="setting-option__label" for="board24">24 cards</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>

            <div class="setting-option">
              <input class="setting-option__input" id="board36" type="radio" name="board-size" value="36"/>
              <label class="setting-option__label" for="board36">36 cards</label>
              <img class="setting-option__decoration" src="./assets/settings-screen/setting-option-selector.svg" alt="">
            </div>
          </fieldset>
        </form>

        <section class="settings-screen__preview-area" aria-label="Game preview and selection summary">
          <div class="settings-screen__preview">
            <img id="themePreviewImage" class="settings-screen__preview-image" alt="">
          </div>

          <div class="settings-screen__summary-bar">
            <div class="settings-screen__summary-options">
              <span class="settings-screen__summary-option settings-screen__summary-option--game-theme" id="theme">
                Game theme
              </span>

              <span class="settings-screen__summary-option settings-screen__summary-option--player" id="player">
                Player
              </span>

              <span class="settings-screen__summary-option settings-screen__summary-option--board-size" id="boardSize">
                Board size
              </span>

              <img class="settings-screen__summary-decoration settings-screen__summary-decoration--first" src="./assets/settings-screen/summary_bar_decoration.svg" alt="">
              <img class="settings-screen__summary-decoration settings-screen__summary-decoration--second" src="./assets/settings-screen/summary_bar_decoration.svg" alt="">
            </div>

            <button id="startGameButton" class="action-button action-button--settings" disabled type="button">
              <img class="action-button__start-icon" src="./assets/settings-screen/icon_start_button.svg" alt="">
              <img class="action-button__start-icon-disabled" src="./assets/settings-screen/icon_start_button_disabled.svg" alt="">

              <span>Start</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  `;
}






/**
 * Returns the HTML template for a memory card.
 * @param card - Card data containing the ID and image paths.
 * @param theme - Selected theme used for the card styling.
 * @returns The memory card HTML.
 */
export function getCardTemplate(card: CardData, theme: ThemeKey):string{
    return `
        <button class="memory-card memory-card--${theme}" data-card-id="${card.id}">
            <div class="memory-card__inner">
                <div class="memory-card__back">
                    <img src="${card.backImg}" alt="">
                </div>

                <div class="memory-card__front">
                    <img src="${card.frontImg}" alt="">
                </div>
            </div>
        </button>
    `
}  






/**
 * Returns the HTML template for the game screen.
 * @returns The game screen HTML.
 */
export function getGameScreenTemplate(): string {
  return `
    <main class="game-screen">
      <header class="game-screen__header">
        <div class="game-screen__score">
          <div class="game-screen__player game-screen__player--blue">
            <img class="game-screen__player-icon-arrow" src="./assets/game-screen/icon_player_blue_arrow.svg" alt="">
            <img class="game-screen__player-icon-figure" src="./assets/game-screen/icon_player_blue_figure.svg" alt="">
            <span class="game-screen__player-name">Blue</span>
            <span class="game-screen__player-score" id="bluePlayerCurrentScore">0</span>
          </div>

          <div class="game-screen__player game-screen__player--orange">
            <img class="game-screen__player-icon-arrow" src="./assets/game-screen/icon_player_orange_arrow.svg" alt="">
            <img class="game-screen__player-icon-figure" src="./assets/game-screen/icon_player_orange_figure.svg" alt="">
            <span class="game-screen__player-name">Orange</span>
            <span class="game-screen__player-score" id="orangePlayerCurrentScore">0</span>
          </div>
        </div>

        <div class="game-screen__current-player">
          Current player:
          <img id="currentPlayerIcon" class="game-screen__current-player-icon" alt="">
        </div>

        <button class="game-screen__exit-button">
          <span class="game-screen__exit-icon" aria-hidden="true"></span>
          <span>Exit game</span>
        </button>
      </header>

      <section class="game-screen__game-area" aria-label="Memory game board">
        <div class="game-board" id="gameBoard"></div>
      </section>
    </main>
  `;
}






/**
 * Returns the HTML template for the exit confirmation dialog.
 * @returns The exit dialog HTML.
 */
export function getExitDialogTemplate():string {
    return `
        <dialog class="exit-dialog" id="exitDialog">
            <h2 class="exit-dialog__title">
                Are you sure you want to quit the game?
            </h2>

            <div class="exit-dialog__actions">
                <button
                    class="exit-dialog__button exit-dialog__button--back"
                    id="backToGameButton"
                    type="button"
                    autofocus
                >
                    Back to game
                </button>

                <button
                    class="exit-dialog__button exit-dialog__button--exit"
                    id="confirmExitButton"
                    type="button"
                >
                    Exit game
                </button>
            </div>
        </dialog>
    `
}






/**
 * Returns the HTML template for the game over screen.
 * @param blueScore - Final score of the blue player.
 * @param orangeScore - Final score of the orange player.
 * @returns The game over screen HTML.
 */
export function getGameOverScreenTemplate(blueScore: number, orangeScore: number): string {
  return `
    <main class="game-over-screen">
      <h1 class="game-over-screen__title">Game over</h1>

      <section class="game-over-screen__result" aria-labelledby="finalScoreHeading">
        <h2 class="game-over-screen__label" id="finalScoreHeading">Final score</h2>

        <div class="game-over-screen__score">
          <div class="game-over-screen__player game-over-screen__player--blue">
            <img class="game-over-screen__player-icon-arrow" src="./assets/game-screen/icon_player_blue_arrow.svg" alt="">
            <img class="game-over-screen__player-icon-figure" src="./assets/game-screen/icon_player_blue_figure.svg" alt="">
            <span class="game-over-screen__player-name">Blue</span>
            <span class="game-over-screen__player-points">${blueScore}</span>
          </div>

          <div class="game-over-screen__player game-over-screen__player--orange">
            <img class="game-over-screen__player-icon-arrow" src="./assets/game-screen/icon_player_orange_arrow.svg" alt="">
            <img class="game-over-screen__player-icon-figure" src="./assets/game-screen/icon_player_orange_figure.svg" alt="">
            <span class="game-over-screen__player-name">Orange</span>
            <span class="game-over-screen__player-points">${orangeScore}</span>
          </div>
        </div>
      </section>
    </main>
  `;
}







/**
 * Returns the HTML template for the final result screen.
 * @param result - Winning player or draw.
 * @param subtitle - Subtitle displayed above the result.
 * @param title - Main title displayed on the result screen.
 * @returns The result screen HTML.
 */
export function getResultScreenTemplate(result: 'blue' | 'orange' | 'draw', subtitle: string, title: string): string {
  return `
    <main class="result-screen result-screen--${result}">
      <img
        class="result-screen__confetti"
        src="./assets/winner-and-draw-screen/icon-winner-confetti-code-vibes-theme.svg"
        alt=""
      >

      <div class="result-screen__content">
        <p class="result-screen__subtitle">${subtitle}</p>

        <h1 class="result-screen__title">${title}</h1>

        <img
          class="result-screen__icon"
          id="resultIcon"
          alt=""
        >

        <button
          class="result-screen__home-button"
          id="homeButton"
        >
          Home
        </button>
      </div>
    </main>
  `;
}

