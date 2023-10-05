//const express= require('http');
const express = require('express');
const router  = express.Router();
const app  = express();

router.get('/add',(req, res ,next)=>{
    console.log("in 2nd middle ware");
    res.send('<form action="/product" method = "POST"><input type ="text" name="title" ><button type = "submit">add</button></form>');
   res.send('<h1>hello from express add page js</h1>');
});

router.post('/product',(req, res ,next)=>{
 console.log(req.body);
res.redirect('/');
});

module.exports = router;