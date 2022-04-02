const sequelize = require('sequelize');
const db = require('../configs/database.js');

const GroupRide = db.define('group_ride',{
    serial: {
        primaryKey: true,
        type: sequelize.INTEGER(10),
        autoIncrement: true,
        allowNull: false
    },
    ride_number: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    ride_info: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    car_number: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    booking_time: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    departure_time: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    pick_up_time: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    departure_address: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    arrival_address: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    booker: {
        type: sequelize.STRING(200),
        allowNull: true
    },
    status: {
        type: sequelize.STRING(200),
        allowNull: true
    },
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'group_ride'
});
// GroupRide.sync();
module.exports = GroupRide;