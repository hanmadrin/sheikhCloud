import { showHideLoader, sleep } from "../functions/shortHands.js";
import notFound from "./notFound.js";
import home from "./home.js";
const view = async (path)=>{
    showHideLoader(true);
    switch(path){
        case '/': 
            await home();
        break;
        default: 
            notFound();
        break;
    }
    showHideLoader(false);
}
export default view;