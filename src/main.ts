import './styles/style.scss';

import { renderHomeScreen } from './ts/home-screen';

import { initGameThemeSelection, initPlayerSelection, initBoardSizeSelection } from './ts/settings-screen';

// renderHomeScreen();

initGameThemeSelection();
initPlayerSelection();
initBoardSizeSelection();
