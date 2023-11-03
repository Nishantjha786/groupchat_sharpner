// const mysql = require("mysql");
// var con = mysql.createConnection({
//     host :"localhost",
//     user:"root",
//     password:"6424",
//     database:"shop"
// });
// module.exports= con;
// const Sequelize = require('sequelize');

// const data_base = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     dialect: 'mysql',
//     host: process.env.DB_HOST
//   });
  
// module.exports = data_base;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('shop','root','6424',{dialect:'mysql',host:'localhost'});
module.exports = sequelize;