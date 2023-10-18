const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'shop',
    password:'6424'
});
module.exports= pool.promise();