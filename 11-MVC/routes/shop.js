// IMPORT EXPRESS AND PATH
const express = require('express');
const mainpageControler = require('../controllers/mainPage');
//CREATE AN INSTANCE OF Router
const router = express.Router();
const shopController  =require('../controllers/products');

//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
router.get('/',mainpageControler.homePage)
//CREATE A MIDDLE WARE FOR COTACT US
router.get('/contactus',mainpageControler.contactUs)
router.get('/products/:pid',shopController.getproduct);
module.exports = router;

