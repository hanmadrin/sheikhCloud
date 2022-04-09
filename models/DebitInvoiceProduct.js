const sequelize = require('sequelize');
const db = require('../configs/database.js');
const DebitInvoiceProduct = db.define('DebitInvoiceProduct',{
    serial: {
        primaryKey: true,
        type: sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false
    },
    invoice_serial: {
        type: sequelize.INTEGER(11),
        allowNull: false
    },
    title: {
        type: sequelize.STRING(200),
        allowNull: false
    },
    taxRate: {
        type: sequelize.DECIMAL(10,2),
        allowNull: false
    },
    totalPrice: {
        type: sequelize.DECIMAL(10,2),
        allowNull: false
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'debit_invoice_product'
});
// DebitInvoiceProduct.sync();
module.exports = DebitInvoiceProduct;