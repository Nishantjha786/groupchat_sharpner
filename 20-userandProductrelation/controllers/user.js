//IMPORT GLOABLE FS AND LOCAL PRODUCT AND CART MODEL
const fs = require('fs').promises;
const Product = require('../models/product');
const Cart = require('../models/cart')

//*******************************CONTROLLERS FOR USERS **********************************


exports.userListProduct = async (request, response, next) => {
    try {
        // Read the HTML file
        const htmlData = await fs.readFile('./views/user/listProduct.html', 'utf-8');

        // Read the JSON data from the database
        const data =  await Product.findAll();
        if (data !== "") {

            // Find the placeholder index in the HTML
            const placeholderIndex = htmlData.indexOf('<div id="product-card-placeholder"></div>');

            let startingHtmlData = htmlData.slice(0, placeholderIndex);

            // Generate HTML for each product in the database
            for (const element of data) {
                const { id, pName, pPrice,imgID } = element;
                const newProductCard = await fs.readFile('./views/user/productCard.html', 'utf8');

                // Replace placeholders with actual data
                const replacedCard = newProductCard
                    .replace(/{{pName}}/g, pName)
                    .replace(/{{pPrice}}/g, pPrice)
                    .replace(/{{pID}}/g, id)
                    .replace(/{{imgID}}/g,`${imgID}.jpg`);

                startingHtmlData += replacedCard;
            }

            let modifiedHtmlData = startingHtmlData + htmlData.slice(placeholderIndex);
            response.send(modifiedHtmlData);
        }
        else{
            response.send(htmlData);
        }
    } catch (err) {
        console.error(err);
        // Handle errors and send an appropriate response
        response.status(500).send('Internal Server Error');
    }
};


exports.userpDescription = async (request, response) => {
    try {
        // Get product ID from request params
        const pID = request.params.pID;

        // Read HTML file for product description
        const htmldata = await fs.readFile('./views/user/pDescription.html', 'utf-8');

        // Find product by ID
        const data = await Product.findByPk(pID);         

        // Extract product details
        const{id,pName,pQuantity,pPrice,pDescription,imgID,noItem} = data;

        // Replace placeholders with actual product details
        const modifiedHtmlData = htmldata
            .replace(/{{pName}}/g, pName)
            .replace(/{{pPrice}}/g, pPrice)
            .replace(/{{pQuantity}}/g, pQuantity)
            .replace(/{{pDescription}}/g, pDescription)
            .replace(/{{imgID}}/g,`${imgID}.jpg`)
            .replace(/{{pID}}/g,`${pID}`);

        // Send modified HTML data as response
        response.send(modifiedHtmlData);

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }

}

//*******************************CONTROLLERS FOR USERS CART **********************************

exports.getfromCart = async (request, response, next) => {
    try {
        // Find all items in cart
        const cart = await request.user.getCart();
        // Send items as response
        const pData = await cart.getProducts();
        response.send(pData);
    } catch (error) {
        // Log error if any
        console.log(error);
    }
}

exports.addtoCart = async(request,response,next)=>{
    // Get product ID from request params
    const pID = request.params.pID;

    try{
       let newQuantity = 1;
        const cart = await request.user.getCart();
        const uniqueProduct = await Product.findByPk(pID);
        // Check if product already exists in cart
        const cartProduct = await cart.getProducts({where:{id:pID}});
        // If product doesn't exist in cart, create a new cart item
        if(cartProduct==""){            
            cart.addProduct(uniqueProduct,{through:{quantity:newQuantity}});
        }
        else{
            const oldQuantity = cartProduct[0].CartItem.quantity;
            newQuantity = oldQuantity+1;
            cart.addProduct(uniqueProduct,{through:{quantity:newQuantity}});
        }       

        // Redirect to user's listed products page
        response.redirect('/user/listed-product');

    }catch(err){
        console.log(err);
    }
}

exports.delete1fromCart = async (request,response,next)=>{
    const dID = request.params.dID; 
    try{
        const cart = await request.user.getCart();
        const deleteData =   await cart.getProducts({where:{id:dID}});
        if(deleteData[0].CartItem.quantity>1){ 
            const uniqueProduct = deleteData[0];
            let newQuantity=deleteData[0].CartItem.quantity - 1 ; 
            cart.addProduct(uniqueProduct,{through:{quantity:newQuantity}});
        }else{
            await deleteData[0].CartItem.destroy();
        }

        response.redirect('/user/cart'); 
    }catch(err){
        console.log(err); 
    }
}

exports.removeFromCart = async (request, response, next) => {
    // Get item ID from request params
    const rID = request.params.rID;

    try {
        const cart = await request.user.getCart();
        const deleteData =   await cart.getProducts({where:{id:rID}});
        await deleteData[0].CartItem.destroy();
        // Redirect to user cart page
        response.redirect('/user/cart');
    } catch (err) {
        // Log error
        console.log(err);
    }
};