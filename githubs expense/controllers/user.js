const User = require('../models/user');
//const PremiumUser = require('../models/premium-user');
//const Download = require('../models/download');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { regexpToText } = require('nodemon/lib/utils');
const saltRounds = 10;
//const Razorpay = require('razorpay');

exports.addUser = (req, res, next) => {
    const {name, email, password} = req.body;
console.log("In add user function");
    if(name.length > 0 && email.length > 0 && password.length > 0) {
        bcrypt.hash(password, saltRounds, function(error, hash) {
            // Store hash in your password DB.
            User.create(
                {
                    name: name, 
                    email: email, 
                    password: hash
                })
                .then(() => {
                    console.log("<<<<new user created>>>>>>>>");
                    res.status(200).send({success: true, message: 'new user created'});
                })
                .catch(err => {
                    console.log(err);
                    if(err.name === 'SequelizeUniqueConstraintError'){
                        return res.status(400).json({success: false, message: err});
                    };
                    res.status(500).json({success: false, message: err});
                });
        });
    } else {
        res.status(400).json({success: false, message: 'bad parameters'});
    }
};

exports.logUser = (req, res, next) => {
    const {email, password} = req.body;

    if(email.length > 0 && password.length > 0) {
        User.findAll({where: {email: email}})
            .then(users => {
                
                const user = users[0];
                if(!user) {
                    return res.status(404).json({success: false, message: 'user does not exist'});
                }

                bcrypt.compare(password, user.password, function(error, result) {
                    if(error) {
                        return res.status(500).json({success: false, message: err});
                    }
                    if(result == true) {
                        const token = jwt.sign({userId: user.id, name: user.name}, 'archie_jwt_secret_key');
                        res.status(200).json({
                            success: true, 
                            message: 'user found',
                            token: token
                        });
                    } else {
                        res.status(401).json({success: false, message: 'password is incorrect'});
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({success: false, message: err});
            });
    } else {
        res.status(400).json({success: false, message: 'bad parameters'});
    }
};

exports.makePremium = async (req, res, next) => {
    try {
        var instance = new Razorpay({ key_id: process.env.RZP_KEY_ID, key_secret: process.env.RZP_KEY_SECRET });
    
        let order = await instance.orders.create({
          amount: 50000,
          currency: "INR"
        });

        await req.user.createPremiumUser({orderId: order.id, status: 'PENDING'});
    
        res.status(201).json({
            success: true,
            order, 
            key_id : instance.key_id,
            orderStatus: 'pending',
            message: 'order is created'
        });  

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: error});
    }  
};
