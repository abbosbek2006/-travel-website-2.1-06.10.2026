import { loadState } from './core/store.js';
import { renderPage } from './core/router.js';
import { configureNavigation } from './core/navigation.js';
import { initActions } from './features/actions.js';
import { initInterface } from './features/interface.js';
import { initDialogs } from './components/dialog.js';
import { initAccount } from './features/account.js';
import { initMemories } from './features/memories.js';
import { initPromotions, renderPromo } from './features/promotions.js';
import { initWelcome, startWelcome } from './features/welcome.js';

document.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement && !event.target.dataset.fallback) {
    event.target.dataset.fallback = 'true';
    event.target.src = './assets/fallback.svg';
  }
}, true);

loadState();
configureNavigation(renderPage);
initDialogs();
initActions();
initInterface();
initAccount();
initMemories();
initPromotions();
initWelcome();
renderPage();
renderPromo();
startWelcome();
