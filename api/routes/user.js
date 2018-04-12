const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User = require('../models/user');


//User Sign up using Email andddress and passowrd
router.post('/signup',(req,res,next)=>{

    User.find({email: req.body.email})
        .exec()
        .then(user =>{
            if(user.length >=1)
            {
               return res.status(409).json({
                message:'Mail Exsists'
               });

            }
            else
            {

                bcrypt.hash(req.body.password,10,(err,hash)=>{
        
                    if(err)
                    {
                        return res.status(500).json({
                            error:err
                        });
                    }
                    else{
                        const user = new User({
            
                            _id:new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash
                        
                        });
            
                        user
                            .save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({
                                    message:'User Created'
                                });
            
                            })
                            .catch(err=> {
            
                                console.log(err);
                                res.status(500).json(
                                    {
                                        error:err
                                    
                                    });
                    
                            });
            
                    }
            
                })


            }

        })
    

});

//User Login to web API
router.post('/login',(req,res,next)=>{

    User.find({email:req.body.email})
        .exec()
        .then(user =>{
            if(user.length< 1){

                return res.status(401).json({

                    message:'Authontication Failed'

                });

            }
           bcrypt.compare(req.body.password,user[0].password,(err,result) => {

                if(err)
                {
                    return res.status(401).json({

                        message:'Authontication Failed'
    
                    });
                }

                if(result)
                {
                   const token = jwt.sign({

                        email:user[0].email,
                        userId:user[0]._id
                    },
                    process.env.JWT_KEY,
                    {

                        expiresIn:"1h"

                    } );
        
                    return res.status(200).json({
                        
                        message:'Authontication successful',
                        token:token
                        
                    });

                }
                res.status(401).json({

                    message:'Authontication Failed'

                });


           });

        })
        .catch(err=> {

            console.log(err);
            res.status(500).json({error:err});

        });

})

//Delete Particular User
router.delete('/:userId',(req,res,next)=>{

    User.remove({_id:req.params.userId})
        .exec()
        .then(result=> {

            res.status(200).json({

                message:'User Deleted'

            });

        })
        .catch(err=> {

            console.log(err);
            res.status(500).json({error:err});

        });

});


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
            
   

*/