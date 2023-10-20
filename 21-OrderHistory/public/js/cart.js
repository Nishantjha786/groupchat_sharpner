//ASSIGN ELEMENTS TO VARIABLE 

const tableBody = document.querySelector('#tableBody');
const checkoutBtn = document.querySelector('#checkoutBtn');
const priceSpan = document.querySelector('#totalPrice');
const taxSpan = document.querySelector('#tax');
const grandSpan = document.querySelector('#grandTotal');

//FUNCTION TO ADD CART ITEMS TO WEBSITE 
function showOutput(response) {
    let totalPrice = 0;
    tableBody.innerHTML = "";
    //by looping through all object adding products to cart page
    response.data.forEach((ele, index) => {
        totalPrice += Number(ele.pPrice) * Number(ele.CartItem.quantity);
        const tr = document.createElement('tr');
        const text = `
        <td>${index + 1}</td>
        <td>${ele.pName}</td>
        <td>&#8377;${ele.pPrice}</td>
        <td class="d-flex align-items-center flex-column flex-md-row">
            <button class="btn btn-sm btn-danger d-btn" id="${ele.id}">-</button>
            <span class="mx-2">${ele.CartItem.quantity}</span>
            <button class="btn btn-sm btn-success i-btn" id="${ele.id}">+</button>
        </td>
        <td class="text-center"><button class="btn btn-sm btn-warning r-btn" id="${ele.id}">Remove</button></td>
        `;
        tr.innerHTML += text;
        tableBody.appendChild(tr);
    });
    //assigning the values for order summarry
    priceSpan.innerHTML = totalPrice.toFixed(2);
    const taxPrice = ((totalPrice * 2.5) / 100);
    taxSpan.innerHTML = taxPrice.toFixed(2);
    grandSpan.innerHTML = (totalPrice + taxPrice).toFixed(2);
}

//FUNCTION TO EXECUTE WHILE CLICK BUTTONS 

async function onclickBtn(e) {
    e.preventDefault();
    const btnId = e.target.id;

    //for inceasing btn 
    if (e.target && e.target.classList.contains("i-btn")) {
        try {
            await axios.get(`http://192.168.29.221:3001/user/cart/add/${btnId}`);
            const response = await axios.get('http://192.168.29.221:3001/user/cart/productData');
            showOutput(response)

        } catch (err) {
            console.log(err);
        }
    }

    //for decreasing btn 
    if (e.target && e.target.classList.contains("d-btn")) {
        try {
            await axios.get(`http://192.168.29.221:3001/user/cart/delete/${btnId}`);
            const response = await axios.get('http://192.168.29.221:3001/user/cart/productData');
            showOutput(response)

        } catch (err) {
            console.log(err);
        }
    }

    //for removing btn 
    if (e.target && e.target.classList.contains("r-btn")) {
        try {
            await axios.get(`http://192.168.29.221:3001/user/cart/remove/${btnId}`);
            const response = await axios.get('http://192.168.29.221:3001/user/cart/productData');
            showOutput(response)

        } catch (err) {
            console.log(err);
        }
    }

}


//OPENING WEBSITE 
async function refresh() {
    try {
        const response = await axios.get('http://192.168.29.221:3001/user/cart/productData');
        showOutput(response)
    } catch (err) {
        console.log(err);
    }
}
refresh();



// EVENT LISTENERS 
tableBody.addEventListener('click', onclickBtn);