import { getSettingsScreenTemplate } from './templates'

export function renderSettingsScreen(){
    document.body.dataset.page = 'settings'
    
    const screenContainer = document.getElementById('screen-content') as HTMLElement;
    screenContainer.innerHTML = getSettingsScreenTemplate();

    initGameThemeSelection()
    initPlayerSelection()
    initBoardSizeSelection()
    setupThemePreview()
}

type ThemeKey = 'codeVibes' | 'gaming' | 'DAProjects' | 'foods'
type PlayerKey = 'blue' | 'orange'
type BoardSizeKey = 16 | 24 | 36

interface GameSettings {
    theme: ThemeKey | null
    player: PlayerKey | null
    boardSize: BoardSizeKey | null
}

let gameSettings: GameSettings = {
    theme: null,
    player: null,
    boardSize: null
}

function initGameThemeSelection(){
    const settingOptionsGameTheme = document.querySelectorAll('input[name="theme"]') as NodeListOf<HTMLInputElement>
    const themeSummaryText = document.getElementById('theme') as HTMLElement

    setupSettingSelection(settingOptionsGameTheme, themeSummaryText, 'theme')
}

function initPlayerSelection(){
    const settingOptionsPlayer = document.querySelectorAll('input[name="player"]') as NodeListOf<HTMLInputElement>
    const playerSummaryText = document.getElementById('player') as HTMLElement

    setupSettingSelection(settingOptionsPlayer, playerSummaryText, 'player')
}

function initBoardSizeSelection(){
    const settingOptionsBoardSize = document.querySelectorAll('input[name="board-size"]') as NodeListOf<HTMLInputElement>
    const boardSizeSummaryText = document.getElementById('boardSize') as HTMLElement

    setupSettingSelection(settingOptionsBoardSize, boardSizeSummaryText, 'boardSize')
}

function setupSettingSelection(settingOptions: NodeListOf<HTMLInputElement>, summaryBar: HTMLElement, gameSettingKey: keyof GameSettings):void{
    settingOptions.forEach(settingOption => {
        settingOption.addEventListener('change', () => {
            const settingOptionTextLabel = document.querySelector(`label[for="${settingOption.id}"]`) as HTMLElement
            const settingOptionText = settingOptionTextLabel.innerText
            summaryBar.innerText = settingOptionText

            if (gameSettingKey === 'theme') {
                gameSettings.theme = settingOption.value as ThemeKey
            }

            if (gameSettingKey === 'player') {
                gameSettings.player = settingOption.value as PlayerKey
            }

            if (gameSettingKey === 'boardSize') {
                gameSettings.boardSize = Number(settingOption.value) as BoardSizeKey
            }

            updateStartButtonState()
        })
    })
}

function updateStartButtonState(){
    const startGameButton = document.getElementById('startGameButton') as HTMLButtonElement
    const selectedTheme = document.querySelector('input[name="theme"]:checked') as HTMLElement
    const selectedPlayer = document.querySelector('input[name="player"]:checked') as HTMLElement
    const selectedBoardSize = document.querySelector('input[name="board-size"]:checked') as HTMLElement

    if(selectedTheme && selectedPlayer && selectedBoardSize){
        startGameButton.disabled = false;
    }
}

function setupThemePreview(){
    type PreviewImagesKey = 'codeVibes' | 'gaming' | 'DAProjects' | 'foods'

    const previewImages = {
        codeVibes: '/assets/settings-screen/preview_code_vibes_theme.jpg',
        gaming: '/assets/settings-screen/preview_gaming_theme.jpg',
        DAProjects: '/assets/settings-screen/preview_da_projects_theme.jpg',
        foods: '/assets/settings-screen/preview_foods_theme.jpg'
    }

    const imagePlaceholder = document.getElementById('themePreviewImage') as HTMLImageElement
    const settingOptionsContainer = document.querySelectorAll('.setting-option:has(input[name="theme"])') as NodeListOf<HTMLDivElement>
    const settingOptionsGameTheme = document.querySelectorAll('input[name="theme"]') as NodeListOf<HTMLInputElement>

    let selectedTheme: PreviewImagesKey | null = null

    settingOptionsContainer.forEach((settingOptionContainer, index) => {
        settingOptionContainer.addEventListener('mouseenter', () => {
            const hoveredTheme = settingOptionsGameTheme[index].value as PreviewImagesKey
            imagePlaceholder.src = previewImages[hoveredTheme]
        })

        settingOptionContainer.addEventListener('mouseleave', () => {
            if(selectedTheme){
                imagePlaceholder.src = previewImages[selectedTheme]
            } else {
                imagePlaceholder.removeAttribute('src')
            }
        })
    })

    settingOptionsGameTheme.forEach(settingOption => {
        settingOption.addEventListener('change', () => {
            selectedTheme = settingOption.value as PreviewImagesKey
            imagePlaceholder.src = previewImages[selectedTheme]
        })
    })
}