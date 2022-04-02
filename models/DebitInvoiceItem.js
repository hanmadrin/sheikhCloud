const sequelize = require('sequelize');
const db = require('../configs/database.js');

const DebitInvoiceItem = db.define('debit_invoice_item',{
    serial: {
        primaryKey: true,
        type: sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false
    },
    invoice_serial: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    item_serial: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    item_meta: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    item_data: {
        type: sequelize.STRING(50),
        allowNull: false
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'debit_invoice_item'
});
// DebitInvoiceItem.sync();
module.exports = DebitInvoiceItem;