const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');


const Cholesterol = require('../models/cholesterol');

//Get All cholesterol Data
router.get('/',(req,res,next)=>{

    Cholesterol.find()
            .select('cholesterolType minValue maxValue _id')
            .exec()
            .then(docs => {
                const response = {
                    cholesterol:docs.map(doc=>{
                            return{
                                cholesterolType: doc.cholesterolType,
                                minValue:doc.minValue,
                                maxValue:doc.maxValue,
                                _id: doc._id,
                                request:{
                                    type:'GET',
                                    url:'http:localhost:3000/cholesterol/' + doc._id 
                                }

                            }
                    })

                };


                if(docs.length >= 0){
                    res.status(200).json(response)
                }
                else
                {
                    res.status(404).json({

                        message:'No entries found'

                    });
                }
                
            })
            .catch(err=> {
                console.log(err);
                res.status(500).json({
                    error:err
                });

            });
   
});

//Get particular cholesterol data using choleterol id
router.get('/:cholesterolId',(req,res,next)=>{

    const id = req.params.cholesterolId;
    Cholesterol.findById(id)
        .select('cholesterolType minValue maxValue _id')
        .exec()
        .then(doc => {

        
            if(doc){
                res.status(200).json(doc);
            }
            else
            {
                res.status(404).json({message:'No valid entry found for provided ID'});
            }
           
        })
        .catch(err=> {

            console.log(err);
            res.status(500).json({error:err});

        });



});

//Add new informatuion t0  cholesterol information
router.post('/',checkAuth,(req,res,next)=>{

   
    const cholesterol = new Cholesterol({

        _id: new mongoose.Types.ObjectId(),
        cholesterolType: req.body.cholesterolType,
        minValue: req.body.minValue,
        maxValue: req.body.maxValue


    });

    cholesterol
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({

                message:'Successfully Entered Cholesterol Information',
                cholesterol:{
                    cholesterolType: result.cholesterolType,
                    minValue:result.minValue,
                    maxValue:result.maxValue,
                    _id:result.id,
                    request:{
                        type:'GET',
                        url:"http://localhost:3000/cholesterol/" + result.id
                    }
                    

                }

            });
        

    }).catch(err=>{

        console.log(err);
        res.status(500).json({
            error:err

        });

    });

});


//Update particular cholesterol data using choleterol id
router.patch('/:cholesterolId',checkAuth,(req,res,next)=>{

  const id  = req.params.cholesterolId;
  const updateOps = {};
  for(const ops of req.body)
  {
      updateOps[ops.proName] = ops.value;
  }

   Cholesterol.update({_id:id}, {$set:updateOps})
     .exec()
     .then(result  => {
       
        res.status(200).json({

            message:'Cholesterol information Updated Succesfully',
            request:{
                type:'GET',
                url:'http:localhost:3000/cholesterol/' + id
            }

        });
     })
     .catch(err => {

        console.log(err);
        res.status(500).json({
            error: err
        });

     });

});

//Delete particular cholesterol data using choleterol id
router.delete('/:cholesterolId',checkAuth,(req,res,next)=>{

    const id  = req.params.cholesterolId;
    Cholesterol.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({

                message:"Cholesterol Iformation Deleted",
                request:{
                    type:'POST',
                    url:'http:localhost:3000/cholesterol/',
                    body:{
                        cholesterolType:String,
                        minValue:Number,
                        maxValue:Number
                    }
                }

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({

                error:err

            });

        });

});


module.exports = router;