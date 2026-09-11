 import { renderSettingsScreen } from './settings-screen'
 import { getHomeTemplate } from "./templates";
 
 export function renderHomeScreen(){
    document.body.dataset.page = 'home'

    const screenContainer = document.getElementById('screen-content') as HTMLElement;

    screenContainer.innerHTML = getHomeTemplate();
}

export function initPlayButton(){
    const playButton = document.getElementById('playGameButton') as HTMLButtonElement

    playButton.addEventListener('click', renderSettingsScreen)
}