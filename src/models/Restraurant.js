const mongoose = require('mongoose');

const restraurantSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    restaurantImgUrl:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true,
        
    },
    cost:{
        type:String,
        required:true,
    },
    offer:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Restaurant', restraurantSchema)