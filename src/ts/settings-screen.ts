export function initGameThemeSelection(){
    const settingOptionsGameTheme = document.querySelectorAll('input[name="theme"]') as NodeListOf<HTMLInputElement>
    const themeSummaryText = document.getElementById('theme') as HTMLElement

    setupSummaryBarUpdate(settingOptionsGameTheme, themeSummaryText)
}

export function initPlayerSelection(){
    const settingOptionsPlayer = document.querySelectorAll('input[name="player"]') as NodeListOf<HTMLInputElement>
    const playerSummaryText = document.getElementById('player') as HTMLElement

    setupSummaryBarUpdate(settingOptionsPlayer, playerSummaryText)
}

export function initBoardSizeSelection(){
    const settingOptionsBoardSize = document.querySelectorAll('input[name="board-size"]') as NodeListOf<HTMLInputElement>
    const boardSizeSummaryText = document.getElementById('boardSize') as HTMLElement

    setupSummaryBarUpdate(settingOptionsBoardSize, boardSizeSummaryText)
}

function setupSummaryBarUpdate(settingOptions: NodeListOf<HTMLInputElement>, summaryBar: HTMLElement):void{
    settingOptions.forEach(settingOption => {
        settingOption.addEventListener('change', () => {
            const settingOptionTextLabel = document.querySelector(`label[for="${settingOption.id}"]`) as HTMLElement
            const settingOptionText = settingOptionTextLabel.innerText
            summaryBar.innerText = settingOptionText
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

export function setupThemePreview(){
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