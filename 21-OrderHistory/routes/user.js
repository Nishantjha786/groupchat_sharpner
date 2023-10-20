// IMPORT EXPRESS AND PATH
const express = require('express');
const path = require('path');
const fs = require('fs');

//IMPORT CONTROLLERS 
const userController = require('../controllers/user');
const mainPagecontroler = require('../controllers//mainPage');

//CREATE AN INSTANCE OF Router
const router = express.Router();

//CREATE A ROUTER FOR USERS 
router.use('/listed-product',userController.userListProduct)

//DEFINE A DYNAMIC ROUTE FOR DESCRIPTION 
router.get('/products/:pID',userController.userpDescription);

//DEFINE ROUTES FOR CART CHECKOUT
router.post('/create-order',userController.createOrder);
router.get('/order-history',userController.getorderHistoryPage);
router.get('/order-data',userController.getorderHistory);

//DEFINE ROUTES FOR CART IN AXIOS
router.get('/cart/productData',userController.getfromCart);

router.get('/cart/delete/:dID',userController.delete1fromCart);

router.get('/cart/remove/:rID',userController.removeFromCart);

router.get('/cart/add/:pID',userController.addtoCart);

router.get('/',mainPagecontroler.getUserHomepage)

router.get('/cart',(request,response,next)=>{
    response.sendFile('cart.html',{root:'views/user'});
})


module.exports = router;

