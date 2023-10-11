// IMPORT EXPRESS AND FS
const express = require('express');
const fs = require('fs');

const productController = require('../controllers/products')

//CREATE AN INSTANCE OF Router
const router = express.Router();

//DEFINE A ROUTE FOR THE /admin/add-product PATH
router.get('/add-product',productController.addProduct)

//DEFINE A ROUTE FOR THE /admin/product PATH
router.post('/listed-product',productController.listProduct)


//EXPORT CREATED MODULE
module.exports = router;