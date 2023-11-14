
const Expense = require('../models/expense');
//const Download = require('../models/download');
const User = require('../models/user');
const { Op } = require('sequelize');
//const AWS= require('aws-sdk');

exports.addExpense = async(req, res, next) => {
    const {amount, description, category} = req.body;
    console.log("<<<<<<<entered add expense controller>>>>>>>>");
    let transaction;
    console.log(amount, description, category);

    try {
        console.log("@@@@@@@@@@  req.user got from authenticate function is @@@@@@@@@@@ ");
        console.log(req.user);
        await req.user.createExpense1({
            amount: amount,
            description: description,
            category: category
        },{ transaction });
        console.log("@@@@@@@@@@ exit from create expense function is @@@@@@@@@@@ ");

        res.status(200).json({success: true, message: '@@@@@@@@@@  expense successfully added  @@@@@@@@@@@'});
        
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
};


exports.getExpense = (req, res, next) => {
    const page = +req.query.page;
    let totalItems;
    let lastPage;
    console.log('%%%%%%%% Entered get expense Function------> ');
    //const ITEMS_PER_PAGE = +req.header('rows');
    const ITEMS_PER_PAGE = 5;
    console.log('items per page------> ', ITEMS_PER_PAGE)
    
    // req.user.getExpenses({
    //     offset: (page - 1)*(ITEMS_PER_PAGE), 
    //     limit: ITEMS_PER_PAGE
    //   })
    console.log("Request.user  is",req.user);
    Expense.findAll({where:{User1Id:req.user.id}})
        .then(limitedExpenses => {
            // res.status(200).json(limitedExpenses);
            console.log('<<<<<<<<limited expenses----->', limitedExpenses);
            totalItems =  Expense.count({where: {User1Id: req.user.id}});

            lastPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
            if(lastPage === 0) {
                lastPage = 1;
            }

            res.status(200).json({
                expenses: limitedExpenses,
                totalExpenses: totalItems,
                currentPage: page,
                hasNextPage: (page*ITEMS_PER_PAGE) < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: lastPage
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({success: false, message: err});
        });
};

exports.deleteExpense = (req, res, next) => {
    const id = req.params.id;
    console.log('<<<<<<id to delete as received in controller is >>>>>>>>>: ', id);
   //  Expense.findByPk(id, {where: {userId: req.user.id}})
     Expense.findAll({where: {id: id}})
        .then(async (expenses) => {
            const expense = expenses[0];
            if(!expense) {
                return res.status(404).json({success: false, message: 'expense does not belong to the user'});
            }
            await expense.destroy();
            res.status(200).json({success: true, message: 'expense successfully deleted'});
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


// const Expenses = require('../models/expenses.js');
// const sequelize = require('../util/database.js');
// const Userservices = require('../services/userservices.js');
// var express = require('express');
// var app = express();
// exports.addExpenses = async (request, response, next) => {
//     console.log("entered add expense function");
//     let transaction;
//     try {
//         transaction = await sequelize.transaction();

//         const user = request.user;
//         console.log("user in authenticte function is ");
//         console.log(user);
//         const { category, pmethod, amount, date } = request.body;
// console.log(category);
// console.log(date);
// await user.createExpense({
//     category: category,
//     pmethod: pmethod,
//     amount: amount,
//     date: date
// }, { transaction });
//         // const expense = await Userservices.createExpense(category, pmethod,amount,date);
//       const totalExpenses = await Expenses.sum('amount', { where: { UserId: user.id }, transaction });
//      await user.update({ totalexpenses: totalExpenses }, { transaction });
//         await transaction.commit();
//         response.status(200).json({ message: 'Data successfully added' });

//     } catch (error) {
//         console.log(error);
//         if (transaction) {
//             await transaction.rollback();
//         }
//         response.status(500).json({ message: 'An error occurred' });
//     }
// }
// exports.getExpenses = async (request, response, next) => {
//     console.log("entered get expense function");
//     let transaction;
//     try {
//       //  transaction = await sequelize.transaction();

//         const user = request.user;
//         console.log("user got from in authenticte function in get expense fn is ");
//         console.log(user);
//     Expenses.findAll({where:{UserId:user.id}}).then(result => {
//                  app.set('view engine', 'ejs');
//                  response.render('main',{root:'views',title:'node js',action:'list',sampleData:result});
//                 console.log(result);
//              //    app.render('/user-list', { title: 'User List', userData: result });
                 
//              }).catch((error) => {
//                  console.error('Failed to retrieve data : ', error);
//              }); 
        
//             }

//              catch (error) {
//                 console.log(error);
//                 if (transaction) {
//                     await transaction.rollback();
//                 }
//                 response.status(500).json({ message: 'An error occurred' });
//             }
// }

// // exports.getExpenses = (request, response, next) => {
// //     const user = request.user;
// //     //console.log(user);
// //     console.log("Entered get expense function!!!");
// // 	  Expenses.findAll({where:{userId:6}}).then(result => {
// //         app.set('view engine', 'ejs');
// //        // response.render('../tracker',{title:'node js',action:'list',sampleData:result});
// //        // response.sendFile('tracker.ejs',{ root: 'views'});// ,title:'node js',action:'list',sampleData:result});
// //         console.log(result);
// //     //    app.render('/user-list', { title: 'User List', userData: result });
        
// //     }).catch((error) => {
// //         console.error('Failed to retrieve data : ', error);
// //     }); 
    
// // }