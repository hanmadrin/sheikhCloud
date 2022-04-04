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
    contentHolder.append(creditInvoice,debitInvoice);
    contentHolder.className = " m-5 p-5 d-flex flex-column h-200px justify-content-between align-items-center";
    root.replaceChildren(neoHeader,contentHolder);
}
export default home;