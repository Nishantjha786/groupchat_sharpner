const fs =require('fs');
const requestHandler = (req,res)=>{
    const url = req.url;
    const method =req.method;
    if(url === '/')
    {
        fs.readFile("message.txt", {encoding:"utf-8"}, (err , data)=>{
            if(err){
            comsole.log(err);
            }
            console.log(data);
            res.write('<html>');
            res.write('<head><title> Enter message</title></head>')
            res.write('<body><form action="/message" method = "POST"><input type="text" name="message"><button type ="submit"></button></form></body>');
            res.write(`<body>${data}</body>`)
            res.write('</html>');
           return  res.end();

        });
 
    }
else if(url==='/message' && method ==='POST')
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
 else{
    res.setHeader('Content-Type','text/html');
    res.write("<html>");
    res.write("<head><title> fist node js server page</title></head>")
    res.write('<body><h1> hi from NODE JS</h1></body>');
    res.write('</html>');

    res.end();
 }
}

// module.exports = requestHandler;
module.exports.handler = requestHandler;
module.exports.someText = "some random text";
