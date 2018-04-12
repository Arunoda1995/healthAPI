const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');


const BloodPressure = require('../models/bloodpressure');


//Get all the Blood Pressure Infomation
router.get('/',(req,res,next)=>{

    BloodPressure.find()
            .select('bloodPressureType systolic diastolic _id')
            .exec()
            .then(docs => {
                const response = {
                    bloodpressure:docs.map(doc=>{
                            return{
                                bloodPressureType: doc.bloodPressureType,
                                systolic:doc.systolic,
                                diastolic:doc.diastolic,
                                _id: doc._id,
                                request:{
                                    type:'GET',
                                    url:'http:localhost:3000/bloodpressure/' + doc._id 
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


//Get particuar  Blood Pressure Infomation using ID
router.get('/:bloodpressureId',(req,res,next)=>{

    const id = req.params.cholesterolId;
    BloodPressure.findById(id)
        .select('bloodPressureType systolic diastolic _id')
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


//Add  new Infomation For Blood Pressure
router.post('/',checkAuth,(req,res,next)=>{

   
    const bloodpressure = new BloodPressure({

        _id: new mongoose.Types.ObjectId(),
        bloodPressureType: req.body.bloodPressureType,
        systolic:
        {
            minValue:req.body.minValue,
            maxValue:req.body.maxValue
        },
        diastolic:
        {
            minValue:req.body.minValue,
            maxValue:req.body.maxValue
        },
        
    });

    bloodpressure
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({

                message:'Successfully Entered BloodPressure Information',
                bloodpressure:{
                    bloodPressureType: result.bloodPressureType,
                    systolic:result.systolic,
                    diastolic:result.diastolic,
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



//Update blood pressure information using Blood Pressure Id
router.patch('/:bloodpressureId',checkAuth,(req,res,next)=>{

    const id  = req.params.bloodpressureId;
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.proName] = ops.value;
    }
  
     BloodPressure.update({_id:id}, {$set:updateOps})
       .exec()
       .then(result  => {
         
          res.status(200).json({
  
              message:'Blood Pressure information Updated Succesfully',
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

  //Delete particular Blood Pressure Information using Blood Pressure Id
  router.delete('/:bloodpressureId',checkAuth,(req,res,next)=>{

    const id  = req.params.bloodpressureId;
    BloodPressure.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({

                message:"BloodPressure Information Deleted",
                request:{
                    type:'POST',
                    url:'http:localhost:3000/bloodpressure/',
                    body:{
                        bloodPressureType:String,
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

