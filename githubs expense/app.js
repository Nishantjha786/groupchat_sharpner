
const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
 const sequelize = require('./util/database');

// const PORT = process.env.PORT;

const Expenses = require('./models/expense');
 const User = require('./models/user');
 const Forgotpassword = require('./models/forgot-password');

 const Download = require('./models/download') ;
// const Orders = require('./models/orders');
// const Forgotpasswords = require('./models/forgotpasswords');
// const Downloads = require('./models/downloads');

 const mainPageRouter = require('./routes/mainpage');
const userRouter = require('./routes/user');
const passwordRouter = require('./routes/password');
//const expenseRouter = require('./routes/expenses');
// const purchaseRouter = require('./routes/purchase');
// const premiumRouter = require('./routes/premium');
// const passwordRouter = require('./routes/password');

const app = express();
//app.use(cors());
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
//app.use(ExpensePageRouter);
app.use('/user',userRouter);
const passwordController = require('./controllers/password');
app.use('/password',passwordRouter);
app.get('/password/forgotpassword',passwordController.requestresetpassword);

const expenseController = require('./controllers/expense');

const authenticator = require('./middleware/authetication');

app.use('/expense/get-expense',authenticator.authenticate,expenseController.getExpense );
app.use('/expense/delete-expense/:id',authenticator.authenticate,expenseController.deleteExpense ); // function(req,res){
//     console.log("<<<<<<<<<<In get exepsne route>>>>>>>>>>");
// authenticator.authenticate;
//    // expenseController.getExpense;
// });
app.use('/expense',expenseRouter);
app.use(mainPageRouter);

//app.use(userRouter);
// const userController = require('./controllers/user');

//const authController= require('../middleware/authetication');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//CREATE A ROUTER FOR USERS
//router.get('/signup',userController.signupAuthentication);
// app.use('/purchase',purchaseRouter);
 //app.use('/expenses',expenseRouter);
// app.use('/premium',premiumRouter);
// app.use('/password',passwordRouter);
// app.listen(4000);
sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 4000);
    })
    .catch(err => console.log(err));