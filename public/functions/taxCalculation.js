import style from "../styles/style.js";
const taxCalculationFromProductList = (invoices)=>{
    let total = 0;
    let tax9 = 0;
    let tax21 = 0;
    invoices.forEach(invoice=>{
        if(invoice!==undefined){
            const products = invoice.DebitInvoiceProducts;
            const rateType = invoice.invoice_rateType;
            products.forEach(product=>{
                const price = parseFloat(product.price);
                const tax_rate = parseFloat(product.tax_rate);
                const excludedPrice = rateType==='exc'?price:price/(1+tax_rate/100);
                const productTotal = rateType==='exc'?excludedPrice*(1+tax_rate/100):price;
                total += rateType==='exc'?price*(1+tax_rate/100):price;
                tax9 += tax_rate===9?(productTotal-excludedPrice):0;
                tax21 += tax_rate===21?(productTotal-excludedPrice):0;
            });
        }
    });
    return {total,tax9,tax21};
};
const taxCalculationFromInvoice = (invoices)=>{
    let total = 0;
    let tax = 0;
    invoices.forEach(invoice=>{
        tax += parseFloat(invoice.invoice_tax);
        total += parseFloat(invoice.invoice_total);
        // console.log(tax,total);
    });
    return {total,tax};
};
const contentGenerator = ({data,title})=>{
    const holder = document.createElement("div");
    holder.className = style.neoPrognose.contentHolder.join(' ');
    const titleHolder = document.createElement("h3");
    titleHolder.innerText = title;
    const tax9Holder = document.createElement("div");
    const tax21Holder = document.createElement("div");
    const taxHolder = document.createElement("div");
    const totalHolder = document.createElement("div");
    tax9Holder.className = style.neoPrognose.priceHolder.join(' ');
    tax21Holder.className = style.neoPrognose.priceHolder.join(' ');
    taxHolder.className = style.neoPrognose.priceHolder.join(' ');
    totalHolder.className = style.neoPrognose.priceHolder.join(' ');
    const tax9Key = document.createElement("div");
    const tax21Key = document.createElement("div");
    const taxKey = document.createElement("div");
    const totalKey = document.createElement("div");
    const tax9Value = document.createElement("div");
    const tax21Value = document.createElement("div");
    const taxValue = document.createElement("div");
    const totalValue = document.createElement("div");
    tax9Key.innerText = 'BTW Laag';
    tax21Key.innerText = 'BTW Hoog';
    taxKey.innerText = 'BTW Totaal';
    totalKey.innerText = 'Totaal';
    
    tax9Holder.append(tax9Key,tax9Value);
    tax21Holder.append(tax21Key,tax21Value);
    taxHolder.append(taxKey,taxValue);
    totalHolder.append(totalKey,totalValue);
    if(data.tax!=null){
        taxValue.innerText = `€ ${data.tax.toFixed(2)}`;
        holder.append(titleHolder,taxHolder,totalHolder);
    }else{
        tax9Value.innerText = `€ ${data.tax9.toFixed(2)}`;
        tax21Value.innerText = `€ ${data.tax21.toFixed(2)}`;
        holder.append(titleHolder,tax9Holder,tax21Holder,totalHolder);
    }
    totalValue.innerText = `€ ${data.total.toFixed(2)}`;
    
    return holder;
};
export {taxCalculationFromProductList,taxCalculationFromInvoice,contentGenerator};