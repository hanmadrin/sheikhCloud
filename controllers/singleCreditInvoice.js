const CreditInvoice = require('../models/CreditInvoice');

const singleCreditInvoice = async (req, res) => {
    const serial = req.params.serial;
    const invoice = await CreditInvoice.findOne({
        where: {serial: serial},
    });
    console.log(serial);
    res.json(invoice);
};
module.exports = singleCreditInvoice;