import app from "./app.js";
import view from "./view.js";
import header from "./header.js";
const home = async () => {
    try{
        const response = await fetch('/api/isLoggedIn', {method: 'GET',});
        if(response.status!==200){
            window.history.pushState({},null,'/login');
            await view();
            return null;
        }
    }catch{};
    
    const root = document.getElementById(app.id);
    const neoHeader = header();
    const contentHolder = document.createElement("div");
    const creditInvoice = document.createElement("button");
    creditInvoice.innerText = "Credit Invoice";
    creditInvoice.className = "btn";
    creditInvoice.addEventListener('click',async ()=>{
        window.history.pushState({},null,'/creditInvoice');
        await view();
    });
    const debitInvoice = document.createElement("button");
    debitInvoice.innerText = "Debit Invoice";
    debitInvoice.className = "btn";
    debitInvoice.addEventListener('click',async ()=>{
        window.history.pushState({},null,'/debitInvoice');
        await view();
    });
    const newDebitInvoiceButton = document.createElement("button");
    newDebitInvoiceButton.innerText = "New Debit Invoice";
    newDebitInvoiceButton.className = "btn";
    newDebitInvoiceButton.addEventListener('click',async ()=>{
        window.history.pushState({},null,'/debitInvoice/new');
        await view();
    });
    contentHolder.append(creditInvoice,debitInvoice,newDebitInvoiceButton);

    contentHolder.className = " m-5 p-5 d-flex justify-content-between align-items-center";
    root.replaceChildren(neoHeader,contentHolder);
}
export default home;