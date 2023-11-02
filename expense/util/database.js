const mysql = require("mysql");
var con = mysql.createConnection({
    host :"localhost",
    user:"root",
    password:"6424",
    database:"shop"
});
module.exports= con;