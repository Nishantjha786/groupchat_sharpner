
//IMPORT FS 
const fs = require('fs');

//CREATE A CLASS OF PRODUCT AND THEN EXPORTS 
module.exports = class Product {
    constructor(pName, pQuantity) {
        this.obj = {
            pName: pName,
            pQuantity: pQuantity
        };
    }
    //mehod to save data to array
    save() {
        fs.appendFileSync('./data/dataBase.txt',`${JSON.stringify(this.obj)}\n`); 
    }
    //static method to fetch array 
    static fetchAll() {
        return fs.readFileSync('./data/dataBase.txt','utf-8');
    }
};


//while handling with database always keep in mind play of asynchrounous operations