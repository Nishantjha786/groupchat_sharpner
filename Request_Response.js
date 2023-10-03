// const hobbies=  ['sports','cooking','']
// console.log(hobbies.map(hobby=>{
//     if(hobby=='')
//     return 'empty';
// else
//     return hobby;
// }))
const http =require('http');
const server = http.createServer((req,res)=>{
    // console.log(req.url , req.method,req.headers);
    // res.setHeader('Content-Type','text/html');
    // res.write('<html>');
    // res.write('<head><title> fist node js server page</title></head>')
    // res.write('<body> hi there how r u</body>');
    // res.end();
    const url = req.url;
    const method =req.method;
    if(url === '/home')
    {
        res.write('<html>');
        res.write('<head><title> fist node js server page</title></head>')
        res.write('<body>Welcome home</body>');
        res.end();
    }
    if(url === '/about')
    {
        res.write('<html>');
        res.write('<head><title> fist node js server page</title></head>')
        res.write('<body> Welcome to About Us page</body>');
        res.end();
    }
    if(url === '/node')
    {
        res.write('<html>');
        res.write('<head><title> fist node js server page</title></head>')
        res.write('<body> Welcome to my Node Js project</body>');
        res.end();
    }
});
server.listen(3000);