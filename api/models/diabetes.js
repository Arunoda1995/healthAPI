const mongoose = require('mongoose');

var diabetesinfoSchema = mongoose.Schema({

    diabetesType:{
        type:String,
        required:true
       
    },
    fpg:{
        minValue:{
            type:Number,
            required:true
           
        },
        maxvalue:{
            type:Number,
            required:true
           
        }
    },
    twohPG:{
        minValue:{
            type:Number,
            required:true
          
        },
        maxvalue:{
            type:Number,
            required:true 
        }
    }
    
});

module.exports = mongoose.model('Diabetes',diabetesinfoSchema);