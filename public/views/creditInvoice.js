import notify from "../functions/notify.js";
import { changeTitle } from "../functions/shortHands.js";
import app from "./app.js";
import header from "./header.js";
import view from "./view.js";
import style from "../styles/style.js";
import generateCreditInvoiceParams from "../functions/generateCreditInvoiceParams.js";
import filter from "./filter.js";
import interactiveTable from "./interactiveTable.js";
const creditInvoice = async () => {
    try{
        const response = await fetch('/api/isLoggedIn', {method: 'GET',});
        if(response.status!==200){
            window.history.pushState({},null,'/login');
            await view();
            return null;
        }
    }catch{};
    changeTitle('Credit Invoice | Sheikhcloud');
    const searchParams = generateCreditInvoiceParams();

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
                status: {values: data.distinctValues.status.map(a=>a.status),allowNull: true},
            };
            const filterHolder = document.createElement("div");
            filterHolder.className = style.creditInvoice.filterHolder.join(' ');
            const filterKeys = Object.keys(filterValues);
            filterKeys.forEach(key=>{
                const filterElement = filter({
                    title: key,
                    options: filterValues[key].values,
                    value: searchParams.get(key),
                    paramName: key,
                    allowNull: filterValues[key].allowNull,
                    paramGenerator: generateCreditInvoiceParams,
                });
                filterHolder.append(filterElement);
            });
            
            const contentHolder = document.createElement("div");
            const table = interactiveTable({data: data.invoices,interaction: function(){}});

            const neoHeader = header();
            const root = document.getElementById(app.id);
            root.replaceChildren(neoHeader,filterHolder,table);
        }
    }catch{};
    
    
}
export default creditInvoice;