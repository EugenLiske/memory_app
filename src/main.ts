// import './styles/style.scss';

// import { renderHomeScreen, initPlayButton } from './ts/home-screen';


// renderHomeScreen();
// initPlayButton();

import './styles/style.scss'

import { renderResultScreen } from './ts/result-screen'

document.body.dataset.theme = 'gaming'

renderResultScreen(6, 6)