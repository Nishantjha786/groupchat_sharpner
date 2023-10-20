const fs = require('fs').promises;
const userDetails = require('../models/userDetails');

exports.getuserformPage = async(request,response,next)=>{
    try{
        response.sendFile('index.html',{root:'views/user'})
    }catch(err){
        console.log("error in getuserform page", err);
    }
}

exports.adduserDetails = async(request,response,next)=>{
    try{
        const{uName,emailId,phoneNo,date,time} = request.body;
        await userDetails.create({
            uName:uName,
            emailId:emailId,
            phoneNo:phoneNo,
            date:date,
            time:time           
        })
        response.redirect('/user/appointments');

    }catch(err){
        console.log("Error while adding the details of a new User",err);
        response.send('Duplicate Entry');
    }
}

exports.getalluserDetails = async(request,response,next)=>{
    try{
        const data = await userDetails.findAll();
        response.send(data);

    }catch(err){
        console.log("Error while fetching all users Details",err);
    }

}

exports.deleteuserDetails = async(request,response,next)=>{ 
    const dID = request.params.dID;
    try{
        await userDetails.destroy({
            where:{
                id : dID
            }
        })
        response.redirect('/user/appointments');
    }catch(err){
        console.log("Error while deleting user Details with id : ",dID,err)
    }
}

exports.edituserDetails = async(request,response,next)=>{
    const eID = request.params.eID;
    try {
        const uniqueProduct = await userDetails.findByPk(eID);
        response.send(uniqueProduct);
    } catch (error) {
        console.log(error);
    }
}