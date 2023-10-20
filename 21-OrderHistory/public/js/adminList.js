//ASSIGNING ELEMENTS TO VARIABLE
const productDiv = document.querySelector('#productDiv');

//FUNCTION TO ADD PRODUCTS TO WEBSITE 
function showOutput(response){
    productDiv.innerHTML="";
    response.data.forEach((ele)=>{
        const htmlText = `
        <div class="col-md-4 col-lg-3 mb-4">
        <div class="card">
            <div class="card-header bg-warning text-center">
                <h2> ${ele.pName}</h2>
            </div>
            <img src="/images/${ele.imgID}.jpg" alt="" class="card-img-top ">
            <div class="card-body">
                <h4 class="card-text text-center"> &#8377;${ele.pPrice}</h4>
                <div class="text-center m-2" id="buttons">
                <a href="/admin/add-product/?id=${ele.id}&edit=true" class="btn btn-success m-2 e-btn" >Edit</a>
                <button class="btn btn-outline-danger m-2 r-btn" id="${ele.id}">Remove</button>
                </div>
            </div>
        </div>
    </div>
        `;
        productDiv.innerHTML+=htmlText;
    })
}

//FUNCTION FOR REMOVE BUTTON

async function onclickBtn(e) {    
    const btnId = e.target.id;
    if (e.target && e.target.classList.contains("r-btn")) {
        e.preventDefault();
        try {
            await axios.get(`http://192.168.29.221:3001/admin/productData/remove/${btnId}`);
            refresh();

        } catch (err) {
            console.log(err);
        }
    }

}

//OPENING WEBSITE
async function refresh(){
    try {
        const response = await axios.get('http://192.168.29.221:3001/admin/productData');
        showOutput(response)
    } catch (err) {
        console.log(err);
    }
}
refresh();


productDiv.addEventListener('click',onclickBtn);











