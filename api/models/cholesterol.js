

const mongoose = require('mongoose');

var cholesterolinfoSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    cholesterolType:{type:String, required:true},
    minValue:{type:Number, required:true},
    maxValue:{type:Number, required:true}
});

module.exports = mongoose.model('Cholesterol',cholesterolinfoSchema);