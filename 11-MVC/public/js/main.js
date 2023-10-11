document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); 
document.getElementById('msgDiv').classList.remove('d-none');
document.getElementById('name').value = ""; // Clear the name input field
document.getElementById('email').value = ""; // Clear the email input field
document.getElementById('message').value = ""; // Clear the message textarea

});