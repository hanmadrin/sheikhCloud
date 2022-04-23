import style from "../styles/style.js";
import app from "../views/app.js";
import header from "../views/header.js";
// import view from "../views/view.js";
import notify from "./notify.js";

const createCreditInvoice = async ({invoice,option,serial})=>{

    const root = document.getElementById(app.id);
    const neoHeader = header();
    const neoCreditInvoiceBuilder = document.createElement("div");
    neoCreditInvoiceBuilder.className = style.neoCreditInvoiceBuilder.main.join(" ");
    const contentHolder = document.createElement("div");
    contentHolder.className = style.neoCreditInvoiceBuilder.contentHolder.join(' ');

    const h3 = document.createElement("h3");
    h3.innerText = `${(option=='new')?'Create New':(option=='view')?'View Existing':(option=='clone')?'Cloning Existing For New':'Edit Existing'} Credit Invoice`;
    h3.className = style.neoDebitInvoiceBuilder.h3.join(' ');
    contentHolder.append(h3);
    //get categories
    const creditInvoiceEssentialssFetch = await fetch('/api/creditInvoice/essentials',{method:'GET',});
    const creditInvoiceEssentials = await creditInvoiceEssentialssFetch.json();
    console.log(creditInvoiceEssentials);
    const creditInvoiceCreditors = creditInvoiceEssentials.creditors.map(a=>a.creditor)

    const invoiceNumberHolder = document.createElement("div");
    invoiceNumberHolder.className = style.neoCreditInvoiceBuilder.inputHolder.join(' ');
    const invoiceNumberlabel = document.createElement("label");
    invoiceNumberlabel.innerText = "Invoice Number";
    invoiceNumberlabel.className = style.neoCreditInvoiceBuilder.label.join(' ');
    const invoiceNumberInput = document.createElement("input");
    invoiceNumberInput.className = style.neoCreditInvoiceBuilder.input.join(' ');
    invoiceNumberInput.type = "text";
    if(option=='clone'){
        invoice.invoice_number = '';
    }
    invoiceNumberInput.value = (option=='new')?null:invoice.invoice_number;
    invoiceNumberHolder.append(invoiceNumberlabel,invoiceNumberInput);
    invoice.invoice_number = invoiceNumberInput.value;
    invoiceNumberInput.addEventListener('change',()=>{
        invoice.invoice_number = invoiceNumberInput.value;
    });
    if(option=='view'){
        invoiceNumberInput.disabled = true;
    }
    // invoice_for
    const companyHolder = document.createElement("div");
    companyHolder.className = style.neoCreditInvoiceBuilder.inputHolder.join(' ');
    const companyLabel = document.createElement("label");
    companyLabel.innerText = "Invoice For";
    const companySelector = document.createElement("select");
    companySelector.className = style.neoCreditInvoiceBuilder.selector.join(' ');
    companySelector.name = "invoice_for";
    const companies = ['ztr','sheikh','groced','other'];
    const defaultCompanyOption = document.createElement("option");
    defaultCompanyOption.value = "";
    defaultCompanyOption.innerText = "Select a Company";
    companySelector.append(defaultCompanyOption);
    for(let i=0;i<companies.length;i++){
        const company = companies[i];
        const option = document.createElement("option");
        option.value = company;
        option.selected = (company==invoice.invoice_for);
        option.innerText = company;
        companySelector.append(option);
    }
    defaultCompanyOption.disabled = true;
    if(option=='view'){companySelector.setAttribute('disabled',true);}
    companySelector.onchange= ()=>{
        invoice.invoice_for = companySelector.value;
    };
    invoice.invoice_for = (invoice.invoice_for==null)?null:invoice.invoice_for;
    companyHolder.append(companyLabel,companySelector);
    //invoice_status
    const statuses = ['betaald','onbetaald'];
    const statusHolder = document.createElement("div");
    statusHolder.className = style.neoCreditInvoiceBuilder.inputHolder.join(' ');
    const statusLabel = document.createElement("label");
    statusLabel.innerText = "Invoice Status";
    const statusSelector = document.createElement("select");
    statusSelector.className = style.neoCreditInvoiceBuilder.selector.join(' ');
    statusSelector.name = "invoice_status";
    const defaultStatusOption = document.createElement("option");
    for(let i=0;i<statuses.length;i++){
        const status = statuses[i];
        const option = document.createElement("option");
        option.value = status;
        option.selected = (status==invoice.invoice_status);
        option.innerText = status;
        statusSelector.append(option);
    }
    if(option=='view'){statusSelector.setAttribute('disabled',true);}
    statusSelector.onchange= ()=>{
        invoice.invoice_status = statusSelector.value;
    };
    statusHolder.append(statusLabel,statusSelector);

    //invoice_date
    const dateHolder = document.createElement("div");
    dateHolder.className = style.neoDynamicContent.inputHolder.join(' ');
    const dateLabel = document.createElement("label");
    dateLabel.innerText = "Invoice Date";
    const dateInput = document.createElement("input");
    dateInput.className = style.neoDynamicContent.dateInput.join(' ');
    dateInput.type = "date";
    dateInput.name = "invoice_date";
    dateInput.value = (option=='new')?new Date().toISOString().substring(0,10):invoice.invoice_date;
    invoice.invoice_date = dateInput.value;
    dateInput.onchange= ()=>{
        invoice.invoice_date = dateInput.value;
    };
    if(option=='view'){dateInput.setAttribute('disabled',true);}
    dateHolder.append(dateLabel,dateInput);
    //invoice_paydate
    const payDateHolder = document.createElement("div");
    payDateHolder.className = style.neoDynamicContent.inputHolder.join(' ');
    const payDateLabel = document.createElement("label");
    payDateLabel.innerText = "Invoice Pay Date";
    const payDateInput = document.createElement("input");
    payDateInput.className = style.neoDynamicContent.dateInput.join(' ');
    payDateInput.type = "date";
    payDateInput.name = "invoice_paydate";
    payDateInput.value = (option=='new')?new Date().toISOString().substring(0,10):invoice.invoice_paydate;
    invoice.invoice_paydate = payDateInput.value;
    payDateInput.onchange= ()=>{
        invoice.invoice_paydate = payDateInput.value;
    };
    if(option=='view'){payDateInput.setAttribute('disabled',true);}
    payDateHolder.append(payDateLabel,payDateInput);
    // invoice_creditor
    const creditorHolder = document.createElement("div");
    creditorHolder.className = style.neoCreditInvoiceBuilder.inputHolder.join(' ');
    const creditorLabel = document.createElement("label");
    creditorLabel.innerText = "Creditor";
    const creditorInput = document.createElement("input");
    creditorInput.className = style.neoCreditInvoiceBuilder.input.join(' ');
    creditorInput.type = "text";
    creditorInput.setAttribute('list',"creditorsList");
    creditorInput.value = (option=='new')?null:invoice.invoice_creditor;
    const creditordataList = document.createElement("datalist");
    creditordataList.id = "creditorsList";
    const creditors = creditInvoiceCreditors.sort();
    for(let i=0;i<creditors.length;i++){
        const creditor = creditors[i];
        const option = document.createElement("option");
        option.value = creditor;
        creditordataList.append(option);
    }
    if(option=='view'){creditorInput.setAttribute('disabled',true);}
    creditorInput.onchange= ()=>{
        invoice.invoice_creditor = creditorInput.value;
    };
    invoice.invoice_creditor = (invoice.invoice_creditor==null)?null:invoice.invoice_creditor;
    creditorHolder.append(creditorLabel,creditorInput,creditordataList);

    //invoice_dexcription
    const descriptionHolder = document.createElement("div");
    descriptionHolder.className = style.neoDynamicContent.inputHolder.join(' ');
    const descriptionLabel = document.createElement("label");
    descriptionLabel.innerText = "Invoice Description";
    const descriptionInput = document.createElement("input");
    descriptionInput.className = style.neoDynamicContent.descriptionInput.join(' ');
    descriptionInput.type = "text";
    descriptionInput.name = "invoice_description";
    descriptionInput.value = invoice.invoice_description==null?"":invoice.invoice_description;
    invoice.invoice_description = descriptionInput.value;
    descriptionInput.onchange= ()=>{
        invoice.invoice_description = descriptionInput.value;
    };
    if(option=='view'){descriptionInput.setAttribute('disabled',true);}
    descriptionHolder.append(descriptionLabel,descriptionInput);
    // invoice_total
    const priceHolder = document.createElement("div");
    priceHolder.className = style.neoCreditInvoiceBuilder.inputHolder.join(' ');
    const priceLabel = document.createElement("label");
    priceLabel.innerText = "Price";
    const priceInput = document.createElement("input");
    priceInput.className = style.neoCreditInvoiceBuilder.input.join(' ');
    priceInput.type = "number";
    priceInput.value = invoice.invoice_total;
    invoice.invoice_total = priceInput.value;
    priceInput.onchange= ()=>{
        priceInput.value = parseFloat(priceInput.value).toFixed(2);
        invoice.invoice_total = priceInput.value;
    }; 
    if(option=='view'){priceInput.setAttribute('disabled',true);}
    priceHolder.append(priceLabel,priceInput);
    // invoice_tax
    const taxHolder = document.createElement("div");
    taxHolder.className = style.neoCreditInvoiceBuilder.inputHolder.join(' ');
    const taxLabel = document.createElement("label");
    taxLabel.innerText = "Tax";
    const taxInput = document.createElement("input");
    taxInput.className = style.neoCreditInvoiceBuilder.input.join(' ');
    taxInput.type = "number";
    taxInput.value = invoice.invoice_tax;
    invoice.invoice_tax = taxInput.value;
    taxInput.onchange= ()=>{
        taxInput.value = parseFloat(taxInput.value).toFixed(2);
        invoice.invoice_tax = taxInput.value;
    }; 
    if(option=='view'){taxInput.setAttribute('disabled',true);}
    taxHolder.append(taxLabel,taxInput);
        
    const numberCompanyHolder = document.createElement("div");
    numberCompanyHolder.className = style.neoCreditInvoiceBuilder.inputsHolder.join(' ');
    numberCompanyHolder.append(invoiceNumberHolder,companyHolder);

    const creditorStatusHolder = document.createElement("div");
    creditorStatusHolder.className = style.neoCreditInvoiceBuilder.inputsHolder.join(' ');
    creditorStatusHolder.append(creditorHolder,statusHolder);

    const datePayDateHolder = document.createElement("div");
    datePayDateHolder.className = style.neoCreditInvoiceBuilder.inputsHolder.join(' ');
    datePayDateHolder.append(dateHolder,payDateHolder);
    
    const priceTaxHolder = document.createElement("div");
    priceTaxHolder.className = style.neoCreditInvoiceBuilder.inputsHolder.join(' ');
    priceTaxHolder.append(taxHolder,priceHolder);


    contentHolder.append(numberCompanyHolder,creditorStatusHolder,datePayDateHolder,descriptionHolder,priceTaxHolder);
    
    //file upload
    const fileUploadInput = document.createElement("input");
    if(option!='view'){
        const fileUploadHolder = document.createElement("div");
        fileUploadHolder.className = style.neoCreditInvoiceBuilder.inputHolder.join(' ');
        const fileUploadLabel = document.createElement("label");
        fileUploadLabel.innerText = "Invoice PDF";
        
        fileUploadInput.className = style.neoCreditInvoiceBuilder.input.join(' ');
        fileUploadInput.type = "file";
        fileUploadInput.name = "file_upload";
        fileUploadInput.setAttribute('accept','application/pdf');
        fileUploadHolder.append(fileUploadLabel,fileUploadInput);


        // save button
        const saveButtonHolder = document.createElement("div");
        saveButtonHolder.className = style.neoCreditInvoiceBuilder.saveButtonHolder.join(' ');
        const saveButton = document.createElement("button");
        saveButton.className = style.neoCreditInvoiceBuilder.saveButton.join(' ');
        saveButton.innerText = `${(option=='new')?'Create New':(option=='clone')?'Save Clone As New':'Save Edited'} Credit Invoice`;
        saveButtonHolder.append(saveButton);
        saveButton.onclick = async()=>{
            const formData = new FormData();
            formData.append('invoice',JSON.stringify(invoice));
            formData.append('option',option);
            formData.append('serial',serial);
            if(fileUploadInput.files.length>0){
                formData.append('file_upload',fileUploadInput.files[0]);
            } 
            let response = await fetch(`/api/creditInvoice/save`,{
                method:'POST',
                body:formData,
            });
            
            try{
                const responseData = await response.json();
                notify(responseData);
            }catch(err){console.log(err)}

        };


        contentHolder.append(fileUploadHolder,saveButtonHolder);
    }
    
    
    
    
    
    neoCreditInvoiceBuilder.append(contentHolder);
    root.replaceChildren(neoHeader,neoCreditInvoiceBuilder);
    console.log(invoice);
};
export default createCreditInvoice;