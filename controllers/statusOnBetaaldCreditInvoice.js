const CreditInvoice = require('../models/CreditInvoice');
const statusBetaaldCreditInvoice = async (req, res) => {
    const value = 'onbetaald';
    const serial = req.params.serial;
    const invoice = await CreditInvoice.findOne({
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
}
module.exports = statusBetaaldCreditInvoice;
// Compare this snippet from controllers\statusBetaaldCreditInvoice.js: