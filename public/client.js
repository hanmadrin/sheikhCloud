import {generateLoader,showHideLoader,changeFavicon,changeTitle} from './functions/shortHands.js';
import app from './views/app.js';
import view from './views/view.js';
changeTitle('Sheikh Cloud');
changeFavicon('./public/icons/favicon.ico');
app.setup();
generateLoader();
showHideLoader(true);
await view(window.location.pathname);
window.onpopstate = ()=>{
    view(window.location.pathname);
}
