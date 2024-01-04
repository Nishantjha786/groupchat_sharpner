const Sequelize = require('sequelize');
const data_base = require('../util/database');

//id, name , password, phone number, role

const Forgotpassword = data_base.define('forgotpassword', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    active: {
        type: Sequelize.BOOLEAN, 
        allowNull: false,
    defaultValue: true,
    },
    expiresby: Sequelize.DATE
})


module.exports = Forgotpassword;