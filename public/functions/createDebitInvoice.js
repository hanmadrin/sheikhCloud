import style from "../styles/style.js";
import app from "../views/app.js";
import header from "../views/header.js";
import view from "../views/view.js";

const createDebitInvoice = async (invoice)=>{
    if(invoice==null){invoice = {};}
    

    const root = document.getElementById(app.id);
    const neoHeader = header();
    const neoDebitInvoiceBuilder = document.createElement("div");
    neoDebitInvoiceBuilder.className = style.neoDebitInvoiceBuilder.main.join(' ');
    const contentHolder = document.createElement("div");
    contentHolder.className = style.neoDebitInvoiceBuilder.contentHolder.join(' ');

    neoDebitInvoiceBuilder.append(contentHolder);
    root.replaceChildren(neoHeader,neoDebitInvoiceBuilder);
};
export default createDebitInvoice;