//const express= require('http');
const express = require('express');
const router  = express.Router();
router.get('/',(req,res,next)=>{
    console.log("in the middle ware");
    res.send('<h1>hello from express home page js</h1>');
   // next();
    });

    module.exports = router;
