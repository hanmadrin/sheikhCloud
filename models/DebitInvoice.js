const sequelize = require('sequelize');
const db = require('../configs/database.js');

const DebitInvoice = db.define('DebitInvoice',{
    serial: {
        primaryKey: true,
        type: sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false
    },
    invoice_for: {
        type: sequelize.STRING(20),
        allowNull: true
    },
    invoice_number: {
        type: sequelize.STRING(30),
        primaryKey: true,
        allowNull: true
    },
    invoice_category: {
        type: sequelize.STRING(50),
        allowNull: true
    },
    invoice_debitorserial: {
        type: sequelize.STRING(100),
        allowNull: true
    },
    invoice_duedate: {
        type: sequelize.STRING(100),
        allowNull: true
    },
    invoice_paydate: {
        type: sequelize.STRING(30),
        allowNull: true
    },
    invoice_description: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    invoice_ratetype:{
        type: sequelize.STRING(20),
        allowNull: true
    },
    total_item: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    invoice_date: {
        type: sequelize.STRING(20),
        allowNull: true
    },
    invoice_status: {
        type: sequelize.STRING(30),
        allowNull: true
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'debit_invoice'
});
// DebitInvoice.sync();
module.exports = DebitInvoice;