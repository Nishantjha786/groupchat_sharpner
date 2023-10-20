const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-project', 'root', 'T#9758@qlph', {
      dialect: 'mysql',
      host: 'localhost',
      logging:false
     });

     module.exports = sequelize;
