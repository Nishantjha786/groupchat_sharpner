// IMPORT EXPRESS 
const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');

//IMPORT MODELS 
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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

//CREATE A MIDDLE WARE TO USE USER 
app.use(async (request, response, next) => {
    try {
      const user = await User.findByPk(1);
      request.user = user;
      next();
    } catch (err) {
      console.log(err);
    }
  });
  

//CREATE A MIDDLE WARE FOR ADMIN
app.use('/admin',AdminRouter);


//CREATE A MIDDLE WARE FOR SHOP 
app.use('/user',userRouter);

//CREATE A MIDDLE WARE FOR MAIN HOME PAGE 
app.get('/',mainPagecontroler.getHomepage);

//CREATE A MIDDLE WARE FOR ERROR AND USE CONTROLLER 
app.use(mainPagecontroler.getErrorPage)

//DEFINE ASSOCIATION
User.hasMany(Product);
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});
Product.belongsToMany(Order,{through:OrderItem});



//TO SYNC THE MODELS WITH DATABASE 
async function initiate(){
    try{
         await sequelize.sync();
         let user = await User.findByPk(1);
         
         if(!user){
            user =  await User.create({
                name:'Mufil',
                email:'ramanizum@gmail.com'
            })
            await user.createCart();
         }
       //START THE SERVER AND LISTEN ON PORT 3000
       app.listen(3001, () => {
    console.log("Server is running on port 3001");
        })
    }catch(err){
        console.log(err);
    }
}
initiate();
