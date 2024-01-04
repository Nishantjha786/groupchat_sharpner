const Expenses = require('../models/expenses');
const User = require('../models/user');

exports.createExpense = async ( category,pmethod, amount,date) => {
    try {
        const expense = await Expenses.create({
            category,
            pmethod,
            amount,
            date
        });
        return expense;
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

exports.createUser = async (name,email,password) => {
    try {
        const user = await User.create({
            name,
            email,
            password,
        });
        return user;
        
    } catch (error) {
        console.log(error);
        throw error
    }
}
exports.getUserbyemail = async (email) => {
try {
    let user = await User.findOne({where:{email}});
    return user;
    
} catch (error) {
    console.log(error);
    throw error
}
}