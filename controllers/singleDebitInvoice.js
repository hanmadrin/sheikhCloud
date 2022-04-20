const DebitInvoice = require('../models/DebitInvoice');
const DebitInvoiceProduct = require('../models/DebitInvoiceProduct');
// const Sequelize = require('sequelize');
DebitInvoice.hasMany(DebitInvoiceProduct, {foreignKey: 'invoice_serial'});
DebitInvoiceProduct.belongsTo(DebitInvoice,{foreignKey: 'serial'});

const singleDebitInvoice = async (req, res) => {
    const serial = req.params.serial;
    console.log(serial);
    const invoice = await DebitInvoice.findOne({
        where: {serial: serial},
        include: {model: DebitInvoiceProduct},
    });
    res.json(invoice);
};
module.exports = singleDebitInvoice;