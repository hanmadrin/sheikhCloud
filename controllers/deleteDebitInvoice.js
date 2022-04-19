const DebitInvoice = require('../models/DebitInvoice');
const deleteDebitInvoice = async(req, res) => {
    const serial = req.params.serial;
    console.log(serial);
    const invoice = await DebitInvoice.findOne({
        where: {
            serial: serial
        }
    });
    if(invoice!=null){
        await invoice.destroy();
        res.json({data:'Invoice Deleted',type:'success'});
    }else{
        res.json({data:'Invoice not found',type:'warning'});
    }
};
module.exports = deleteDebitInvoice;