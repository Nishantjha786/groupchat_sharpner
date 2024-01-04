const myForm = document.getElementById('sign-up-form');
//const axios = require('axios');
myForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log('<<<<<<<signup button cliked in Event listner Fn 1>>>>>>');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
	 console.log("<<<<<<,name in signup.js>>>>>>>>",name);

    try {
        const res = await axios.post(`http://localhost:4000/user/sign-up`, 
        {
            name: name, 
            email: email, 
            password: password
        }
        );
        // const res =await fetch('http://localhost:5000/user/sign-up', {
        //     method: "POST",
        //     body: name,
        // });
        console.log('SIGN UP RESPONSE: ', res);
        if(res.status === 200){
            name.value = '';
            email.value = '';
            password.value = '';
            clearError();
            window.location.href = 'login.html';
        }
        
    } catch (error) {
        logErrorToUser(error);
        if(error.response.status === 400) {
            alert('User already exists!');
        }
        console.log(error);
    }
});

function logErrorToUser(error) {
    const err = document.getElementById('error-text');
    err.innerHTML = error.message;
};

function clearError() {
    const err = document.getElementById('error-text');
    err.innerHTML = '';
};