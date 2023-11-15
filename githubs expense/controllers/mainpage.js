
exports.getLoginPage = (request, response, next) => {
    response.sendFile('login.html', { root: 'views' });
}
exports.getSignupPage = (request,response,next) =>{
    response.sendFile('Signup.html',{root:'views'});
}
exports.getHomePage = (request,response,next) =>{
  //  console.log("<<<<<<<<In user get home page function>>>>>>>>>>>> ");
  response.sendFile('tracker.html',{root:'views'});
}

