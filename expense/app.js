const path = require('path');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const db  =  require('./connection');

const userRoutes = require('./routes/user');

const User = require('./model/user');
const userController = require('./controllers/user');


app.get('/login',function(req,res){
    res.sendFile(__dirname+'/login.html');
});
app.get('/signup',function(req,res){
    res.sendFile(__dirname+'/signup.html');
});

app.post('/signup', userController.addUser);
app.post('/login', userController.logUser);


// app.post('/',function(req,res){
//     var name = req.body.name;
//     var email= req.body.email;
//     var password = req.body.password;
//  console.log("name  is "+name);
 

// });


app.use('/user', userRoutes);
app.listen(4001);
// db.sync()
//     .then(() => {
      
//     })
//     .catch(err => console.log(err));



app.listen(process.env.PORT ||4000);
