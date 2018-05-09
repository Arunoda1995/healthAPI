const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//User Sign up using Email andddress and passowrd
router.post('/signup',userController.user_signup);

//User Login to web API
router.post('/login',userController.user_login);

//Delete Particular User
router.delete('/:userId',userController.user_delete);

module.exports = router;


/*

    
    01.List of Security Risks:-
            1.AnyOne can Access to the data and perform operation on those data
                        *How it is addressed:-
                                1.Users should sign in using their email and password to the web api before Accessing the data
            2.Hackers will try to Log into web api using differenet emails
                         *How it is addressed:-
                                1.Without Displaying a particular Email is wrong here it is used 401 status to Display "Authentication Failed" 
            3.If the database is hacked Users passwords will be exposed to outside
                        *How it is addressed:-
                                1.All User Passwords are bycrypt. Therefore Hackers cannot use tables to crack the passwords
            
            node.bcrypt.js has  used for password hashing  

*/