const mongoose = require('mongoose');

var bloodpressureinfoSchema = mongoose.Schema({
   
    _id: mongoose.Schema.Types.ObjectId,
    bloodPressureType:{
        type:String,
        required:true
       
    },
    systolic:{
        minValue:{
            type:Number
          
        },
        maxvalue:{
            type:Number
           
        }
    },
    diastolic:{
        minValue:{
            type:Number
           
        },
        maxvalue:{
            type:Number
          
        }
    }
    
});

 module.exports = mongoose.model('BloodPressure',bloodpressureinfoSchema);