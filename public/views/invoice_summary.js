import style from "../styles/style.js";
import { contentGenerator, taxCalculationFromInvoice, taxCalculationFromProductList } from "../functions/taxCalculation.js";
const invoice_summary = ({invoices})=>{
    const neoSummary = document.createElement("div");
    neoSummary.className = style.neoSummary.main.join(' ');
    const content = document.createElement("div");
    content.className = style.neoSummary.content.join(' ');
    if(invoices.length!==0){
        if(invoices[0].DebitInvoiceProducts===undefined){
            const uitgavencontent = contentGenerator({title:'Debit',data:taxCalculationFromInvoice(invoices)});
            content.append(uitgavencontent);
        }else{
            const uitbetalingen = invoices.map(invoice=>{if(invoice.invoice_category=='uitbetalingen')return invoice});
            const rittenUitbesteed = invoices.map(invoice=>{if(invoice.invoice_category=='rittenUitbesteed')return invoice});
            const debit = invoices.map(invoice=>{if(invoice.invoice_category!='uitbetalingen' && invoice.invoice_category!='rittenUitbesteed')return invoice});
            const uitbetalingenContent = contentGenerator({title:'Uitbetalingen',data:taxCalculationFromProductList(uitbetalingen)});
            const rittenUitbesteedContent = contentGenerator({title:'Ritten uitbesteed',data:taxCalculationFromProductList(rittenUitbesteed)});
            const debitContent = contentGenerator({title:'Debit',data:taxCalculationFromProductList(debit)});

            content.append(uitbetalingenContent,rittenUitbesteedContent,debitContent);
        }
    }
    neoSummary.append(content);
    return neoSummary;
};
export default invoice_summary;