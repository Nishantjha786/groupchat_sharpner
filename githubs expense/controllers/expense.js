
const Expense = require('../models/expense');
const Download = require('../models/download');
const User = require('../models/user');
const { Op } = require('sequelize');
const AWS= require('aws-sdk');
const sequelize = require('../util/database');

exports.addExpense = async(req, res, next) => {
    
    const {amount, description, category} = req.body;
    console.log("<<<<<<<entered add expense controller>>>>>>>>");
    let transaction;
    console.log(amount, description, category);
   
    try {
        transaction = await sequelize.transaction();
        console.log("@@@@@@@@@@  req.user got from authenticate Fn @@@@@@@@@@@ ");
        console.log(req.user);
        await req.user.createExpense({
            amount: amount,
            description: description,
            category: category
        }, { transaction });

        const totalExpenses = await Expense.sum('amount', { where: { userId: req.user.id },transaction  });
        console.log("&&&&&&&&&total expense is $$$$$$$$$",totalExpenses);
        await req.user.update({ totalexpenses: totalExpenses }, { transaction });
         await transaction.commit();
        console.log("@@@@@@@@@@ exit from create expense controller @@@@@@@@@@@ ");

        res.status(200).json({success: true, message: '@@@@@@@@@@  expense successfully added  @@@@@@@@@@@'});
        
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
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
    
    req.user.getExpenses({
        offset: (page - 1)*(ITEMS_PER_PAGE), 
        limit: ITEMS_PER_PAGE
      })
   // console.log("Request.user  is",req.user);
  ///  Expense.findAll({where:{userId:req.user.id}})
        .then( async limitedExpenses => {
            // res.status(200).json(limitedExpenses);
         //   console.log('<<<<<<<<limited expenses----->', limitedExpenses);
            totalItems =  await Expense.count({where: {userId: req.user.id}});

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
exports.getLeaderboradData = async (req, res, next) => {
    try {
        const leaderboard = await User.findAll({
          attributes: ['id', 'name', 'totalExpenses'],
          order: [['totalExpenses', 'DESC']],
          limit:10
        });
        return res.status(200).json(leaderboard);
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized - please relogin' });

        
      }
    
};

exports.downloadExpense = async (req, res) => {
    if(req.user.isPremiumUser) {
        try {
            const expenses = await req.user.getExpenses();
            console.log("<<<<<epenses are>>>>>>>",expenses);
                                                //  file name  //                           //  data    //
            const fileUrl = await uploadToS3(`${req.user.id}_${new Date()}_expenses.csv`, JSON.stringify(expenses));
console.log('<<<<<<<<<<fileUrl>>>>>', fileUrl);
          await req.user.createDownload({fileUrl: fileUrl, date: new Date()});

            res.status(201).json({fileUrl: fileUrl});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error, status: false});
        }

    }else {
        res.status(401).json({success: false, message: 'user does not have Premium Membership'});
    }
}


function uploadToS3(fileName, data) {
    const s3 = new AWS.S3({
        // accessKeyId: process.env.S3_ACCESS_KEY_ID,
        // secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        accessKeyId: 'AKIAVUQ6UOKUVE2T7EGO',
        secretAccessKey: '9Btrb+64RDkl/4osJtRWa45/vD+TLzKOmX8CuAq/'
    });

    const params = {
        Bucket: 'nkj-my-upload', // pass your bucket name
        Key: fileName, // file will be saved as expense-tracker-archie/<fileName>
        Body: data,
        ACL: 'public-read'
    };

    return new Promise((resolve, reject) => {

        s3.upload(params, (s3Err, response) => {
            if (s3Err){
                reject(s3Err);
            } else {
                // console.log(`File uploaded successfully at ${response.Location}`);
                resolve(response.Location);
            }
        });
    })
}