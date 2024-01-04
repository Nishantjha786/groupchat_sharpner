
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require('express');

 const sequelize = require('./util/database');

 const compression = require('compression');
 const morgan = require('morgan');


const Expenses = require('./models/expense');
 const User = require('./models/user');
 const Forgotpassword = require('./models/forgot-password');

 const Download = require('./models/download') ;


 const mainPageRouter = require('./routes/mainpage');
const userRouter = require('./routes/user');
const passwordRouter = require('./routes/password');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'}
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


 User.hasMany(Expenses);
 Expenses.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
 const PremiumUser = require('./models/premium-user');
 User.hasOne(PremiumUser);
PremiumUser.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(Download);
Download.belongsTo(User);


const expenseRouter = require('./routes/expenses');

app.use('/user',userRouter);
const passwordController = require('./controllers/password');
app.use('/password',passwordRouter);
app.get('/password/forgotpassword',passwordController.requestresetpassword);

const expenseController = require('./controllers/expense');

const authenticator = require('./middleware/authetication');

app.use('/expense/get-expense',authenticator.authenticate,expenseController.getExpense );
app.use('/expense/delete-expense/:id',authenticator.authenticate,expenseController.deleteExpense ); // function(req,res){

app.use('/expense',expenseRouter);
app.use(mainPageRouter);


const router = express.Router();

sequelize.sync()
    .then(() => {
        app.listen( 4000);
    })
    .catch(err => console.log(err));