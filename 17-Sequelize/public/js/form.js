

//ASSIGN ELEMENTS TO A VARIABLE 
const fId =document.querySelector('#fId')
const fimgID = document.querySelector('#imgID');
const fName = document.querySelector('#fName');
const fQuantity= document.querySelector('#fQuantity');
const fPrice = document.querySelector('#fPrice');
const fDesription = document.querySelector('#fDescription'); 

const urlParams = new URLSearchParams(window.location.search);
const btnId = urlParams.get('id');
const status = urlParams.get('edit');

if (urlParams.has('id')) {
  editData(btnId);
}else{
fId.value = new Date().getTime();
imgID.value = Math.floor(Math.random()*10);
}

async function editData(btnId){
    try {

        const uniqueProduct = await axios.get(`http://192.168.29.221:3001/admin/productData/edit/${btnId}`);
        const { id, pName, pPrice, pQuantity, pDescription,imgID} = uniqueProduct.data; 
        console.log(imgID);
        fId.value = id;
        fName.value = pName;
        fPrice.value= pPrice;
        fQuantity.value= pQuantity;
        fDesription.value=pDescription;
        fimgID.value = imgID;

        await axios.get(`http://192.168.29.221:3001/admin/productData/remove/${btnId}`)       

    } catch (err) {
        console.log(err);
    }
}

