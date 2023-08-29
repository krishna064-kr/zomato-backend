const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:Number,
    gender:String,
})


module.exports = mongoose.model('Customer', customerSchema);