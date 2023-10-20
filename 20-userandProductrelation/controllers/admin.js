
const Product = require('../models/product')

exports.adminAddProductpage = (request, response, next) => {
    //send add product form 
    response.sendFile('addProduct.html', { root: 'views/admin' });
}      

exports.adminAddproduct = async (request, response, next) => {
    try {
        // Get data from the request body        
        const { id, productName, pPrice, pQuantity, pDescription,imgID} = request.body;
        await request.user.createProduct({
            id:id,
            pName:productName,
            pQuantity:pQuantity,
            pPrice:pPrice,
            pDescription:pDescription ,
            imgID:imgID,
        })
        response.redirect('/admin/listed-product');
    } catch (err) {
        console.error(err);
        // Handle errors and send an appropriate response
        response.status(500).send('Internal Server Error');
    }
};

exports.getproductlistPage = (request,response,next)=>{
    // Send product list HTML file
    response.sendFile('productList.html',{root:'views/admin'});
}


exports.getallproductData = async (request,response,next)=>{
    try{
        // Fetch all product data from database
        const pData = await request.user.getProducts();

        // Send product data as response
        response.send(pData);
    }catch(error){
        // Log error if any occurs
        console.log(error);
    }
}

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
        const uniqueProduct = await request.user.getProducts({where:{id:eID}})
        response.send(uniqueProduct[0]);
    }catch(err){
        console.log(err);
    }
}