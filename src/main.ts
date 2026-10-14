import './styles/style.scss';

import { renderHomeScreen, initPlayButton } from './ts/home-screen';
import { initCardFlip } from './ts/game-screen';

initCardFlip();

renderHomeScreen();
initPlayButton();
