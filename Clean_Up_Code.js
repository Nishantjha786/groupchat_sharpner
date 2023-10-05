// const hobbies=  ['sports','cooking','']
// console.log(hobbies.map(hobby=>{
//     if(hobby=='')
//     return 'empty';
// else
//     return hobby;
// }))
const http =require('http');
const express = require('express');
const app  = express();
// const routes  = require('./routes');
app.use((req,res,next)=>{
console.log("in the middle ware");
next();
});
app.use((req, res ,next)=>{
    console.log("in 2nd middle ware");
    res.send('<h1>hello from express  js</h1>')
})
 const server = http.createServer(app);

//console.log(routes.someText);
server.listen(3000);
