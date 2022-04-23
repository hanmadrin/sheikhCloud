const path = require('path');
const fs = require('fs');
const CreditInvoice = require('../models/CreditInvoice');
const uploadPdfCreditInvoice = require('../configs/uploadPdfCreditInvoice');

const saveCreditInvoice = async (req, res) => {
    const invoice = JSON.parse(req.fields.invoice);
    const serial = req.fields.serial;
    const option = req.fields.option;
    const file = req.files.file_upload;
    console.log(file);
    //invoide validation
    if(invoice.invoice_number===null || invoice.invoice_number===undefined || invoice.invoice_number===''){
        res.json({data:'You forgot to add invoice number',type:'warning'});
        return null;
    }
    if(invoice.invoice_for==null){
        res.json({data:'You forgot to choose Invoice For',type:'warning'});
        return null;
    }  
    if(invoice.invoice_description==''){
        res.json({data:'You forgot to enter Description',type:'warning'});
        return null;
    }
    const data = {
        serial: serial,
        invoice_for: invoice.invoice_for,
        invoice_number: invoice.invoice_number,
        invoice_paydate: invoice.invoice_paydate,
        invoice_description: invoice.invoice_description,
        invoice_date: invoice.invoice_date,
        invoice_status: invoice.invoice_status,
        invoice_creditor: invoice.invoice_creditor,
        invoice_total: invoice.invoice_total,
        invoice_tax: invoice.invoice_tax,
    };

    if(file==null){
        res.json({data:'You forgot to include file',type:'warning'});
        return null; 
    }else{
        if(file.type!='application/pdf'){
            res.json({data:'Must be a PDF File',type:'warning'});
            return null; 
        }else if(file.size>5000000){
            res.json({data:'File size must be less than 5MB',type:'warning'});
            return null; 
        }else if(path.extname(file.name)!='.pdf'){
            res.json({data:'Must be a PDF File(.pdf)',type:'warning'});
            return null; 
        }
    }
    // save form
    if(option=='new' || option=='clone'){
        const duplicateInvoice = await CreditInvoice.findOne({
            where: {
                invoice_number: invoice.invoice_number,
            }
        });
        if(duplicateInvoice!=null){
            res.json({data:`Invoice Number already exists for ${invoice.invoice_for}`,type:'warning'});
            return null;
        }
        delete data.serial;
    }else if(option=='edit'){
        if(serial==null){
            res.json({data:'You are editing with no reference',type:'warning'});
            return null;
        }
        await CreditInvoice.destroy({
            where: {
                serial: serial
            },
        });
    }
    


    
    const result = await CreditInvoice.create(data);
    await uploadPdfCreditInvoice(result.serial,file);

    if(result[0]!=0){
        if(option=='new'){
            res.json({data:`Invoice ${invoice.invoice_number} has been created`,type:'success'});
            return null;
        }else if(option=='clone'){
            res.json({data:`Invoice ${invoice.invoice_number} has been cloned`,type:'success'});
            return null;
        }else if(option=='edit'){
            res.json({data:`Invoice ${invoice.invoice_number} has been updated`,type:'success'});
            return null;
        }
    }else{
        res.json({data:'Something went wrong',type:'danger'});
        return null;
    }
    res.json({data:'Program Confused! Contact Developer!',type:'Danger'});
};
module.exports = saveCreditInvoice;
