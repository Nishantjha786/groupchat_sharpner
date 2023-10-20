const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/tracker',userController.gettrackerformPage);
router.post('/tracker',userController.addexpenseDetails);
router.get('/tracker/data',userController.getallexpenseDetails)
router.get('/tracker/delete/:dID',userController.deleteexpenseDetails);
router.get('/tracker/edit/:eID',userController.editexpenseDetails);

module.exports = router;