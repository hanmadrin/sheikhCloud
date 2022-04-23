import createCreditInvoice from "../functions/createCreditInvoice.js";
import notFound from "./notFound.js";
import view from "./view.js";
const buildCreditInvoice = async ({option,serial})=>{
    try{
        const response = await fetch('/api/isLoggedIn', {method: 'GET',});
        if(response.status!==200){
            window.history.pushState({},null,'/login');
            await view();
            return null;
        }
    }catch{};
    if(option==='new'){
        await createCreditInvoice({invoice:{},option:'new',serial:null});
    }else{
        const invoiceData = await fetch(`/api/creditInvoice/${serial}`, {method: 'GET',});
        if(invoiceData.status!==200){
            notFound();
            return null;
        }
        const invoice = await invoiceData.json();
        console.log(invoice);        
        await createCreditInvoice({invoice,option,serial});
    }
};
export default buildCreditInvoice;