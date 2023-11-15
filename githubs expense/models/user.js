const Sequelize = require('sequelize');

const data_base = require('../util/database');

const User = data_base.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: Sequelize.STRING,
    totalexpenses:{
        type:Sequelize.FLOAT(),
        defaultValue:0.00   
    },
    isPremiumUser: Sequelize.BOOLEAN
});

module.exports = User;