// IMPORT EXPRESS 
const express = require('express');


//IMPORT CONTROLLERS 
const userController = require('../controllers/user');
//const authController= require('../middleware/authetication');

//CREATE AN INSTANCE OF Router
const router = express.Router();
const authController= require('../middleware/authetication');
const mainpageController = require('../controllers/mainpage');
//CREATE A ROUTER FOR USERS

router.get('/sign-up', mainpageController.getSignupPage);

router.get('/login', mainpageController.getLoginPage);
router.get('/home', mainpageController.getHomePage);
// router.post('/sign-up', function(req,res){
//     console.log("In Sign up route");
//     userController.addUser;
// });
router.post('/sign-up',userController.addUser);

router.post('/login', userController.logUser);
//router.get('/currentuser',authController.authorization,userController.getcurrentuser);
//router.get('',userController.usergethomePage);

module.exports = router;

