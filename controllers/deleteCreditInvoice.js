const CreditInvoice = require('../models/creditInvoice');
const deleteCreditInvoice = async (req, res) => {
    const serial = req.params.serial;
    const invoice = await CreditInvoice.findOne({
        where: {
            serial: serial
        }
    });
    if (invoice != null) {
        await invoice.destroy();
        res.json({
            data: `Invoice deleted`,
            type: 'success'
        });
    } else {
        res.json({
            data: 'Invoice not found',
            type: 'warning'
        });
    }
};
module.exports = deleteCreditInvoice;