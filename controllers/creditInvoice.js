const CreditInvoice = require('../models/CreditInvoice');
const Sequelize = require('sequelize');
const creditInvoice = async (req,res) => {
    const year = await CreditInvoice.findAll({
        attributes: [
            [Sequelize.fn('YEAR', Sequelize.col('invoice_date')), 'year'],
        ],  
        group: ['year'],
    });
    const company = await CreditInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_for')), 'company']],
    });
    const status = await CreditInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_status')), 'status']],
    });
    const distinctValues= {year,company,status};

    const monthsFromQuarter = {1: ['01','02','03'],2: ['04','05','06'],3: ['07','08','09'],4: ['10','11','12']};
    const Op = Sequelize.Op;
    const invoices = await CreditInvoice.findAll({
        attributes:{
            exclude: ['serial','invoice_filename']
        },
        where: {
            invoice_date: {
                [Op.or]:{
                    [Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][0]}-%`,
                    [Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][1]}-%`,
                    [Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][2]}-%`
                }
            },
            invoice_for: {
                [Op.like]: `${req.query.company}%`
            },
            invoice_status: {
                [Op.like]: `${req.query.status}%`
            },
        }
    });
    
    res.json({invoices,distinctValues});
};
module.exports = creditInvoice;