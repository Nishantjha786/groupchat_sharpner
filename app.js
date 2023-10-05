const http =require('http');
const express = require('express');
const app  = express();
const bodyParser  = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',(req,res,next)=>{
    console.log("in the middle ware");
    res.send('<h1>hello from express home page js</h1>');
   // next();
    });

app.use('/add',(req, res ,next)=>{
        console.log("in 2nd middle ware");
        res.send('<form action="/product" method = "POST"><input type ="text" name="title" ><button type = "submit">add</button></form>');
       res.send('<h1>hello from express add page js</h1>');
    });

app.use('/product',(req, res ,next)=>{
     console.log(req.body);
    res.redirect('/');
    });
    
const server = http.createServer(app);

server.listen(3000);


