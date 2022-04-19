const path = require('path');
const fs = require('fs');
const DebitInvoice = require('../models/DebitInvoice');
const DebitInvoiceProduct = require('../models/DebitInvoiceProduct');
const Client = require('../models/Client');
const generatePdfDebitInvoice = require('../configs/generatePdfDebitInvoice');
const uploadPdfDebitInvoice = require('../configs/uploadPdfDebitInvoice');
DebitInvoice.hasMany(DebitInvoiceProduct, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'invoice_serial'
});
DebitInvoiceProduct.belongsTo(DebitInvoice,{
    foreignKey: 'serial'
});

const saveDebitInvoice = async (req, res) => {
    const invoice = JSON.parse(req.fields.invoice);
    const serial = req.fields.serial;
    const option = req.fields.option;
    const file = req.files.file_upload;
    // console.log(invoice);
    //invoide validation
    if(invoice.invoice_debitorserial===null){
        res.json({data:'You forgot to add a debitor',type:'warning'});
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
    if(invoice.DebitInvoiceProducts.length==0){
        res.json({data:'You forgot to add products',type:'warning'});
        return null;
    }
    for(let i=0;i<invoice.DebitInvoiceProducts.length;i++){
        const product = invoice.DebitInvoiceProducts[i];
        if(product.title==null || product.title==''){
            res.json({data:'You forgot to add a product',type:'warning'});
            return null;
        }
        if(product.tax_rate==null){
            res.json({data:'You forgot to add a tax_rate',type:'warning'});
            return null;
        }
        if(product.price==null || product.price==''){
            res.json({data:'You forgot to add a price',type:'warning'});
            return null;
        }
    }
    if(invoice.invoice_category=='borderel'){
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
    }
    const data = {
        serial: serial,
        invoice_for: invoice.invoice_for,
        invoice_number: invoice.invoice_number,
        invoice_category: invoice.invoice_category,
        invoice_debitorserial: invoice.invoice_debitorserial,
        invoice_duedate: invoice.invoice_duedate,
        invoice_paydate: invoice.invoice_paydate,
        invoice_description: invoice.invoice_description,
        invoice_ratetype: invoice.invoice_ratetype,
        invoice_date: invoice.invoice_date,
        invoice_status: invoice.invoice_status,
        DebitInvoiceProducts: invoice.DebitInvoiceProducts,
    };
    //save form
    if(option=='new' || option=='clone'){
        const duplicateInvoice = await DebitInvoice.findOne({
            where: {
                invoice_number: invoice.invoice_number,
                invoice_category: invoice.invoice_category
            }
        });
        if(duplicateInvoice!=null){
            res.json({data:`Invoice Number already exists for ${invoice.invoice_category}`,type:'warning'});
            return null;
        }
        delete data.serial;
    }else if(option=='edit'){
        if(serial==null){
            res.json({data:'You are editing with no reference',type:'warning'});
            return null;
        }
        console.log(invoice.DebitInvoiceProducts);
        await DebitInvoice.destroy({
            where: {
                serial: serial
            },
        });
        await DebitInvoiceProduct.destroy({
            where: {
                invoice_serial: serial
            },
        });
    }
    const result = await DebitInvoice.create(data,{
        include: [DebitInvoiceProduct]
    });
    if(result.invoice_category!='borderel'){
        await generatePdfDebitInvoice(result.serial);
    }else{
        await uploadPdfDebitInvoice(result.serial,file);
    }
    
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
module.exports = saveDebitInvoice;
