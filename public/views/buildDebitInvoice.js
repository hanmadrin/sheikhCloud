import createDebitInvoice from "../functions/createDebitInvoice.js";
import notFound from "./notFound.js";
import view from "./view.js";
const buildDebitInvoice = async ({option,serial})=>{
    try{
        const response = await fetch('/api/isLoggedIn', {method: 'GET',});
        if(response.status!==200){
            window.history.pushState({},null,'/login');
            await view();
            return null;
        }
    }catch{};
    if(option==='new'){
        await createDebitInvoice({invoice:{},option:'new',serial:null});
    }else{
        const invoiceData = await fetch(`/api/debitInvoice/${serial}`, {method: 'GET',});
        if(invoiceData.status!==200){
            notFound();
            return null;
        }
        const invoice = await invoiceData.json();
        console.log(invoice);
        for(let i=0;i<invoice.DebitInvoiceProducts.length;i++){
            delete invoice.DebitInvoiceProducts[i].serial;
            delete invoice.DebitInvoiceProducts[i].invoice_serial;
        }
        
        await createDebitInvoice({invoice,option,serial});
    }
};
export default buildDebitInvoice;