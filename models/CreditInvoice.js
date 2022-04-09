const sequelize = require('sequelize');
const db = require('../configs/database.js');

const CreditInvoice = db.define('CreditInvoice',{
    serial: {
        primaryKey: true,
        type: sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false
    },
    invoice_number: {
        type: sequelize.STRING(30),
        allowNull: true
    },
    invoice_for: {
        type: sequelize.STRING(20),
        allowNull: true
    },
    invoice_creditor: {
        type: sequelize.STRING(100),
        allowNull: true
    },
    invoice_description: {
        type: sequelize.STRING(250),
        allowNull: true
    },
    invoice_date: {
        type: sequelize.STRING(20),
        allowNull: true
    },
    invoice_total: {
        type: sequelize.STRING(10),
        allowNull: true
    },
    invoice_tax: {
        type: sequelize.STRING(10),
        allowNull: true
    },
    invoice_filename: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    invoice_status: {
        type: sequelize.STRING(30),
        allowNull: true
    },
    invoice_paydate: {
        type: sequelize.STRING(30),
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'credit_invoice'
});
// CreditInvoice.sync();
module.exports = CreditInvoice;