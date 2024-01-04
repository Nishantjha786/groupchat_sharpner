// const Sequelize = require('sequelize');

// const data_base = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     dialect: 'mysql',
//     host: process.env.DB_HOST
//   });
  
// module.exports = data_base;



const Sequelize = require('sequelize');
const data_base = new Sequelize('blog','root','6424',{dialect:'mysql',host:'localhost'});
module.exports = data_base;


 



