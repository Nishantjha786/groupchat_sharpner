const path = require('path');
exports.homePage = (request,response,next)=>{
    // Send a response form for all incoming requests
    // response.sendFile(path.join(__dirname,'../','views','home.html'));
    response.sendFile('home.html', { root: 'views' });
}

exports.contactUs = (request,response,next)=>{
    response.sendFile('contactus.html',{root: 'views'})
}

exports.errorPage = (reuest,response,next)=>{
    response.status(404).sendFile('notFound.html',{root:'views'});
}