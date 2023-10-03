// const hobbies=  ['sports','cooking','']
// console.log(hobbies.map(hobby=>{
//     if(hobby=='')
//     return 'empty';
// else
//     return hobby;
// }))
const http =require('http');
const fs =require('fs');
const server = http.createServer((req,res)=>{
   
    const url = req.url;
    const method =req.method;
    if(url === '/')
    {
        res.write('<html>');
        res.write('<head><title> Enter message</title></head>')
        res.write('<body><form action="/message" method = "POST"><input type="text" name="message"><button type ="submit"></button></form></body>');
        res.write('</html>');
        res.end();
    }
if(url==='/message' && method ==='POST')
{
    const body = [];
    req.on('data',chunk=>{
        console.log(chunk);
        body.push(chunk);
    });
    return req.on('end',()=>{
        const parseBody =Buffer.concat(body).toString();
        const message =parseBody.split('=')[1];
        fs.writeFile('message.txt',message,err=>{
            res.statusCode =302;
            res.setHeader= ('Location','/');
            return res.end();
        });
    });
}
 //console.log(req.url , req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title> fist node js server page</title></head>')
    res.write('<body><h1> hi from NODE JS</h1></body>');
    res.write('</html>');
    res.end();
  
});
server.listen(3000);