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
const sequelize = new Sequelize('shop','root','6424',{dialect:'mysql',host:'localhost'});
module.exports = sequelize;