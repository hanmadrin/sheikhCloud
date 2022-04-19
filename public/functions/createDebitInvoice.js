import style from "../styles/style.js";
import app from "../views/app.js";
import header from "../views/header.js";
import view from "../views/view.js";
import notify from "./notify.js";

const createDebitInvoice = async ({invoice,option,serial})=>{
    let productCount = 0;
    const root = document.getElementById(app.id);
    const neoHeader = header();
    const neoDebitInvoiceBuilder = document.createElement("div");
    neoDebitInvoiceBuilder.className = style.neoDebitInvoiceBuilder.main.join(' ');
    const contentHolder = document.createElement("div");
    contentHolder.className = style.neoDebitInvoiceBuilder.contentHolder.join(' ');

    const h3 = document.createElement("h3");
    h3.innerText = `${(option=='new')?'Create New':(option=='view')?'View Existing':(option=='clone')?'Cloning Existing For New':'Edit Existing'} Debit Invoice`;
    h3.className = style.neoDebitInvoiceBuilder.h3.join(' ');
    contentHolder.append(h3);
    //get categories
    const debitInvoiceEssentialssFetch = await fetch('/api/debitInvoice/essentials',{method:'GET',});
    const debitInvoiceEssentials = await debitInvoiceEssentialssFetch.json();
    const debitInvoiceCategories = debitInvoiceEssentials.categories.map(a=>a.category)
    
    const neoRadioInput = document.createElement("div");
    neoRadioInput.className = style.neoRadioInput.main.join(' '); 
    for(let i=0;i<debitInvoiceCategories.length;i++){
        const item = debitInvoiceCategories[i];
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "category";
        radio.value = item;
        radio.id = item;
        radio.checked = (invoice.invoice_category==item);
        radio.className = style.neoRadioInput.radio.join(' ');
        const label = document.createElement("label");
        label.htmlFor = item;
        label.innerText = item;
        label.className = style.neoRadioInput.label.join(' ');
        if(option=='view'){radio.setAttribute('disabled',true);}
        neoRadioInput.append(radio,label);
    }
    const neoDynamicContent = document.createElement("div");
    const updateDynamicContent = async ()=>{
        //invoice_debitorserial
        const debitorSelectorHolder = document.createElement("div");
        debitorSelectorHolder.className = style.neoDynamicContent.inputHolder.join(' ');
        const debitorLabel = document.createElement("label");
        debitorLabel.innerText = "Debitor";
        const debitorSelector = document.createElement("select");
        debitorSelector.className = style.neoDynamicContent.debitorSelector.join(' ');
        debitorSelector.name = "invoice_debitorserial";
        const debitors = debitInvoiceEssentials.debitors.map(a=>{return [a.serial,`${a.firstname} ${a.lastname}, ${a.address_email}`]});
        const defaultDebitorOption = document.createElement("option");
        defaultDebitorOption.value = '';
        defaultDebitorOption.innerText = "Select a Debitor";
        debitorSelector.append(defaultDebitorOption);
        for(let i=0;i<debitors.length;i++){
            const debitor = debitors[i];
            const option = document.createElement("option");
            option.value = debitor[0];
            option.selected = (debitor[0]==invoice.invoice_debitorserial);
            option.innerText = debitor[1];
            debitorSelector.append(option);
        }
        defaultDebitorOption.disabled = true;
        if(option=='view'){debitorSelector.setAttribute('disabled',true);}
        debitorSelector.onchange= ()=>{
            invoice.invoice_debitorserial = debitorSelector.value;
        };
        invoice.invoice_debitorserial = (invoice.invoice_debitorserial==null)?null:invoice.invoice_debitorserial;
        debitorSelectorHolder.append(debitorLabel,debitorSelector);
        //invoice_number
        const maxInvoice = debitInvoiceEssentials.maxInvoice[invoice.invoice_category];
        const numberHolder = document.createElement("div");
        numberHolder.className = style.neoDynamicContent.inputHolder.join(' ');
        const numberLabel = document.createElement("label");
        numberLabel.innerText = "Invoice Number";
        const numberInput = document.createElement("input");
        numberInput.className = style.neoDynamicContent.numberInput.join(' ');
        numberInput.type = "number";
        numberInput.name = "invoice_number";
        numberInput.value = (option=='view' || option=='edit')?invoice.invoice_number:(maxInvoice+1);
        invoice.invoice_number = numberInput.value;
        numberInput.onchange= ()=>{
            invoice.invoice_number = numberInput.value;
        };
        if(option=='view'){numberInput.setAttribute('disabled',true);}
        numberHolder.append(numberLabel,numberInput);
        //invoice_for
        const companyHolder = document.createElement("div");
        companyHolder.className = style.neoDynamicContent.inputHolder.join(' ');
        const companyLabel = document.createElement("label");
        companyLabel.innerText = "Invoice For";
        const companySelector = document.createElement("select");
        companySelector.className = style.neoDynamicContent.companySelector.join(' ');
        companySelector.name = "invoice_for";
        const companies = ['ztr','sheikh','groced','other'];
        const defaultCompanyOption = document.createElement("option");
        defaultCompanyOption.value = "";
        defaultCompanyOption.innerText = "Select a Company";
        companySelector.append(defaultCompanyOption);
        for(let i=0;i<companies.length;i++){
            const company = companies[i];
            // console.log(company,invoice.invoice_for);
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
        const statuses = ['sturen','betaald'];
        const statusHolder = document.createElement("div");
        statusHolder.className = style.neoDynamicContent.inputHolder.join(' ');
        const statusLabel = document.createElement("label");
        statusLabel.innerText = "Invoice Status";
        const statusSelector = document.createElement("select");
        statusSelector.className = style.neoDynamicContent.statusSelector.join(' ');
        statusSelector.name = "invoice_status";
        const defaultStatusOption = document.createElement("option");
        defaultStatusOption.value = "new";
        defaultStatusOption.innerText = "new";
        statusSelector.append(defaultStatusOption);
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
        if(invoice.invoice_status==null){invoice.invoice_status = 'new';}


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
        //invoice_duedate
        const dueDateHolder = document.createElement("div");
        dueDateHolder.className = style.neoDynamicContent.inputHolder.join(' ');
        const dueDateLabel = document.createElement("label");
        dueDateLabel.innerText = "Invoice Due Date";
        const dueDateInput = document.createElement("input");
        dueDateInput.className = style.neoDynamicContent.dateInput.join(' ');
        dueDateInput.type = "date";
        dueDateInput.name = "invoice_duedate";
        dueDateInput.value = (option=='new')?new Date().toISOString().substring(0,10):invoice.invoice_duedate;
        invoice.invoice_duedate = dueDateInput.value;
        dueDateInput.onchange= ()=>{
            invoice.invoice_duedate = dueDateInput.value;
        };
        if(option=='view'){dueDateInput.setAttribute('disabled',true);}
        dueDateHolder.append(dueDateLabel,dueDateInput);
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
            // console.log(payDateInput.value);
            invoice.invoice_paydate = payDateInput.value;
        };
        if(option=='view'){payDateInput.setAttribute('disabled',true);}
        payDateHolder.append(payDateLabel,payDateInput);
        
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

        //invoice_ratetype
        const rateTypeHolder = document.createElement("div");
        rateTypeHolder.className = style.neoDynamicContent.rateTypeHolder.join(' ');
        const neoRadioInputRateType = document.createElement("div");
        neoRadioInputRateType.className = style.neoRadioInput.main.join(' ');
        const rateTypes = ['exc','inc'];
        for(let i=0;i<rateTypes.length;i++){
            const rateType = rateTypes[i];
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "invoice_ratetype";
            radio.value = rateType;
            radio.checked = (rateType==invoice.invoice_ratetype);
            radio.className = style.neoRadioInput.radio.join(' ');
            radio.id = "invoice_ratetype_"+rateType;
            radio.onchange= ()=>{
                invoice.invoice_ratetype = rateType;
            };
            const label = document.createElement("label");
            label.innerText = rateType;
            label.htmlFor = "invoice_ratetype_"+rateType;
            label.innerText = rateType;
            label.className = style.neoRadioInput.label.join(' ');
            if(option=='view'){radio.setAttribute('disabled',true);}
            neoRadioInputRateType.append(radio,label);
        }
        rateTypeHolder.append(neoRadioInputRateType);
        if(rateTypeHolder.querySelector('input[name="invoice_ratetype"]:checked')==null){
            rateTypeHolder.querySelector('input[name="invoice_ratetype"][value="exc"]').checked = true;
            invoice.invoice_ratetype = 'exc';
        }



        //invoice.DebitInvoiceProducts
        const productsHolder = document.createElement("div");
        productsHolder.className = style.neoDynamicContent.productsHolder.join(' ');
        if(invoice.DebitInvoiceProducts==null){invoice.DebitInvoiceProducts=[];}
        const getDebitInvoiceProducts = ()=>{
            const DebitInvoiceProducts = [];
            for(let i=0;i<productsHolder.children.length;i++){
                const productHolder = productsHolder.children[i];
                const product = {};
                product.title = productHolder.querySelector('[name="product_title"]').value;
                product.tax_rate = productHolder.querySelector('[name^="product_tax_rate"]:checked').value;
                product.price = productHolder.querySelector('[name="product_price"]').value;
                DebitInvoiceProducts.push(product);
            }
            return DebitInvoiceProducts;
        }
        const createSingleProduct = (product)=>{
            productCount = productCount+1;
            const productHolder = document.createElement("div");
            productHolder.className = style.neoDynamicContent.productHolder.join(' ');
            //remove button
            const removeButton = document.createElement("button");
            removeButton.className = style.neoDynamicContent.removeButton.join(' ');
            removeButton.innerText = "Remove";
            if(option=='view'){removeButton.setAttribute('disabled',true);}
            removeButton.onclick = ()=>{
                productsHolder.removeChild(productHolder);
                //changing_data
                invoice.DebitInvoiceProducts = getDebitInvoiceProducts();
            };
            const titleHolder = document.createElement("div");
            titleHolder.className = style.neoDynamicContent.titleHolder.join(' ');
            const productLabel = document.createElement("label");
            productLabel.innerText = "Product Title";
            const titleInput = document.createElement("input");
            titleInput.className = style.neoDynamicContent.titleInput.join(' ');
            titleInput.type = "text";
            titleInput.name = "product_title";
            titleInput.value = product.title;
            product.product_title = titleInput.value;
            titleInput.onchange= ()=>{
                //changing_data
                invoice.DebitInvoiceProducts = getDebitInvoiceProducts();
            };
            if(option=='view'){titleInput.setAttribute('disabled',true);}
            titleHolder.append(productLabel,titleInput);
            // tax_rate
            const tax_rateHolder = document.createElement("div");
            tax_rateHolder.className = style.neoDynamicContent.tax_rateHolder.join(' ');
            const neoRadioInput = document.createElement("div");
            const tax_rateLabel = document.createElement("label");
            tax_rateLabel.innerText = "Tax Rate";
            neoRadioInput.className = style.neoRadioInput.main.join(' ');
            const tax_rates = ['0.00','9.00','21.00'];
            for(let i=0;i<tax_rates.length;i++){
                const tax_rate = tax_rates[i];
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name =  `product_tax_rate_${productCount}`;
                radio.value = tax_rate;
                radio.checked = (tax_rate==product.tax_rate);
                radio.className = style.neoRadioInput.radio.join(' ');
                radio.id = `tax_rate_${tax_rate}_${productCount}`;
                radio.onchange= ()=>{
                    //changing_data
                    invoice.DebitInvoiceProducts = getDebitInvoiceProducts();
                };
                const label = document.createElement("label");
                label.innerText = tax_rate;
                label.htmlFor =  `tax_rate_${tax_rate}_${productCount}`;
                label.innerText = tax_rate;
                label.className = style.neoRadioInput.label.join(' ');
                if(option=='view'){radio.setAttribute('disabled',true);}
                neoRadioInput.append(radio,label);
            }
            tax_rateHolder.append(tax_rateLabel,neoRadioInput);

            // price
            const priceHolder = document.createElement("div");
            priceHolder.className = style.neoDynamicContent.priceHolder.join(' ');
            const priceLabel = document.createElement("label");
            priceLabel.innerText = "Price";
            const priceInput = document.createElement("input");
            priceInput.className = style.neoDynamicContent.priceInput.join(' ');
            priceInput.type = "number";
            priceInput.name = "product_price";
            priceInput.value = product.price;
            product.price = priceInput.value;
            priceInput.onchange= ()=>{
                //changing_data
                invoice.DebitInvoiceProducts = getDebitInvoiceProducts();
            }; 
            if(option=='view'){priceInput.setAttribute('disabled',true);}
            priceHolder.append(priceLabel,priceInput);
            const taxPriceHolder = document.createElement("div");
            taxPriceHolder.className = style.neoDynamicContent.taxPriceHolder.join(' ');
            taxPriceHolder.append(tax_rateHolder,priceHolder);
            
            productHolder.append(titleHolder,taxPriceHolder,removeButton);
            return productHolder;
        };
        for(let i=0;i<invoice.DebitInvoiceProducts.length;i++){
            productsHolder.append(createSingleProduct(invoice.DebitInvoiceProducts[i]));
        }
        invoice.DebitInvoiceProducts = getDebitInvoiceProducts();
        //add button
        const addButtonHolder = document.createElement('div');
        addButtonHolder.className = style.neoDynamicContent.addButtonHolder.join(' ');

        const productAddButton = document.createElement("button");
        productAddButton.className = style.neoDynamicContent.productAddButton.join(' ');
        productAddButton.innerText = "+";
        if(option=='view'){productAddButton.setAttribute('disabled',true);}
        productAddButton.onclick = ()=>{
            productsHolder.append(createSingleProduct({title:'',tax_rate:'0.00',price:''}));
            //changing_data
            invoice.DebitInvoiceProducts = getDebitInvoiceProducts();
        };
        addButtonHolder.append(productAddButton);


        

        const numberCompanyStatusHolder = document.createElement("div");
        numberCompanyStatusHolder.className = style.neoDynamicContent.numberCompanyStatusHolder.join(' ');
        numberCompanyStatusHolder.append(numberHolder,companyHolder,statusHolder);

        const dateDuePayHolder = document.createElement("div");
        dateDuePayHolder.className = style.neoDynamicContent.dateDuePayHolder.join(' ');
        dateDuePayHolder.append(dateHolder,dueDateHolder,payDateHolder);

        const descriptionRateTypeHolder = document.createElement("div");
        descriptionRateTypeHolder.className = style.neoDynamicContent.descriptionRateTypeHolder.join(' ');
        descriptionRateTypeHolder.append(descriptionHolder,rateTypeHolder);

        neoDynamicContent.replaceChildren(debitorSelectorHolder,numberCompanyStatusHolder,dateDuePayHolder,descriptionRateTypeHolder,productsHolder,addButtonHolder);
        //file upload
        const fileUploadInput = document.createElement("input");
        if(option!='view' && invoice.invoice_category=='borderel'){
            const fileUploadHolder = document.createElement("div");
            fileUploadHolder.className = style.neoDynamicContent.inputHolder.join(' ');
            const fileUploadLabel = document.createElement("label");
            fileUploadLabel.innerText = "Invoice PDF";
            
            fileUploadInput.className = style.neoDynamicContent.fileUploadInput.join(' ');
            fileUploadInput.type = "file";
            fileUploadInput.name = "file_upload";
            fileUploadInput.setAttribute('accept','image/jpeg,image/gif,image/png,application/pdf');
            fileUploadInput.onchange= ()=>{
                //changing_data
                invoice.DebitInvoiceProducts = getDebitInvoiceProducts();
            };
            fileUploadHolder.append(fileUploadLabel,fileUploadInput);
            neoDynamicContent.append(fileUploadHolder);
        }        
        //save button
        if(option!='view'){
            const saveButtonHolder = document.createElement("div");
            saveButtonHolder.className = style.neoDynamicContent.saveButtonHolder.join(' ');
            const saveButton = document.createElement("button");
            saveButton.className = style.neoDynamicContent.saveButton.join(' ');
            saveButton.innerText = `${(option=='new')?'Create New':(option=='clone')?'Save Clone As New':'Save Edited'} Debit Invoice`;
            saveButtonHolder.append(saveButton);
            neoDynamicContent.append(saveButtonHolder);
            saveButton.onclick = async()=>{
                const formData = new FormData();
                formData.append('invoice',JSON.stringify(invoice));
                formData.append('option',option);
                formData.append('serial',serial);
                if(invoice.invoice_category=='borderel' && fileUploadInput.files.length>0){
                    formData.append('file_upload',fileUploadInput.files[0]);
                } 
                let response = await fetch(`/api/debitInvoice/save`,{
                    method:'POST',
                    body:formData,
                });
                
                try{
                    const responseData = await response.json();
                    notify(responseData);
                }catch(err){console.log(error)}

            };
        }

        
    }   
    if(neoRadioInput.querySelector('input:checked')!==null){
        const selected = neoRadioInput.querySelector('input:checked');
        invoice.invoice_category = selected.value;
        await updateDynamicContent();
    }
    neoRadioInput.onchange = async (change)=>{
        // const invoiceKeys = Object.keys(invoice);
        // for(let i=0;i<invoiceKeys.length;i++){
        //     const key = invoiceKeys[i];
        //     delete invoice[key];
        // }
        invoice.invoice_category = change.target.value;
        await updateDynamicContent();
    };
    contentHolder.append(neoRadioInput,neoDynamicContent);
    neoDebitInvoiceBuilder.append(contentHolder);
    root.replaceChildren(neoHeader,neoDebitInvoiceBuilder);
}
export default createDebitInvoice;
