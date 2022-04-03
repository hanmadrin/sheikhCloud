import notFound from "./notFound.js";
import home from "./home.js";
import logIn from "./logIn.js";
import toggleLoader from "../functions/toggleLoader.js";
import { sleep } from "../functions/shortHands.js";
const view = async ()=>{
    const path = window.location.pathname;
    toggleLoader(true);
    switch(path){
        case '/': 
            await home();
        break;
        case '/login': 
            await logIn();
        break;
        default: 
            notFound();
        break;
    }
    await sleep(1000);
    toggleLoader(false);
}
export default view;