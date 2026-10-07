export type ThemeKey = 'codeVibes' | 'gaming' | 'DAProjects' | 'foods'
export type PlayerKey = 'blue' | 'orange'
export type BoardSizeKey = 16 | 24 | 36

export interface GameSettings {
    theme: ThemeKey | null
    player: PlayerKey | null
    boardSize: BoardSizeKey | null
}

export let gameSettings: GameSettings = {
    theme: null,
    player: null,
    boardSize: null
}