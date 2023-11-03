const path = require('path');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const db  =  require('./connection');

// const express  = require('express');
// const path = require('path');
// const fs = require('fs');
// //const helmet = require('helmet');
// //const morgan = require('morgan');
// //const compression = require('compression');
// const app = express();
// const body_parser = require('body-parser');
// //const dotenv = require('dotenv');
// //dotenv.config();

// const User = require('./model/user');

const User = require('./model/user');
const userController = require('./controllers/user');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/registration.html');
});
// app.post('/',function(req,res){
//     var name = req.body.name;
//     var email= req.body.email;
//     var password = req.body.password;
//  console.log("name  is "+name);
 

// });

app.post('/', userController.addUser);
  


//const Expense = require('./models/expense');
//const PremiumUser = require('./models/premium-user');
//const Forgotpassword = require('./models/forgot-password');
//onst Download = require('./models/download');

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasOne(PremiumUser);
// PremiumUser.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

// User.hasMany(Download);
// Download.belongsTo(User);

// const userRoutes = require('./routes/user');
// // const expenseRoutes = require('./routes/expense');
// // const passwordRoutes = require('./routes/password');


// const data_base = require('./util/database');

// const cors = require('cors');

// app.use(body_parser.json());
// app.use(cors());

// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'),
//     {flags: 'a'}
// );

// // app.use(helmet());
// // app.use(compression());
// // app.use(morgan('combined', {stream: accessLogStream}));

// app.use('/user', userRoutes);
// // app.use('/expense', expenseRoutes);
// // app.use('/password', passwordRoutes);

// // console.log(process.env.NODE_ENV);

// // data_base.sync({force: true})

app.listen(process.env.PORT || 4000);
