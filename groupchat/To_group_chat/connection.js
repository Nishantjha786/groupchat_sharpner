// var mysql = require('mysql2');
// // var con = mysql.createConnection({
// //     host :'localhost',
// //     user:'root',
// //     database:'shop',
// //     password:'6424'
    
// // });
// // module.exports= con;

// var mysql = require('mysql2');
// var con = mysql.createPool({
//     host :'localhost',
//     user:'root',
//     database:'shop',
//     password:'6424'
    
// });
// module.exports= con.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST
  });
  
module.exports = sequelize;