const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');


const Diabetes = require('../models/diabetes');

//Get all diabtes information data
router.get('/',checkAuth,(req,res,next)=>{

    Diabetes.find()
            .select('diabetesType fpg twohPG _id')
            .exec()
            .then(docs => {
                const response = {
                    diabetes:docs.map(doc=>{
                            return{
                                diabetesType: doc.diabetesType,
                                fpg:doc.fpg,
                                twohPG:doc.twohPG,
                                _id: doc._id,
                                request:{
                                    type:'GET',
                                    url:'http:localhost:3000/diabetes/' + doc._id 
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


//Get particular diabetes information using diabetes id
router.get('/:diabetesId',(req,res,next)=>{

    const id = req.params.diabetesId;
    Diabetes.findById(id)
        .select('diabetesType fpg twohPG _id')
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



//Add new diabetes information
router.post('/',(req,res,next)=>{

   
    const diabetes = new Diabetes({

        _id: new mongoose.Types.ObjectId(),
        diabetesType: req.body.diabetesType,
        fpg:
        {
            minValue:req.body.minValue,
            maxValue:req.body.maxValue
        },
        twohPG:
        {
            minValue:req.body.minValue,
            maxValue:req.body.maxValue
        },
        
    });

    diabetes
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({

                message:'Successfully Entered Diabetes Information',
                bloodpressure:{
                    diabetesType: result.diabetesType,
                    fpg:result.fpg,
                    twohPG:result.twohPG,
                    _id:result.id,
                    request:{
                        type:'GET',
                        url:"http://localhost:3000/bloodpressure/" + result.id
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



//Update diabetes infomation using diabetes id
router.patch('/:diabetesId',checkAuth,(req,res,next)=>{

    const id  = req.params.diabetesId;
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.proName] = ops.value;
    }
  
     Diabetes.update({_id:id}, {$set:updateOps})
       .exec()
       .then(result  => {
         
          res.status(200).json({
  
              message:'Diabetes information Updated Succesfully',
              request:{
                  type:'GET',
                  url:'http:localhost:3000/diabetes/' + id
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



//Delete diabetes infomation using diabetes id
  router.delete('/:diabetesId',checkAuth,(req,res,next)=>{

    const id  = req.params.bloodpressureId;
    Diabetes.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({

                message:"Diabetes Information Deleted",
                request:{
                    type:'POST',
                    url:'http:localhost:3000/diabetes/',
                    body:{
                        diabetesType:String,
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