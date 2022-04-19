const DebitInvoice = require('../models/debitInvoice');
const Client = require('../models/client');
const Sequelize = require('sequelize');
const debitInvoiceEssentials = async (req,res)=>{
    const categories = await DebitInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_category')), 'category']],
    });
    const company = await DebitInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_for')), 'company']],
    });
    const category = await DebitInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_category')), 'category']],
    });
    const rateType = await DebitInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_ratetype')), 'rateType']],
    });
    const status = await DebitInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_status')), 'status']],
    });
    const debitors = await Client.findAll({
        attributes: ['serial','firstname','lastname','address_email']
    });
    const maxInvoice = {};
    for(let i=0;i<categories.length;i++){
        const number = await DebitInvoice.max('invoice_number',{ 
            where: { 
                invoice_category: categories[i].dataValues.category, 
            } 
        });
        maxInvoice[categories[i].dataValues.category] = number;
    }
    res.json({categories,company,category,rateType,status,debitors,maxInvoice});
};
module.exports = debitInvoiceEssentials;