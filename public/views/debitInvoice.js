import notify from "../functions/notify.js";
import { changeTitle } from "../functions/shortHands.js";
import app from "./app.js";
import header from "./header.js";
import view from "./view.js";
import style from "../styles/style.js";
import generateDebitInvoiceParams from "../functions/generateDebitInvoiceParams.js";
import filter from "./filter.js";
import interactiveTable from "./interactiveTable.js";
import debitInvoiceInteraction from "../functions/debitInvoiceInteraction.js";
const debitInvoice = async () => {
    try{
        const response = await fetch('/api/isLoggedIn', {method: 'GET',});
        if(response.status!==200){
            window.history.pushState({},null,'/login');
            await view();
            return null;
        }
    }catch{};
    changeTitle('Debit Invoice | Sheikhcloud');
    const searchParams = generateDebitInvoiceParams();

    try{
        const response = await fetch(`/api${window.location.pathname}?${searchParams.toString()}`,{method:'GET'});
        if(response.status!==200){
            notify({data:'Error fetching invoice',type:'danger'});
        }else{
            const data = await response.json();
            const filterValues = {
                year: {values:data.distinctValues.year.map(a=>a.year.toString()),allowNull: false},
                quarter: {values: ['1','2','3','4'],allowNull: false},
                company: {values: data.distinctValues.company.map(a=>a.company),allowNull: true},
                category: {values: data.distinctValues.category.map(a=>a.category),allowNull: true},
                rateType: {values: data.distinctValues.rateType.map(a=>a.rateType),allowNull: true},
                status: {values: data.distinctValues.status.map(a=>a.status),allowNull: true},
            };
            const filterHolder = document.createElement("div");
            filterHolder.className = style.debitInvoice.filterHolder.join(' ');
            const filterKeys = Object.keys(filterValues);
            filterKeys.forEach(key=>{
                const filterElement = filter({
                    title: key,
                    options: filterValues[key].values,
                    value: searchParams.get(key),
                    paramName: key,
                    allowNull: filterValues[key].allowNull,
                    paramGenerator: generateDebitInvoiceParams,
                });
                filterHolder.append(filterElement);
            });
            
            const contentHolder = document.createElement("div");
            const invoices = data.invoices;
            for(let i=0;i<invoices.length;i++){
                const items = invoices[i].DebitInvoiceProducts;
                invoices[i].tax = 0;
                invoices[i].total = 0;
                for(let j=0;j<items.length;j++){
                    invoices[i].total += parseFloat(items[j].totalPrice);
                    const taxrate = parseFloat(items[j].taxRate);
                    if(invoices[i].invoice_ratetype === 'exc'){
                        invoices[i].tax += (taxrate/100)*parseFloat(items[j].totalPrice);
                    }else if(invoices[i].invoice_ratetype === 'inc'){
                        invoices[i].tax += (taxrate/100)*(parseFloat(items[j].totalPrice)/(1+taxrate/100));
                    }
                }
                invoices[i].total = `${invoices[i].total.toFixed(2)}`;
                invoices[i].tax = `${invoices[i].tax.toFixed(2)}`;
                delete invoices[i].DebitInvoiceProducts;
            };
            const table = interactiveTable({data: invoices,interaction: debitInvoiceInteraction});
            
            const neoHeader = header();
            const root = document.getElementById(app.id);
            root.replaceChildren(neoHeader,filterHolder,table);
        }
    }catch(err){console.log(err)};
    
    
}
export default debitInvoice;