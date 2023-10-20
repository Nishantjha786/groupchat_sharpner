const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userDetails = sequelize.define('userDetails',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
        unique:true
    },
    uName:{
        type: Sequelize.STRING,
        allowNull :false
    },
    emailId:{
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phoneNo:{
        type: Sequelize.BIGINT,
        allowNull:false,
    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull:false
    },
    time:{
        type: Sequelize.TIME,
        allowNull:false
    }
});
module.exports=userDetails;