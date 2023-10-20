const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/appointments',userController.getuserformPage);
router.post('/appointments',userController.adduserDetails);
router.get('/appointments/data',userController.getalluserDetails)
router.get('/appointments/delete/:dID',userController.deleteuserDetails);
router.get('/appointments/edit/:eID',userController.edituserDetails);

module.exports = router;