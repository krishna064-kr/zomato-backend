const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    UserId:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    },
})


module.exports = mongoose.model('Review', reviewSchema);