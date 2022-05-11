import notFound from "./notFound.js";
import home from "./home.js";
import logIn from "./logIn.js";
import toggleLoader from "../functions/toggleLoader.js";
import { sleep } from "../functions/shortHands.js";
import debitInvoice from "./debitInvoice.js";
import creditInvoice from "./creditInvoice.js";
import app from "./app.js";
import buildDebitInvoice from "./buildDebitInvoice.js";
import buildCreditInvoice from "./buildCreditInvoice.js";
import prognose from "./prognose.js";
const view = async ()=>{
    const path = window.location.pathname;
    toggleLoader(true);
    if(path==='/'){
        await home();
    }else if(path==='/login' || path==='/login/'){
        await logIn();
    }else if(path==='/prognose' || path==='/prognose/'){
        await prognose();
    }else if(path==='/debitInvoice' || path==='/debitInvoice/'){
        await debitInvoice();
    }else if(path==='/creditInvoice' || path==='/creditInvoice/'){
        await creditInvoice();
    }else if(path==='/debitInvoice/new' || path==='/debitInvoice/new/'){
        await buildDebitInvoice({option:'new',serial:null});
    }else if(path==='/creditInvoice/new' || path==='/creditInvoice/new/'){
        await buildCreditInvoice({option:'new',serial:null});
    }else if(/(^\/debitInvoice\/view\/[0-9]*$)/.test(path) || /(^\/debitInvoice\/view\/[0-9]*\/$)/.test(path)){
        const serial = (path.match(/^\/debitInvoice\/view\/([0-9]*)$/) || path.match(/^\/debitInvoice\/view\/([0-9]*)\/$/))[1];
        await buildDebitInvoice({option:'view',serial});
    }else if(/(^\/debitInvoice\/edit\/[0-9]*$)/.test(path) || /(^\/debitInvoice\/edit\/[0-9]*\/$)/.test(path)){
        const serial = (path.match(/^\/debitInvoice\/edit\/([0-9]*)$/) || path.match(/^\/debitInvoice\/edit\/([0-9]*)\/$/))[1];
        await buildDebitInvoice({option:'edit',serial});
    }else if(/(^\/debitInvoice\/clone\/[0-9]*$)/.test(path) || /(^\/debitInvoice\/clone\/[0-9]*\/$)/.test(path)){
        const serial = (path.match(/^\/debitInvoice\/clone\/([0-9]*)$/) || path.match(/^\/debitInvoice\/clone\/([0-9]*)\/$/))[1];
        await buildDebitInvoice({option:'clone',serial});
    }else if(/(^\/creditInvoice\/view\/[0-9]*$)/.test(path) || /(^\/creditInvoice\/view\/[0-9]*\/$)/.test(path)){
        const serial = (path.match(/^\/creditInvoice\/view\/([0-9]*)$/) || path.match(/^\/creditInvoice\/view\/([0-9]*)\/$/))[1];
        await buildCreditInvoice({option:'view',serial});
    }else if(/(^\/creditInvoice\/edit\/[0-9]*$)/.test(path) || /(^\/creditInvoice\/edit\/[0-9]*\/$)/.test(path)){
        const serial = (path.match(/^\/creditInvoice\/edit\/([0-9]*)$/) || path.match(/^\/creditInvoice\/edit\/([0-9]*)\/$/))[1];
        await buildCreditInvoice({option:'edit',serial});
    }else if(/(^\/creditInvoice\/clone\/[0-9]*$)/.test(path) || /(^\/creditInvoice\/clone\/[0-9]*\/$)/.test(path)){
        const serial = (path.match(/^\/creditInvoice\/clone\/([0-9]*)$/) || path.match(/^\/creditInvoice\/clone\/([0-9]*)\/$/))[1];
        await buildCreditInvoice({option:'clone',serial});
    }else{
        notFound();
    }
    // await sleep(1000);
    toggleLoader(false);
    app.setup();
}
export default view;