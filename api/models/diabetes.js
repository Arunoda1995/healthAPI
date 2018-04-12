const mongoose = require('mongoose');

var diabetesinfoSchema = mongoose.Schema({

    diabetesType:{
        type:String,
        required:true
       
    },
    fpg:{
        minValue:{
            type:String
           
        },
        maxvalue:{
            type:String
           
        }
    },
    twohPG:{
        minValue:{
            type:String
          
        },
        maxvalue:{
            type:String
           
        }
    }
    
});

module.exports = mongoose.model('Diabetes',diabetesinfoSchema);