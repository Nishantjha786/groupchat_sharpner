const path = require('path');
var express = require('express');
var app = express();
//const express = require('express');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//const app = express();
const db  =  require('./connection');

//const Sequelize = require('sequelize');
//const sequelize = require('./connection');




app.get('/',function(req,res){
    res.sendFile(__dirname+'/registration.html');
});
app.post('/',function(req,res){
    // var date = req.body.start;
    // var att = req.body.vehicle1;
    // var phone = req.body.number;
    var name = req.body.name;
    // console.log(date);
    // console.log(att);
    console.log(name);

});
    // const Product = sequelize.define(columnname,{
    //     id:{
    //         type:Sequelize.INTEGER,
    //         autoIncrement:true,
    //         allowNull:false,
    //         primaryKey:true
    //     },
    //     columnname:Sequelize.STRING
    
    // });
    // sequelize.sync({
    //     force: true
    // })
    // .then(result=>{
    //     console.log(result);
       
    // })
    // .catch(err=>{
    //     console.log(err);
    // });
//     db.execute('insert into student (name,email,phone) values(?,?,?)',[name,email,phone])
//     .then(res=>{
// console.log(res);
//     })
//     .catch(err=>{
// console.log(err);
 

    
  //  module.exports=Product;
  
    
    // con.connect(function(err){
    //   if(err)throw err;
    //   var sql= "insert into student values(name ,email,phone) values ?";
    //   var values = [[name,email,phone]];
    //   con.query(sql,values,function(error,result){
    //     if(error)throw error;
    //     res.send('student regitsration sucesful'+result.insertId);
    //   });
    // });


// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminData = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminData.routes);
// app.use(shopRoutes);

// app.use((req, res, next) => {
//   res.status(404).render('404', { pageTitle: 'Page Not Found' });
// });
app.listen(3000);
//mapp.listen(3000);
