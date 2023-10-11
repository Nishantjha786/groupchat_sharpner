// IMPORT EXPRESS 
const express = require('express');
const path = require('path');
const mainpageControler = require('./controllers/mainPage');
//IMPORT LOCAL MODULES
const AdminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

//CREATE A MIDDLE WARE DOING PARSING 
app.use(express.urlencoded({extended:false}));

//CREATE A STATIC MIDDLE WARE TO ACCESS PUBLIC FOLDER
app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static(__dirname + '/public'));

//CREATE A MIDDLE WARE FOR ADMIN
app.use('/admin',AdminRouter);

//CREATE A MIDDLE WARE FOR SHOP 
app.use(shopRouter);

//CREATE A MIDDLE WARE FOR ERROR 
app.use('/',mainpageControler.errorPage);
//START THE SERVER AND LISTEN ON PORT 3000
app.listen(3030, () => {
    console.log("Server is running on port 3030");
})
