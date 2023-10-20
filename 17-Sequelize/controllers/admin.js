
const fs = require('fs').promises;

const Product = require('../models/product')


exports.adminAddProductpage = (request, response, next) => {
    // Send a response just for admin/add-product incoming requests
    response.sendFile('addProduct.html', { root: 'views/admin' });
}


exports.adminAddproduct = async (request, response, next) => {
    try {
        // Get data from the request body
        const { id, productName, pPrice, pQuantity, pDescription,imgID} = request.body;
        await Product.create({
            id:id,
            pName:productName,
            pQuantity:pQuantity,
            pPrice:pPrice,
            pDescription:pDescription ,
            imgID:imgID,
            noItem:1
        })

        response.redirect('/admin/listed-product');
    } catch (err) {
        console.error(err);
        // Handle errors and send an appropriate response
        response.status(500).send('Internal Server Error');
    }
};


exports.getproductlistPage = (request,response,next)=>{
    response.sendFile('productList.html',{root:'views/admin'});
}

exports.getallproductData = async (request,response,next)=>{
try{
    const pData =await Product.findAll();
    response.send(pData);
}catch(error){
    console.log(error);
}
}

// exports.addtoproductData = async(request,response,next)=>{
//     const { id, productName, pPrice, pQuantity, pDescription,imgID} = request.body;
//     try{
//         // Create a new product
//         const product = new Product(id, productName, pPrice, pQuantity, pDescription,imgID);
//         // Save the product to the database
//         product.save();

//     }catch(err){
//         console.log(err);
//     }
// }


exports.removefromProductData = async(request,response,next)=>{
    const rID = request.params.rID;
    try{
        await  Product.destroy({
            where:{
                id:rID
            }
         })
        response.sendFile('productList.html',{root:'views/admin'});
    }catch(err){
        console.log(err);
    }
}

exports.editproductData = async(request,response,next)=>{
    const eID = request.params.eID;
    try{
        const uniqueProduct = await Product.findByPk(eID);
        response.send(uniqueProduct);
    }catch(err){
        console.log(err);
    }
}