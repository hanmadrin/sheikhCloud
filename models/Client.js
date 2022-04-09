const sequelize = require('sequelize');
const db = require('../configs/database.js');

const Client = db.define('Client',{
    serial: {
        primaryKey: true,
        type: sequelize.INTEGER(10),
        autoIncrement: true,
        allowNull: false
    },
    saluation: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    client_type: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    id: {
        type: sequelize.STRING(30),
        allowNull: true
    },
    firstname: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    lastname: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    adress_street: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    address_housenr: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    address_postcode: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    address_city: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    address_email: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    address_phone: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    address_contact: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    payment_way: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    info: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    extra_info: {
        type: sequelize.STRING(500),
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'client'
});
// Client.sync();
module.exports = Client;