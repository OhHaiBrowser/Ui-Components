import {HamburgerMenu} from './components/hamburger-menu.js';
import {WebControls} from './components/web-controls.js';
import {TimelineSection} from './components/timeline-section.js';
import {Tab} from './components/tab-element.js';
import {FavoritesList, FavoritesItem} from './components/favorites-list.js';
import {HistoryItem, HistoryList} from './components/history-list.js';
import {FrameControls} from './components/frame_controls.js';

// Ham Burger Menu
customElements.define('hamburger-menu', HamburgerMenu);
// Web Controls - back,forward, URLbar
customElements.define('web-controls', WebControls);
// Timeline section title,actions,content
customElements.define('timeline-section', TimelineSection);
// Tabs 
customElements.define('tab-element', Tab);
// Favorites list
customElements.define('favorite-item', FavoritesItem);
customElements.define('favorites-list', FavoritesList);
// History Item
customElements.define('history-item', HistoryItem);
// History list
customElements.define('history-list', HistoryList);

customElements.define('frame-controls', FrameControls);