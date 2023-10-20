//IMPORT GLOABLE FS
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
        const pID = request.params.pID;
        const htmldata = await fs.readFile('./views/user/pDescription.html', 'utf-8');
        const data =  await Product.findByPk(pID)          
        const{id,pName,pQuantity,pPrice,pDescription,imgID,noItem} = data;
        const modifiedHtmlData = htmldata
            .replace(/{{pName}}/g, pName)
            .replace(/{{pPrice}}/g, pPrice)
            .replace(/{{pQuantity}}/g, pQuantity)
            .replace(/{{pDescription}}/g, pDescription)
            .replace(/{{imgID}}/g,`${imgID}.jpg`)
            .replace(/{{pID}}/g,`${pID}`);
        response.send(modifiedHtmlData);

    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }

};

//*******************************CONTROLLERS FOR USERS CART **********************************

exports.getfromCart = async (request,response,next)=>{
try{
    const pData =await Cart.findAll();
    response.send(pData);
}catch(error){
    console.log(error);
}
}

exports.addtoCart = async(request,response,next)=>{
    const pID = request.params.pID;
    try{
        
        const data =  await Product.findByPk(pID) 
        
        const uniqueProduct = await Cart.findByPk(pID);         
        const{id,pName,pQuantity,pPrice,pDescription,imgID,noItem} = data;
        if(uniqueProduct==null){
            await Cart.create({
                id:id,
                pName:pName,
                pQuantity:pQuantity,
                pPrice:pPrice,
                pDescription:pDescription ,
                imgID:imgID,
                noItem:noItem
            })
        }
        else{
             let newQty=uniqueProduct.noItem+1;
             Cart.update({
                noItem:newQty
             },{
                where:{
                    id:pID
                }
             })
        }
        response.redirect('/user/listed-product');

    }catch(err){
        console.log(err);
    }
}

exports.delete1fromCart = async (request,response,next)=>{
    const dID = request.params.dID;
    try{
        const deleteData =   await Cart.findByPk(dID);
        if(deleteData.noItem>1){
            let newqty=deleteData.noItem - 1 ;
            Cart.update({
                noItem : newqty
            },{
                where:{
                    id:dID
                }
            })
        }else{
            await Cart.destroy({
                where:{
                    id:dID
                }
            })
        }

        response.redirect('/user/cart');
    }catch(err){
        console.log(err);
    }
}

exports.removeFromCart = async(request,response,next)=>{
    const rID = request.params.rID;
    try{
        await Cart.destroy({
            where:{
                id:rID
            }
        })
        response.redirect('/user/cart');
    }catch(err){
        console.log(err);
    }
}