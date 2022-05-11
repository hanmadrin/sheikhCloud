const DebitInvoice = require('../models/DebitInvoice');
const DebitInvoiceProduct = require('../models/DebitInvoiceProduct');
DebitInvoice.hasMany(DebitInvoiceProduct, {foreignKey: 'invoice_serial'});
DebitInvoiceProduct.belongsTo(DebitInvoice,{foreignKey: 'serial'});
const CreditInvoice = require('../models/CreditInvoice');
const Sequelize = require('sequelize');
const prognose = async (req,res)=>{
    const debitCompany = await DebitInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_for')), 'company']],
    });
    const debitYear = await DebitInvoice.findAll({
        attributes: [
            [Sequelize.fn('YEAR', Sequelize.col('invoice_date')), 'year'],
        ],  
        group: ['year'],
    });
    const creditCompany = await DebitInvoice.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('invoice_for')), 'company']],
    });
    const creditYear = await DebitInvoice.findAll({
        attributes: [
            [Sequelize.fn('YEAR', Sequelize.col('invoice_date')), 'year'],
        ],  
        group: ['year'],
    });
    
    const company = [];
    const year = [];
    debitCompany.forEach(a=>{if(!company.includes(a.dataValues.company)){company.push(a.dataValues.company);}});
    debitYear.forEach(a=>{if(!year.includes(a.dataValues.year)){year.push(a.dataValues.year);}});
    creditCompany.forEach(a=>{if(!company.includes(a.dataValues.company)){company.push(a.dataValues.company);}});
    creditYear.forEach(a=>{if(!year.includes(a.dataValues.year)){year.push(a.dataValues.year);}});
    const distinctValues = {company,year:year.map(String)};

    const monthsFromQuarter = {1: ['01','02','03'],2: ['04','05','06'],3: ['07','08','09'],4: ['10','11','12']};
    const Op = Sequelize.Op;
    const uitbetalingen = await DebitInvoice.findAll({
        attributes:['serial'],
        include: [
            {
                model: DebitInvoiceProduct,
                attributes: [`price`,'tax_rate'],
            }
        ],
        where: {
            invoice_date: {
                [Op.or]:[
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][0]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][1]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][2]}-%`}
                ]
            },
            invoice_for: {
                [Op.like]: `${req.query.company}%`
            },
            invoice_category: 'uitbetalingen',
        }
    });
    const rittenUitbesteed = await DebitInvoice.findAll({
        attributes:['serial'],
        include: [
            {
                model: DebitInvoiceProduct,
                attributes: [`price`,'tax_rate'],
            }
        ],
        where: {
            invoice_date: {
                [Op.or]:[
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][0]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][1]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][2]}-%`}
                ]
            },
            invoice_for: {
                [Op.like]: `${req.query.company}%`
            },
            invoice_category: 'rittenUitbesteed',
        }
    });
    const debit = await DebitInvoice.findAll({
        attributes:['invoice_ratetype'],
        include: [
            {
                model: DebitInvoiceProduct,
                attributes: [`price`,'tax_rate'],
            }
        ],
        where: {
            invoice_date: {
                [Op.or]:[
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][0]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][1]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][2]}-%`}
                ]
            },
            invoice_for: {
                [Op.like]: `${req.query.company}%`
            },
            invoice_category: {
                [Op.notIn]:  ['uitbetalingen','rittenUitbesteed']
            },
        }
    });
    const uitgaven = await CreditInvoice.findAll({
        attributes:['invoice_tax','invoice_total'],
        where: {
            invoice_date: {
                [Op.or]:[
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][0]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][1]}-%`},
                    {[Op.like]: `${req.query.year}-${monthsFromQuarter[req.query.quarter][2]}-%`}
                ]
            },
            invoice_for: {
                [Op.like]: `${req.query.company}%`
            },
        }
    });
    res.json({distinctValues,uitgaven,uitbetalingen,rittenUitbesteed,debit});
};
module.exports = prognose;