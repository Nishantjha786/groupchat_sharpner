 const http =require('http');
const express = require('express');
const fs  =  require('fs');
const { messages } = require('babel-core');
const app  = express();
// const bodyParser  = require('body-parser');
app.use(express.urlencoded({extended:false}));
// const store = require("store2");



app.use('/login',(req, res ,next)=>{
        console.log("in 2nd middle ware");
        // response.send('<form onsubmit="localstorage.setItem('username',document.getElementbyId('title').value)" action="/" method = "get"><input type ="text" placeholder ="enter name " name="title" id="title" ><button type = "submit">add</button></form>');
        res.send(`<form onsubmit="localStorage.setItem('userName',document.getElementById('userName').value)" action="/" method="get">
        <input type="text" placeholder="Enter your Name" name = "userName" id ="userName" >
        <button type="submit"> Add</button>
    </form>`);
    });
    app.get('/',(request,response,next)=>{
      response.send(
          `<form onsubmit="document.getElementById('userName').value = localStorage.getItem('userName')" action="/" method="post">
      <input type="text" placeholder="Enter your message" name = "message" required>
      <input  name = "userName" id ="userName" type="hidden" >
      <button type="submit"> Add</button>
  </form>`  
      )
  })

  app.post('/',(request,response,next)=>{
console.log(request.body);
const { message, userName}= request.body;
fs.appendFileSync('chatbackup.txt',`${userName}:${message}\n`);
const chat = fs.readFileSync('chatbackup.txt','utf-8');
response.send(
  `<p>${chat}</p><form onsubmit="document.getElementById('userName').value = localStorage.getItem('userName')" action="/" method="post">
<input type="text" placeholder="Enter your message" name = "message" required>
<input  name = "userName" id ="userName" type="hidden" >
<button type="submit"> Add</button>
</form>`  
)

  })







  //  res.send('<h3>Enter the message </h3></br><form action="/chat" method = "POST"><input type ="text" name="title" ><button type = "submit">add</button></form>');
  //    console.log(req.body);
  // //  res.redirect('/');

//     app.use('/',(req,res,next)=>{
//         console.log("in the middle ware");
//         res.send('<h1>hello from express home page js 1</h1>');
//        // next();
//         });
    
const server = http.createServer(app);

server.listen(3000);


