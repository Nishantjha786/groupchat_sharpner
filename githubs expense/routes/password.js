// IMPORT EXPRESS 
const express = require('express');

//IMPORT CONTROLLERS 
const passwordController = require('../controllers/password');
//CREATE AN INSTANCE OF Router
const router = express.Router();

//CREATE A ROUTER FOR PASSWORD RESET
//router.get('/reset/:id', passwordController.resetpasswordform);
//router.post('/reset',passwordController.resetpassword);
router.post('/forgotpassword',passwordController.forgotPassword);
router.get('/resetpassword/:id', passwordController.resetPassword);
router.get('/updatepassword/:id', passwordController.updatePassword);

module.exports = router;
