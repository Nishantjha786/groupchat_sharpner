// IMPORT EXPRESS 
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

//IMPORT LOCAL MODULES
const AdminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

//IMPORT MAIN PAGE CONROLLER 
const mainPagecontroler = require('./controllers/mainPage');

//CREATE AN INSTANCE OF THE EXPRESS APPLICATION
const app = express();

app.use(cors());

//CREATE A MIDDLE WARE DOING PARSING 
app.use(express.urlencoded({extended:false}));

//CREATING A MIDDLE WARE TO USE CSS FILE 
app.use(express.static('public'));

//CREATE A MIDDLE WARE FOR ADMIN
app.use('/admin',AdminRouter);


//CREATE A MIDDLE WARE FOR SHOP 
app.use('/user',userRouter);

//CREATE A MIDDLE WARE FOR MAIN HOME PAGE 
app.get('/',mainPagecontroler.getHomepage);

//CREATE A MIDDLE WARE FOR ERROR AND USE CONTROLLER 
app.use(mainPagecontroler.getErrorPage)

//TO SYNC THE MODELS WITH DATABASE 

async function initiate(){
    try{
         await sequelize.sync();
       //START THE SERVER AND LISTEN ON PORT 3000
       app.listen(3001, () => {
    console.log("Server is running on port 3001");
        })
    }catch(err){
        console.log(err);
    }
}
initiate();
