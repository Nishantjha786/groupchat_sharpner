// index.js

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log('<<<<<<<<<<<In addevent listner>>>>>.');
  // axios.post("https://reqres.in/api/login", {
  //     email: email,
  //     password: password
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   });

  axios.get("http://localhost:4000/expense/get-expense")
  .then((response) => {
    console.log('<<<<<<<<<<<axios response is>>>>>.',response);
  }).catch((error)=>{
    console.log('<<<<<<<<<<<axios error is>>>>>.',error);
  });



});