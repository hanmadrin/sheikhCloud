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
import invoice_summary from "./invoice_summary.js";
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
            const neoSummary = invoice_summary({invoices:data.invoices});
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
                    const tax_rate = parseFloat(items[j].tax_rate);
                    if(invoices[i].invoice_ratetype === 'exc'){
                        invoices[i].total += (parseFloat(items[j].price)*(1+tax_rate/100)); 
                        invoices[i].tax += (tax_rate/100)*parseFloat(items[j].price);
                    }else if(invoices[i].invoice_ratetype === 'inc'){
                        invoices[i].total += parseFloat(items[j].price);
                        invoices[i].tax += (tax_rate/100)*(parseFloat(items[j].price)/(1+tax_rate/100));
                    }
                }
                invoices[i].total = `${invoices[i].total.toFixed(2)}`;
                invoices[i].tax = `${invoices[i].tax.toFixed(2)}`;
                delete invoices[i].DebitInvoiceProducts;
            };
            for(let i=0;i<invoices.length;i++){
                if(invoices[i].Client!==null){
                    invoices[i].client_name = invoices[i].Client.firstname+' '+invoices[i].Client.lastname;
                    invoices[i].email = invoices[i].Client.address_email;
                }else{
                    invoices[i].client_name = 'N/A';
                    invoices[i].email = 'N/A';
                }
                delete invoices[i].Client;
                delete invoices[i].invoice_debitorserial;
            }
            // const invoiceOrder = { serial:null,invoice_number:null, invoice_for:null, invoice_category:null, client_name:null,email:null, invoice_duedate:null, invoice_paydate:null, invoice_description:null, invoice_ratetype:null, invoice_date:null, invoice_status:null, tax:null, total:null };
            // for(let i=0;i<invoices.length;i++){
            //     invoices[i] = Object.assign(invoiceOrder, invoices[i]);
            // }
            const invoiceOrder = ['serial','invoice_number','invoice_for','invoice_category','client_name','email','invoice_duedate','invoice_paydate','invoice_description','invoice_ratetype','invoice_date','invoice_status','tax','total'];
            for(let i=0;i<invoices.length;i++){
                invoices[i] = preferredOrder(invoices[i],invoiceOrder);
            }
            
            function preferredOrder(obj, order) {
                var newObject = {};
                for(var i = 0; i < order.length; i++) {
                    if(obj.hasOwnProperty(order[i])) {
                        newObject[order[i]] = obj[order[i]];
                    }
                }
                return newObject;
            }
            const table = interactiveTable({data: invoices,interaction: debitInvoiceInteraction});
            
            const neoHeader = header();
            const root = document.getElementById(app.id);
            
            root.replaceChildren(neoHeader,filterHolder,table,neoSummary);
        }
    }catch(err){console.log(err)};
    
    
}
export default debitInvoice;