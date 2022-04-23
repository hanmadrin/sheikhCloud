const CreditInvoice = require('../models/CreditInvoice');
const Sequelize = require('sequelize');
const debitInvoiceEssentials = async (req,res)=>{
    const creditors = await CreditInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_creditor')), 'creditor']],
    });
    res.json({creditors});
};
module.exports = debitInvoiceEssentials;