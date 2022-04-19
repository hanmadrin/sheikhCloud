const DebitInvoice = require('../models/DebitInvoice');
const statusSturenDebitInvoice = async (req, res) => {
    const value = 'sturen';
    const serial = req.params.serial;
    const invoice = await DebitInvoice.findOne({
        where: {
            serial: serial
        }
    });
    if (invoice != null) {
        await invoice.update({
            invoice_status: value
        });
        res.json({
            data: `Invoice status changed to ${value}`,
            type: 'success'
        });
    } else {
        res.json({
            data: 'Invoice not found',
            type: 'warning'
        });
    }
};

module.exports = statusSturenDebitInvoice;