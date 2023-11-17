exports.requestresetpassword = (request, response, next) => {
    console.log("<<<in reset password controller>>>>");
    response.sendFile('forgot.html', { root: 'views' });
}

const Forgotpassword = require('../models/forgot-password');
const User = require('../models/user');


const Sib = require('sib-api-v3-sdk');
require('dotenv').config();


//console.log("process env key is",process.env.SIB_API_KEY)
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  const email = req.body.email;
  console.log("<<<<<<<<Email received from req header>>>>>>",email);
  // connect with the smtp
  const user = await User.findOne({where : { email: email }});
  console.log("<<<<<<<<user with matched email from db >>>>>>",user);
  if(user){
    const id = uuid.v4();
    user.createForgotpassword({ id , active: true })
        .catch(err => {
            throw new Error(err)
        });
    
    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "federico.streich6@ethereal.email",
          pass: "ywMEtEM8QFYYMjvD9h",
        },
      });
    
      let info = await transporter.sendMail({
        from: '"Nkjha 👻" <federico.streich6@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Hello Nkjha", // Subject line
        text: "Hello YT Thapa", // plain text body
        html: `
        <a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>
    `
      });
    
      //console.log("Message sent: %s", info.messageId);
      return res.status(200).json({success: true, message: 'reset password link has been sent to your email'});
      res.json(info);
  }
  else{
   return  res.status(404).json({ message: 'User not found' });
  }

};


exports.resetPassword = async (req, res) => {
    try {
        const id =  req.params.id;
        Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
            if(forgotpasswordrequest){
                if(forgotpasswordrequest.active === true) {

                    forgotpasswordrequest.update({ active: false});
                    res.status(200).send(`<html>
                                            <script>
                                                function formsubmitted(e){
                                                    e.preventDefault();
                                                    console.log('called')
                                                }
                                            </script>
                                            <form action="http://localhost:4000/password/updatepassword/${id}" method="get">
                                                <label for="newpassword">Enter New password</label>
                                                <input name="newpassword" type="password" required></input>
                                                <button>reset password</button>
                                            </form>
                                        </html>`
                                        )
                    res.end();
                }
                else {
                    throw new Error('request has expired');
                }
            } else {
                throw new Error('request not found');
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}

exports.updatePassword = (req, res) => {
    try {
        const { newpassword } = req.query;
        const  resetpasswordid  = req.params.id;
        // console.log('new password------------', newpassword);
        // console.log('resetpassword id---------------', resetpasswordid);
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {

            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly updated the new password'})
                            })
                        });
                    });
                } else{
                    return res.status(404).json({ error: 'No user Exists', success: false})
                }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }
}