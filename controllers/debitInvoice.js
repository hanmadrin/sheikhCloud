const DebitInvoice = require('../models/DebitInvoice');
const Sequelize = require('sequelize');
const DebitInvoiceProduct = require('../models/DebitInvoiceProduct');
const Client = require('../models/Client');

DebitInvoice.hasMany(DebitInvoiceProduct, {foreignKey: 'invoice_serial'});
DebitInvoiceProduct.belongsTo(DebitInvoice,{foreignKey: 'serial'});
Client.hasMany(DebitInvoice, {foreignKey: 'serial'});
DebitInvoice.belongsTo(Client,{foreignKey: 'invoice_debitorserial'});

const debitInvoice = async (req,res) => {
    const year = await DebitInvoice.findAll({
        attributes: [
            [Sequelize.fn('YEAR', Sequelize.col('invoice_date')), 'year'],
        ],  
        group: ['year'],
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
    const distinctValues= {year,company,category,rateType,status};
    
    const monthsFromQuarter = {1: ['01','02','03'],2: ['04','05','06'],3: ['07','08','09'],4: ['10','11','12']};
    const Op = Sequelize.Op;
    const invoices = await DebitInvoice.findAll({
        attributes:[`serial`,`invoice_number`, `invoice_for`, `invoice_category`, `invoice_debitorserial`, `invoice_duedate`, `invoice_paydate`, `invoice_description`, `invoice_ratetype`,`invoice_date`, `invoice_status`],
        include: [
            {
                model: DebitInvoiceProduct,
                attributes: [`price`,'tax_rate'],
            },
            {
                model: Client,
                attributes: ['firstname','lastname','address_email']
            },
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
                [Op.like]: `${req.query.category}%`
            },
            invoice_ratetype: {
                [Op.like]: `${req.query.rateType}%`
            },
            invoice_status: {
                [Op.like]: `${req.query.status}%`
            },
        }
    });
    


    res.json({invoices,distinctValues});
};
module.exports = debitInvoice;