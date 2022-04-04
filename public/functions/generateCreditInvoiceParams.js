const generateCreditInvoiceParams = () => {
    const validParams = [
        {dbColumn:'invoice_date',name:'year',default: `${new Date().getFullYear()}`},
        {dbColumn:'invoice_date_quarter',name:'quarter',default: `${new Date().getMonth()<3?1:new Date().getMonth()<6?2:new Date().getMonth()<9?3:4}`},
        {dbColumn:'invoice_for',name:'company',default: ''},
        {dbColumn:'invoice_status',name:'status',default: ''}
    ];
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value,key)=>{
        if(!validParams.find(param=>param.name===key)){
            searchParams.delete(key);
        }
    });
    for(let i=0;i<validParams.length;i++){
        if(!searchParams.has(validParams[i].name)){
            searchParams.append(validParams[i].name,validParams[i].default);
        }
    }
    return searchParams;
}
export default generateCreditInvoiceParams;