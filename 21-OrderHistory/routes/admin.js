// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

//IMPORT CONTROLLER TO  ADD PRODUCT AND GET PRODUCT 
const adminController = require('../controllers/admin');
const mainPagecontroler = require('../controllers/mainPage');


//CREATE AN INSTANCE OF Router
const router = express.Router();
//DEFINE A ROUTE FOR THE /admin/add-product PATH USING CONTROLLER 
router.get('/add-product', adminController.adminAddProductpage)

router.post('/listed-product',adminController.adminAddproduct)

//DEFINE A ROUTE FOR THE /admin/product PATH
router.get('/listed-product',adminController.getproductlistPage)
//DEFINE A DEFAULT ROUTE FOR THE ROOT PATH '/'
router.get('',mainPagecontroler.getadminHomepage);

//ROUTES FOR AXIOS 
router.get('/productData',adminController.getallproductData);
router.get('/productData/edit/:eID',adminController.editproductData);

router.get('/productData/remove/:rID',adminController.removefromProductData);


//EXPORT CREATED MODULE

module.exports = router;