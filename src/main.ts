import './styles/style.scss';

import { renderHomeScreen, initPlayButton } from './ts/home-screen';
import { initGameBoard } from './ts/game-screen';

initGameBoard();

renderHomeScreen();
initPlayButton();
