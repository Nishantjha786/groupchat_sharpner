// IMPORT EXPRESS 
const express = require('express');

//IMPORT LOCAL MODULES
const AdminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const db  = require('./utils/database');
//IMPORT MAIN PAGE CONROLLER 
const mainPagecontroler = require('./controllers/mainPage');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

//CREATE A MIDDLE WARE DOING PARSING 
app.use(express.urlencoded({extended:false}));

//CREATING A MIDDLE WARE TO USE CSS FILE 
app.use(express.static('public'));

//CREATE A MIDDLE WARE FOR ADMIN
app.use('/admin',AdminRouter);

//CREATE A MIDDLE WARE FOR SHOP 
app.use(shopRouter);

//CREATE A MIDDLE WARE FOR ERROR AND USE CONTROLLER 
app.use(mainPagecontroler.getErrorPage)


//START THE SERVER AND LISTEN ON PORT 3000
app.listen(5353, () => {
    console.log("Server is running on port 5353");
})
