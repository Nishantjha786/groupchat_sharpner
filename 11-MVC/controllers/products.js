const fs = require('fs');

const Product = require('../models/product');

exports.addProduct = (request, response, next) => {
    // Send a response just for /add-product incoming requests
    response.sendFile('add-product.html', { root: 'views' });
}

exports.listProduct = (request, response, next) => {
    //get body to pass to browser
    const { productName, pQuantity } = request.body;
    //create an object of prduct and save to database
    const product = new Product(productName,pQuantity);
    product.save();
    console.log(Product.fetchAll());
        const htmlData = fs.readFileSync('./views/listed-product.html', 'utf-8');
        const newProductCard = fs.readFileSync('./views/cardContent.html', 'utf8').replace(/{{pName}}/g, productName).replace(/{{quatity}}/g, pQuantity)
        const placeholderIndex = htmlData.indexOf('<div id="product-card-placeholder"></div>');
        if (placeholderIndex !== -1) {
            const modifiedHtmlData =
                htmlData.slice(0, placeholderIndex) + newProductCard + htmlData.slice(placeholderIndex);
            //   fs.writeFileSync('./views/listed-product.html',modifiedHtmlData);
            response.send(`${modifiedHtmlData}`);

        } else {
            // Handle the case where the placeholder was not found
            console.error('Placeholder not found in the HTML.');
        }

}



