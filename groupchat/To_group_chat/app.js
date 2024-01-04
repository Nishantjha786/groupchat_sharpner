
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require('express');

 const sequelize = require('./util/database');

 const compression = require('compression');
 const morgan = require('morgan');

//models
//const User = require('./models/user');
const Chat = require('./models/chat');
const Group = require('./models/group');
const Request = require('./models/request');
const Admin = require('./models/admin');
const ArchivedChat = require('./models/archivedChat');

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


//const expenseRouter = require('./routes/expenses');

const passwordController = require('./controllers/password');
//routes
const homepageRoutes = require('./routes/homepage');
const groupRoutes = require('./routes/group');
const userRoutes = require('./routes/user');

// routes
app.use(homepageRoutes);
app.use('/group', groupRoutes);
app.use('/user', userRoutes);

const expenseController = require('./controllers/expense');

const authenticator = require('./middleware/authetication');

/* ---------- Database relations start ---------- */

// User -> Chat : one to many
User.hasMany(Chat);
Chat.belongsTo(User);

// Group -> Chat : one to many
Group.hasMany(Chat);
Chat.belongsTo(Group);

// User -> Group : many to many
User.belongsToMany(Group, { through: 'User_Group' });
Group.belongsToMany(User, { through: 'User_Group' });

// User -> Request : one to many
User.hasMany(Request);
Request.belongsTo(User);

// Group -> Request : one to many
Group.hasMany(Request);
Request.belongsTo(Group);

// User -> Admin : one to Many
User.hasMany(Admin);
Admin.belongsTo(User);

// Group -> Admin : one to many
Group.hasMany(Admin);
Admin.belongsTo(Group);

// User -> ArchivedChat : one to many
User.hasMany(ArchivedChat);
ArchivedChat.belongsTo(User);

// Group -> ArchivedChat : one to many
Group.hasMany(ArchivedChat);
ArchivedChat.belongsTo(Group);

/* ---------- Database relations end ---------- */
const router = express.Router();

sequelize.sync()
    .then(() => {
        app.listen( 4000);
    })
    .catch(err => console.log(err));