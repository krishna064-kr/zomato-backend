const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addressLine1:{
        type:String,
        unique:true,
        required:true
    },
    addressLine2:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('Addresses', addressSchema)