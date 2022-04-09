import notFound from "./notFound.js";
import home from "./home.js";
import logIn from "./logIn.js";
import toggleLoader from "../functions/toggleLoader.js";
import { sleep } from "../functions/shortHands.js";
import debitInvoice from "./debitInvoice.js";
import creditInvoice from "./creditInvoice.js";
import app from "./app.js";
import newDebitInvoice from "./newDebitInvoice.js";
const view = async ()=>{
    const path = window.location.pathname;
    toggleLoader(true);
    switch(path){
        case '/': 
            await home();
        break;
        case '/login': 
        case '/login/': 
            await logIn();
        break;
        case '/debitInvoice':
        case '/debitInvoice/':
            await debitInvoice(); 
        break;
        case '/debitInvoice/new':
        case '/debitInvoice/new/':
            await newDebitInvoice();
        break;
        case '/creditInvoice':
        case '/creditInvoice/':
            await creditInvoice(); 
        break;
        default: 
            notFound();
        break;
    }
    // await sleep(1000);
    toggleLoader(false);
    app.setup();
}
export default view;