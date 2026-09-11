 export function getHomeTemplate(){
    return  `
        <main class="home-screen">
            <div class="home-screen__heading">
                <h2 class="home-screen__subtitle">
                    It's play time.
                </h2>

                <h1 class="home-screen__title">
                    Ready to play?
                </h1>
            </div>

            <button id="playGameButton" class="action-button action-button--homescreen">
                <img class="action-button__controller" src="/assets/home-screen/button_controller.svg" alt="">

                <span class="action-button__label">Play</span>

                <span class="action-button__arrow-wrapper">
                    <img
                        class="action-button__arrow action-button__arrow--default"
                        src="/assets/home-screen/button_arrow.svg"
                        alt=""
                    >

                    <img
                        class="action-button__arrow action-button__arrow--hover"
                        src="/assets/home-screen/button_arrow_hover.svg"
                        alt=""
                    >
                </span>
            </button>

            <img
                class="home-screen__decorative-controller"
                src="/assets/home-screen/tilted_controller.svg"
                alt=""
            >
        </main>
   `;
}

export function getSettingsScreenTemplate(){
    return  `
        <main class="settings-screen">
            <div class="settings-screen__title-wrapper">
                <h1 class="settings-screen__title">Settings</h1>
                <img class="settings-screen__title-decoration" src="/assets/settings-screen/headline_decoration.svg" alt="">
            </div>
    
            <div class="settings-screen__content">
                <form class="settings-screen__settings-area">
                    <fieldset class="settings-screen__group">
                        <legend class="settings-screen__group-title">
                            Game themes
                            <img class="settings-screen__group-title-icon" src="/assets/settings-screen/icon-game-themes.svg" alt="">
                        </legend>

                        <div class="setting-option">
                            <input class="setting-option__input" id="codeVibesTheme" type="radio" name="theme" value="codeVibes"/>
                            <label class="setting-option__label" for="codeVibesTheme">Code vibes theme</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                
                        <div class="setting-option">
                            <input class="setting-option__input" id="gamingTheme" type="radio" name="theme" value="gaming"/>
                            <label class="setting-option__label" for="gamingTheme">Gaming theme</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                
                        <div class="setting-option">
                            <input class="setting-option__input" id="DAProjectsTheme" type="radio" name="theme" value="DAProjects"/>
                            <label class="setting-option__label" for="DAProjectsTheme">DA Projects theme</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                
                        <div class="setting-option">
                            <input class="setting-option__input" id="foodsTheme" type="radio" name="theme" value="foods"/>
                            <label class="setting-option__label" for="foodsTheme">Foods theme</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                    </fieldset>

                    <fieldset class="settings-screen__group">
                        <legend class="settings-screen__group-title">
                            Choose player
                            <img class="settings-screen__group-title-icon" src="/assets/settings-screen/icon-choose-player.svg" alt="">
                        </legend>

                        <div class="setting-option">
                            <input class="setting-option__input" id="bluePlayer" type="radio" name="player" value="blue"/>
                            <label class="setting-option__label" for="bluePlayer">Blue</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                
                        <div class="setting-option">
                            <input class="setting-option__input" id="orangePlayer" type="radio" name="player" value="orange"/>
                            <label class="setting-option__label" for="orangePlayer">Orange</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>

                    </fieldset>

                    <fieldset class="settings-screen__group">
                        <legend class="settings-screen__group-title">
                            Board size
                            <img class="settings-screen__group-title-icon" src="/assets/settings-screen/icon-board-size.svg" alt="">
                        </legend>

                        <div class="setting-option">
                            <input class="setting-option__input" id="board16" type="radio" name="board-size" value="16"/>
                            <label class="setting-option__label" for="board16">16 cards</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                
                        <div class="setting-option">
                            <input class="setting-option__input" id="board24" type="radio" name="board-size" value="24"/>
                            <label class="setting-option__label" for="board24">24 cards</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                
                        <div class="setting-option">
                            <input class="setting-option__input" id="board36" type="radio" name="board-size" value="36"/>
                            <label class="setting-option__label" for="board36">36 cards</label>
                            <img class="setting-option__decoration" src="/assets/settings-screen/setting-option-selector.svg" alt="">
                        </div>
                    </fieldset>
                </form>

                <div class="settings-screen__preview-area">
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

                            <img class="settings-screen__summary-decoration settings-screen__summary-decoration--first" src="/assets/settings-screen/summary_bar_decoration.svg" alt="">
                            <img class="settings-screen__summary-decoration settings-screen__summary-decoration--second" src="/assets/settings-screen/summary_bar_decoration.svg" alt="">
                        </div>

                        <button id="startGameButton" class="action-button action-button--settings" disabled>
                            <img class="action-button__start-icon" src="/assets/settings-screen/icon_start_button.svg" alt="">
                            <img class="action-button__start-icon-disabled" src="/assets/settings-screen/icon_start_button_disabled.svg" alt="">

                            <span>Start</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    `
}