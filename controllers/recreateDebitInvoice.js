const generatePdfDebitInvoice = require("../configs/generatePdfDebitInvoice");
const DebitInvoice = require('../models/DebitInvoice');
const recreateDebitInvoice = async (req, res) => {
    const serial = req.params.serial;
    const invoice = await DebitInvoice.findOne({
        where: {
            serial: serial
        }
    });
    if (invoice != null) {
        if(invoice.invoice_category!='borderel'){
            generatePdfDebitInvoice(invoice.serial);
            res.json({data:'Invoice recreated',type:'success'});
        }else{
            res.json({data:'You can recreate PDF of Borderel',type:'warning'});
        }
    } else {
        res.json({data:'Invoice not found',type:'warning'});
    }
};
module.exports = recreateDebitInvoice;