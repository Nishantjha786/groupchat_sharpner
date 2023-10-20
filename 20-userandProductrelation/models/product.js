
const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Product = sequelize.define('Product',{
    id:{
        type:Sequelize.BIGINT,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    pName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    pQuantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    pPrice:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    pDescription:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imgID:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

});



module.exports = Product;