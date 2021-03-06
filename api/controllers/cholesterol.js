const Cholesterol = require('../models/cholesterol');
const mongoose = require('mongoose');

exports.cholesterol_get_all = (req,res,next)=>{

    //Mongoose Method to get Data
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
                                    url:'http://localhost:3000/cholesterol/' + doc._id 
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
   
}

exports.cholesterol_create = (req,res,next)=>{

    //Model as a Constructor
     const cholesterol = new Cholesterol({
 
         _id: new mongoose.Types.ObjectId(),
         cholesterolType: req.body.cholesterolType,
         minValue: req.body.minValue,
         maxValue: req.body.maxValue
 
 
     });
 
     //save data in the mnogoose databases
     cholesterol
         .save()
         .then(result => {
             console.log(result);
             res.status(201).json({
 
                 message:'Successfully Entered Cholesterol Information',
                 Cholesterol:{
                     cholesterolType: result.cholesterolType,
                     minValue:result.minValue,
                     maxValue:result.maxValue,
                     _id:result._id,
                     request:{
                         type:'GET',
                         url:"http://localhost:3000/cholesterol/" + result._id
                     }
                     
 
                 }
 
             });
         
 
     }).catch(err=>{
 
         console.log(err);
         res.status(500).json({
             error:err
 
         });
 
     });
 
 }

 exports.cholesterol_get_cholesterol = (req,res,next)=>{

    const id = req.params.cholesterolId;

    //Mongoose Method to find Using Id
    Cholesterol.findById(id)
        .select('cholesterolType minValue maxValue _id')
        .exec()
        .then(doc => { 
            if(doc){
                res.status(200).json({
                    cholesterol:doc,
                    request:{
                        type:'GET',
                        url:'http://localhost/cholesterol'
                    }

                });
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



}

exports.cholesterol_update = (req,res,next)=>{

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
                  url:'http://localhost:3000/cholesterol/' + id
              }
  
          });
       })
       .catch(err => {
  
          console.log(err);
          res.status(500).json({
              error: err
          });
  
       });
  
  }

  exports.cholesterol_delete = (req,res,next)=>{

    const id  = req.params.cholesterolId;
    Cholesterol.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({

                message:"Cholesterol Information Deleted",
                request:{
                    type:'POST',
                    url:'http://localhost:3000/cholesterol/',
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

}