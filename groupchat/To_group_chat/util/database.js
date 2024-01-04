

const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupchat','root','6424',{dialect:'mysql',host:'localhost',
logging: false});
module.exports = sequelize;








