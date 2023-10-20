const fs = require('fs').promises;
const userDetails = require('../models/ExpenseData');

exports.gettrackerformPage = async(request,response,next)=>{
    try{
        response.sendFile('index.html',{root:'views/user'})
    }catch(err){
        console.log("error in getuserform page", err);
    }
}

exports.addexpenseDetails = async(request,response,next)=>{
    try{
        const{amount,description,category} = request.body;
        await userDetails.create({
            amount:amount,
            description : description ,
            category:category
        })
        response.redirect('/user/tracker');

    }catch(err){
        console.log("Error while adding the details of a new User",err);
        response.send('Duplicate Entry');
    }
}

exports.getallexpenseDetails = async(request,response,next)=>{
    try{
        const data = await userDetails.findAll();
        response.send(data);

    }catch(err){
        console.log("Error while fetching all users Details",err);
    }

}

exports.deleteexpenseDetails = async(request,response,next)=>{ 
    const dID = request.params.dID;
    try{
        await userDetails.destroy({
            where:{
                id : dID
            }
        })
        response.redirect('/user/tracker');
    }catch(err){
        console.log("Error while deleting user Details with id : ",dID,err)
    }
}

exports.editexpenseDetails = async(request,response,next)=>{
    const eID = request.params.eID;
    try {
        const uniqueProduct = await userDetails.findByPk(eID);
        response.send(uniqueProduct);
    } catch (error) {
        console.log(error);
    }
}