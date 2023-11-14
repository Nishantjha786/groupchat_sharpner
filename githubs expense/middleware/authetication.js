const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = (req, res, next) => {
    // console.log('<<<<<<<<<req in authenticate middleware>>>>>', req);
    try {
        const token = req.header('Authorization');
         console.log(' <<<<<<<<<TOKEN in authenticate middleware>>>>>>>>', token);

        const tokenUser = jwt.verify(token, 'archie_jwt_secret_key');
         console.log('<<<<<<<<<DECRYPTED User got from token in authenticate middleware  >>>>>>>', tokenUser);

        User.findByPk(tokenUser.userId)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(error => {
                throw new Error(error);
            });
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
};

// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// exports.authenticate = (req, res, next) => {
//      console.log("Entered authenticate function");
//     try {
//         const token = req.header('Authorization');
//          console.log('<<<<<<<<<<<Token in Auth Fn is >>>>>>>>', token);
// //  const token  = localStorage.getItem('token');
//         const tokenUser = jwt.verify(token, 'secretkey');
//         console.log('user object user id is  >>>>>>>', tokenUser.userId );

//         User.findByPk(tokenUser.userId)
//             .then(user => {
//                 req.user = user;
//                 next();
//             })
//             .catch(error => {
//                 throw new Error(error);
//             });
//     } catch (error) {
//         console.log(error);
//         res.status(401).json(error);
//     }
// };

// // const jwt = require('jsonwebtoken');
// // const User = require('../models/users');
// // //const secretKey = process.env.SECRET_KEY;
// // const secretKey ="secretkey";

// // exports.authorization = async(request,response,next)=>{
// //     console.log("Entered authenticate function");
// //     try {
// //         const token = request.headers.authorization;
// //         console.log('<<<<<<<<<<<Token in Auth Fn is >>>>>>>>', token);
// //         const decode = jwt.verify(token,secretKey);
// //         console.log('<<<<<<user object user id is  >>>>>>>', decode.userId );
// //         const user = await User.findByPk(decode.userId);
// //         request.user = user;
// //         next();
        
// //     } catch (error) {
// //         if (error.name === 'TokenExpiredError') {
// //             response.status(401).json({ message: 'Time out please sign in' });
// //         } else {
// //             console.log('Error:', error);
// //             response.status(500).json({ message: 'Internal Server Error - please login again' });
// //         }
// //     }
// // }